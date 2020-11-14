const ytdl = require('discord-ytdl-core');

var avgTimeBetweenSounds = 0;
var numOfRecentlyPlayedSounds = 0;
var dateSinceLastPlay = new Date();
var PLAY_LOCK = 0;


// Given a msg and youtubeURL, if msg member is currently in a voice channel, jump into that voice channel and play youtubeURL audio
async function playYoutubeSound(msg, youtubeURL, startTime = '0') {
	// return if we're currently locked
	if (PLAY_LOCK == 1) return;

	// We only continue if the message is from a guild
    if (!msg.guild) return;

    // We only care to continue if the user is in a voice channel
    if (msg.member.voice.channel) {

    	var trueYoutubeURL = youtubeURL;

    	// Check to see if we're getting a lot of consecutive sound requests
        var dateNow = new Date();
        // get total seconds between last two sound requests
        var delta = Math.abs(dateSinceLastPlay - dateNow) / 1000;
        if (delta <= 10) {
        	numOfRecentlyPlayedSounds++;
        	avgTimeBetweenSounds = avgTimeBetweenSounds + ((delta - avgTimeBetweenSounds)/numOfRecentlyPlayedSounds);
        	if (numOfRecentlyPlayedSounds >= 10 && avgTimeBetweenSounds < 3) {
        		console.log("SPAM MEME TRIGGERED");
        		// If we're in this block, we are considered as being "spammed", so we replace the youtubeURL with our own silly meme, lock the youtube sound temporarily, then reset all of our spam vars
        		trueYoutubeURL = 'https://www.youtube.com/watch?v=8NuYSsROSOk';
        		PLAY_LOCK = 1;
        		avgTimeBetweenSounds = 0;
        		numOfRecentlyPlayedSounds = 0;
        	}
        } else {
        	avgTimeBetweenSounds = 0;
        	numOfRecentlyPlayedSounds = 0;
            PLAY_LOCK = 0;
        }
        dateSinceLastPlay = dateNow;

        try {
            console.log('Connecting to voice channel...');
            const connection = await msg.member.voice.channel.join();
            console.log('Connected to voice channel');
            console.log('Fetching Youtube data...');
            ytInfo = await ytdl.getInfo(trueYoutubeURL);
            console.log('Youtube data fetched');
            console.log('Playing sound...');
            const dispatcher = connection.play(ytdl.downloadFromInfo(ytInfo, {filter: 'audioonly'}), {seek: startTime});
            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                dispatcher.destroy();
                if (PLAY_LOCK == 1) {
                    if (trueYoutubeURL === 'https://www.youtube.com/watch?v=8NuYSsROSOk') {
                        msg.member.voice.channel.leave();
                        PLAY_LOCK = 0;
                    }
                } else {
                    msg.member.voice.channel.leave();
                }
            });
        } catch (err) {
            console.log("ERROR: Failed to play youtube id: " + trueYoutubeURL + ", error text: " + err);
            PLAY_LOCK = 0; // turn off play lock just in case
            msg.member.voice.channel.leave();
        }
    }
}

module.exports = {
	playYoutubeSound
};