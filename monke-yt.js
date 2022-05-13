const ytdl = require('discord-ytdl-core');


var avgTimeBetweenSounds = 0;
var numOfRecentlyPlayedSounds = 0;
var dateSinceLastPlay = new Date();
var PLAY_LOCK = 0;


// Given a msg and url (yourube or to a raw resource), if msg member is currently in a voice channel, jump into that voice channel and play audio
async function playSound(msg, url, startTime = '0') {
    // return if we're currently locked
    if (PLAY_LOCK == 1) return;

    // We only continue if the message is from a guild
    if (!msg.guild) return;

    // Immediately store a reference to the voice channel. If we don't do this, we
    // can error out if we try to leave the member's voice channel but they've left
    // the voice channel they were originally in
    var voiceChannel = msg.member.voice.channel;

    // We only care to continue if the user is in a voice channel
    if (voiceChannel) {

        var trueURL = url;
        console.log(`${/youtu/i.test(trueURL) ? 'youtube' : 'not youtube!'}`)
        console.log(`${/youtu/i.test(trueURL) ? `${msg} - Playing sound from link <${url}>` : `${msg} - Playing sound from link ${url}`}`)
        
        
        // let sent = await msg.guild.channels.cache.get('974290034133987429').send(`${msg} - Playing sound from link <${url}>`)
        let sent = await msg.guild.channels.cache.get('974290034133987429').send(`${/youtu/i.test(trueURL) ? `${msg} - Playing sound from link <${url}>` : `${msg} - Playing sound from link ${encodeURI(trueURL)}`}`)

        // Check to see if we're getting a lot of consecutive sound requests
        var dateNow = new Date();
        // get total seconds between last two sound requests
        var delta = Math.abs(dateSinceLastPlay - dateNow) / 1000;
        if (delta <= 10) {
            numOfRecentlyPlayedSounds++;
            avgTimeBetweenSounds = avgTimeBetweenSounds + ((delta - avgTimeBetweenSounds)/numOfRecentlyPlayedSounds);
            if (numOfRecentlyPlayedSounds >= 10 && avgTimeBetweenSounds < 3) {
                console.log("SPAM MEME TRIGGERED");
                sent.lineReply(`SPAM DETECTED`)
                // If we're in this block, we are considered as being "spammed", so we replace the url with our own silly meme, lock the youtube sound temporarily, then reset all of our spam vars
                trueURL = 'https://www.youtube.com/watch?v=8NuYSsROSOk';
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
            // console.log('Connecting to voice channel...');
            const connection = await voiceChannel.join();
            // console.log('Connected to voice channel');
            // console.log('Fetching Youtube data...');
            // console.log('Youtube data fetched');
            console.log(`${msg} - Playing sound from link ${url}`);
            // msg.guild.channels.cache.find(i => i.name === 'monke-logs').send('test')
            // console.log(sent.id)
            var stream;
            var streamType = "unknown";
            if (/youtu/i.test(trueURL)) {
                ytInfo = await ytdl.getInfo(trueURL);
                stream = ytdl.downloadFromInfo(ytInfo, {filter: 'audioonly'});
            } else {
                stream = ytdl.arbitraryStream(trueURL, {opusEncoded: true});
                streamType = "opus";
            }
            // let stream = ytdl.arbitraryStream(url, {opusEncoded: true});
            const dispatcher = connection.play(stream, {type: streamType, seek: startTime});
            // const dispatcher = connection.play(ytdl.downloadFromInfo(ytInfo, {filter: 'audioonly'}), {seek: startTime});
            dispatcher.on('finish', () => {
                console.log('Finished playing!\n');
                dispatcher.destroy();
                if (PLAY_LOCK == 1) {
                    if (trueURL === 'https://www.youtube.com/watch?v=8NuYSsROSOk') { // this could be done better
                        voiceChannel.leave();
                        PLAY_LOCK = 0;
                    }
                } else {
                    // voiceChannel.leave(); // Used to leave channel, but its funnier to leave the bot chilling in chat for random sound effects without the join channel giveaway
                }
            });
        } catch (err) {
            // console.log(sent)
            sent.lineReply(`failure ... ${err.stack}`)
            // msg.guild.channels.cache.get('974290034133987429').send(`failure ... ${err.message}`)
            console.log("ERROR: Failed to play audio id: " + trueURL + ", error text: " + err.message);
            PLAY_LOCK = 0; // turn off play lock just in case
            // voiceChannel.leave(); // Used to leave channel, but its funnier to leave the bot chilling in chat for random sound effects without the join channel giveaway
            msg.channel.send("https://media1.tenor.com/images/52d0f87259135bce058da8bf66ba7ee9/tenor.gif?itemid=5384362");
        }
    }
}

module.exports = {
    playSound
};