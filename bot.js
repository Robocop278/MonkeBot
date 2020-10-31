const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

// Import constants
const constants = require('./constants');

// Holds reference to our channels
var mainChannel; // main channel
var botChannel; // bot channel

// Assorted gifs
const beeGif = "https://media.discordapp.net/attachments/102109460914257920/760394085017583676/beeParrot.gif";

const PINGED_GIFS = [
    "https://tenor.com/view/monkey-callme-gif-4577639"
];

const SAD_GIFS = [
    "https://thumbs.gfycat.com/DishonestSecondFawn-small.gif",
    // "https://media.tenor.com/images/1aa628400662229be92769b5b1aedcf5/tenor.gif", // Not sure why this one doesnt embbed correctly, TODO look into acceptable embbedable link formats
    "https://thumbs.gfycat.com/ElderlyDefiniteAmericancreamdraft-size_restricted.gif",
    "https://i.pinimg.com/originals/ac/94/ca/ac94cade932426132fb6d3240526a06e.gif",
    "https://thumbs.gfycat.com/DisguisedEnchantedGalah-small.gif",
    "https://media1.tenor.com/images/fc16662655be9b85c441650826a33d0a/tenor.gif?itemid=8227787"
];

// Main client functions
client.on('ready', () => {
    client.user.setActivity('with his balls', { type: 'PLAYING' });
    console.log(`Monke bot ready`);
    // botChannel = client.channels.cache.get('690360349316087828'); // channel ID for personal test server, not usable in goofs
    mainChannel = client.channels.cache.get(constants.CHANNEL_MAIN);
    botChannel = client.channels.cache.get(constants.CHANNEL_BOT);

    botChannel.send("OH FUCK YEAH GAMES BABY YEEEEEEEEEEEEEEEEEAAAAAHHHHHHHH");
});

client.on('message', msg => {
    if (!(msg.author.id === '690351869650010333')) {
        if (msg.content.toLowerCase() === 'howdy') {
            msg.reply('Howdy partner :cowboy:');
        }
        else if (/kenny/i.test(msg.content)) {
            if (Math.random() >= 0.90) {
                msg.channel.send("<@" + constants.KENNY + ">");
            }
        }
        else if (/kenna/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=6vtsKGzGVK4');
        }
        else if (/bee/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                msg.channel.send(beeGif);
            } else {
                msg.react('🐝').catch(function() {
                    console.log("whoopsies");
                });
            }
        }
        else if (/fuck\s*you.*monke/i.test(msg.content)) {
            msg.channel.send(SAD_GIFS[getRndInteger(0, SAD_GIFS.length)]);
        }
        else if (/monke.*time.*(left|til|for)/i.test(msg.content)) {
            sendCountdownStatus(true);
        }
        else if (msg.author.id === constants.TODDBOT) {
            if (Math.random() >= 0.75) {
                msg.channel.send("Shut the fuck up, Todd");
            }
        }
        else if (/monke.*fart/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=1B0RQBH0LOw');
        }
        else if (/monke.*suck/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=rPWDl5Zt_TQ');
        }
        else if (/monke\s*die/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=xEvJmI7uJ-g');
        }
        else if (/monke\s*nut/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=TrRDqD-bpWY');
        }
        else if (/sax.*(and|&).*sex/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=c51x_iJjjD0', '4m50s');
        }
        else if (/cock.*rock/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=6yisws5rKoo');
        }
        else if (/jabroni/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=8K2wTF7pZzI');
        }
        else if (/(you are already dead|omae wa mou shindeiru)/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=U_EV0HAHBTQ');
        }
        else if (/explo(d|si)/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=GN_lbeRuM0k');
        }
        else if (/monke.*\srap\s*$/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=zlm6bcMD7Fg');
        }
        else if (/music/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=Lb4b91Ken7Y');
        }
        else if (/west virginia/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=1vrEljMfXYo');
        }
        else if (/what.*are.*you.*doing/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=gOBimZmfw_4');
        }
        else if (/sylvanas/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=AdYPzbPiosg', '17s');
        }
        else if (/wednesday/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=du-TY1GUFGk');
        }
        else if (/say\s*goodbye/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=wtx0fdzRAp8');
        }
        else if (/rick\s*roll/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=5hFevwJ4JXI');
        }
        else if (/ram\s*ranch/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=MADvxFXWvwE');
        }
        else if (/bonk/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=gwxTZaa3NgI');
        }
        else if (/don.?t\s*do\s*it/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=gTUALBzIBWM');
        }
        else if (/monke\s*that.?s\s*shit/i.test(msg.content)) {
            playYoutubeSound(msg, 'https://www.youtube.com/watch?v=jyeI3Ziii6w', '9s');
        }
    }
});

client.on('messageDelete', msg => {
    msg.reply('I saw you delete that. You can\'t hide your mistakes.');
});


// General countdown crier, on startup bot will get our current date, offset until the next minute ticks over, then start an interval check that will print messages related to the specified timer.

// Recall months are 0-indexed
//                      YYYY  MM  DD  HH  m  s  ms
var goalDate = new Date(2020, 11, 10, 0, 0, 0, 0);
function startTimerCountdown() {
    var startDate = new Date();
    var milliOffset = startDate.getSeconds() * 1000;
    console.log("Current milliseconds at startup: " + milliOffset);
    var milliDelay = 60000 - milliOffset;
    console.log("Waiting for " + milliDelay + " milliseconds before starting timer");
    setTimeout(() => {sendCountdownStatus(); setInterval(sendCountdownStatus, 60*1000);}, milliDelay);
}

function sendCountdownStatus(verbose = false) {
    var currentdate = new Date();
    console.log("Checking date object: Hours: " + currentdate.getHours() + ", Minutes: " + currentdate.getMinutes() + ", Seconds: " + currentdate.getSeconds())
    if (goalDate > currentdate) 
    {
        // get total seconds between the times
        var delta = Math.abs(goalDate - currentdate) / 1000;

        // calculate (and subtract) whole days
        var daysLeft = Math.floor(delta / 86400);
        delta -= daysLeft * 86400;

        // calculate (and subtract) whole hours
        var hoursLeft = Math.floor(delta / 3600) % 24;
        delta -= hoursLeft * 3600;

        // calculate (and subtract) whole minutes
        var minutesLeft = Math.floor(delta / 60) % 60;
        delta -= minutesLeft * 60;

        // what's left is seconds
        var secondsLeft = delta % 60;  // in theory the modulo is not required

        // Until we're within one hour of the goal date, report with a normal message. Unless verbose was set to true, only send this message every five minutes instead of every minute.
        if (hoursLeft >= 1 || (hoursLeft < 1 && minutesLeft > 10)) {
            if (minutesLeft % 5 === 0 || verbose) {
                botChannel.send(daysLeft + ' days, ' + hoursLeft + " hours, " + minutesLeft + " minutes left till CYBERPUNK BABY YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEHHAAAAAAAAAAAAAAAAAAAAAAWWW!!!!!");
            }
        }
        else if (minutesLeft > 0) {
            botChannel.send(daysLeft + ' days, ' + hoursLeft + " hours, " + minutesLeft + " MINUTES LEFT TILL CYBERPUNK RELEASE!!!!!");
        }
    } 
    else {
        // If its the goal date, ping some people
        botChannel.send("<@" + constants.CHRISTIAN + "> <@" + constants.JON + "> <@" + constants.SPENCER + "> OH FUCK OH SHIT IT'S HERE FUCK FUCK FUCK FUCK FUCK AAHAHAHAHAHAHHHAHAHAHHAHHAHAHAH YEEEEEEEEEEEEEAAAAHHHHHH BOOOOOIIIIIIIIIIIII!!!!!!!!!");
    }
}

// Login to server
client.login(constants.PRIVATE_KEY);

// Other general funcs
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Given a msg and youtubeURL, if msg member is currently in a voice channel, jump into that voice channel and play youtubeURL audio
async function playYoutubeSound(msg, youtubeURL, startTime = '0s') {
    if (!msg.guild) return;
    console.log('Playing sound...');

    if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(youtubeURL, {filter: 'audioonly', begin: startTime}));
        dispatcher.on('finish', () => {
            console.log('Finished playing!');
            dispatcher.destroy();
            msg.member.voice.channel.leave();
        });
    }
}