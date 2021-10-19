const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('discord-ytdl-core');

// Import constants
const constants = require('./constants');
// Youtube handler
const mYouTube = require('./monke-yt');
// Monke Houses
const mHouses = require('./monke-houses');
// Other imports
const timecards = require('./timecards');
const phasmo = require('./phasmophobia-sounds');

// Holds reference to the main server
var goofsServer;

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
client.on('ready', async () => {
    client.user.setActivity('with his balls', { type: 'PLAYING' });
    // botChannel = client.channels.cache.get('690360349316087828'); // channel ID for personal test server, not usable in goofs
    mainChannel = client.channels.cache.get(constants.CHANNEL_MAIN);
    botChannel = client.channels.cache.get(constants.CHANNEL_BOT);

    // Announce startup and jump into voice to play intro sound
    if (false) {
        botChannel.send("OH FUCK YEAH GAMES BABY YEEEEEEEEEEEEEEEEEAAAAAHHHHHHHH");

        console.log("Parsing through channels for startup sound...");
        client.channels.cache.forEach(async channel => {
            console.log("Found channel " + channel.id);
            if (channel.type == 'voice' && channel.members.size > 0) {
                try {
                    console.log('Connecting to voice channel...');
                    const connection = await channel.join();
                    console.log('Connected to voice channel');
                    console.log('Fetching Youtube data...');
                    ytInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=jPQmyUKo48A');
                    console.log('Youtube data fetched');
                    console.log('Playing sound...');
                    const dispatcher = connection.play(ytdl.downloadFromInfo(ytInfo, {filter: 'audioonly'}));
                    dispatcher.on('finish', () => {
                        console.log('Finished playing!');
                        dispatcher.destroy();
                        channel.leave();
                    });
                } catch (err) {
                    console.log("ERROR: Failed to play startup sound, error text: " + err);
                    channel.leave();
                }
            }
        });
    }

    // Find our main server, will be needed later
    console.log("Parsing through servers...");
    client.guilds.cache.forEach(async server =>{
        if (server.id == constants.SERVER_GOOFS) {
            goofsServer = server;
            console.log("Found our goofs server!");
        }
    });
    console.log(`Monke bot ready`);
});

client.on('message', msg => {
    if (!(msg.author.id === '690351869650010333')) {
        if (msg.content.toLowerCase() === 'howdy') {
            msg.reply('Howdy partner :cowboy:');
        }
        else if (/kenny/i.test(msg.content)) {
            if (Math.random() >= 0.90) {
                msg.channel.send("<@" + constants.USERS.KENNY + ">");
            }
        }
        else if (/kenna/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=6vtsKGzGVK4');
        }
        else if (/bee/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                msg.channel.send(beeGif);
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=8CvqmD0CZao');
            } else {
                msg.react('🐝').catch(function() {
                    console.log("whoopsies");
                });
            }
        }
        else if (/amon?g\s*us/i.test(msg.content)) {
            msg.channel.send('ඞ');
        }        
        else if (/(fuck\s*you|shut.*up).*monke/i.test(msg.content)) {
            msg.channel.send(SAD_GIFS[Math.floor(Math.random() * SAD_GIFS.length)]);
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
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=hr7GyFM7pX4');
        }
        else if (/monke.*suck/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=rPWDl5Zt_TQ');
        }
        else if (/monke.*die/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=xEvJmI7uJ-g');
        }
        else if (/monke.*nut/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=TrRDqD-bpWY');
        }
        else if (/sax.*(and|&).*sex/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=c51x_iJjjD0', '290');
        }
        else if (/cock.*rock/i.test(msg.content)) {
            if (Math.random() >= 0.90) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=ZYR_r0A-K3g');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=6yisws5rKoo');
            }
        }
        else if (/jabroni/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=8K2wTF7pZzI');
        }
        else if (/(you are already dead|omae wa mou shindeiru)/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=U_EV0HAHBTQ');
        }
        else if (/explo(d|si)/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=GN_lbeRuM0k');
        }
        else if (/monke.*\srap\s*$/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=zlm6bcMD7Fg');
        }
        else if (/music/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=Lb4b91Ken7Y');
        }
        else if (/west virginia/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=1vrEljMfXYo');
        }
        else if (/what.*are.*you.*doing/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=gOBimZmfw_4');
        }
        else if (/sylvanas/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=AdYPzbPiosg', '17');
        }
        else if (/wednesday/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=du-TY1GUFGk');
        }
        else if (/say\s*goodbye/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=wtx0fdzRAp8');
        }
        else if (/rick\s*roll/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=5hFevwJ4JXI');
        }
        else if (/ram\s*ranch/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=MADvxFXWvwE');
        }
        else if (/bonk/i.test(msg.content)) {
            var randomAmt = Math.random();
            if (randomAmt >= 0.99) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=5KEPE2VUSA8');
            } else if (randomAmt >= 0.95) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=08EqQPIvHOU');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=gwxTZaa3NgI');
            }
        }
        else if (/don.?t\s*do\s*it/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=gTUALBzIBWM');
        }
        else if (/speen|spin/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=cerkDJLuT_k');
        }
        else if (/monke.*that.?s\s*shit/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=jyeI3Ziii6w', '9');
        }
        else if (/football/i.test(msg.content)) {
            if (Math.random() >= 0.5) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=37-AlmNdESg');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=ZKPnAfopfO8');
            }
        }
        else if (/monke.*timecard/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=' + timecards.getRandomTimecardVideoID());
        }
        else if (/monke.*play\s*despacito/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=W3GrSMYbkBE');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=FWOXAPI5kZg');
            }
        }
        else if (/CBT/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=fR9ClX0egTc');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=WWeMOKnBfZ8');
            }
        }
        else if (/oof/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=N8xVS57hAs4');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=3w-2gUSus34');
            }
        }
        else if (/ford truck month/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=RVKmdsO6f3g');
        }
        else if (/surprise/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=_bSEfx6D8mA');
        }
        else if (/^e$/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=T732jM9juhA');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=EcsPhdyZM4k');
            }
        }
        else if (/phasmo/i.test(msg.content)) {
            console.log('spooky incoming...')
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=' + phasmo.getRandomSpiritBoxVideoID());
        }
        else if (/shut\s*up/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=ptAVrZh7hV0');
        }
        else if (/u\s*right/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=MCT80HJWQ2A', '4');
        }
        else if (/john/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=XgUB3lF9IQA');
        }
        else if (/800.?588.?2300/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=ovVvtC4wXSQ');
        }
        else if (/1.?900.?490.?FREAK|freddie\s*freaker/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=MmOiRyWLug0');
        }
        else if (/shrek|somebody\s*once\s*told\s*me/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=g7_VlmEamUQ');
        }
        else if (/godzilla/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=JkUQ6s4mrWw');
        }
        else if (/taco\s*bell/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=dNl4-w9ZrBs');
        }
        else if (/monke.*th(ink|oughts)/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=V-tFWwXTJn8');
        }
        else if (/egg/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=nhB5WoUYQbc');
        }
        else if (/bean/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=60l1nZIhslU');
        }
        else if (/jam/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=aAh7UnQnC7I');
        }
        else if (/cheese/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=Kf2CSy_ZHCA', '5');
        }
        else if (/pizza/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=czTksCF6X8Y');
        }
        else if (/kick.*butt/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=MVMyxJiA9Cg');
        }
        else if (/clap/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=EHjWieD29AM');
        }
        else if (/sell?\s?fish/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=I1USdCFPR_A');
        }
        else if (/what'?s\s*your\s*point/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=Jk5qghpFY-g');
        }
        else if (/find\s*jeffrey/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=jj_TywZ_X_w', '13');
        }
        else if (/brerb/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=1mQG7z-5wok');
        }
        else if (/krabby\s*patty/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=E-xhxS581Uc');
        }
        else if (/devious/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=FFVu0Zbth2A');
        }
        else if (/game\s*over/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=IsS_VMzY10I');
        }
        else if (/liberal/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=QxdC2H2Nndg');
        }
        else if (/careless|whisper/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=izGwDsrQ1eQ');
        }
        else if (/stop\s*it|get\s*some\s*help/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=9Deg7VrpHbM');
        }
        else if (/huge/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=h8Jui7XaKQA');
        }
        else if (/toxic/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=xr5t5vG1fHY');
        }
        else if (/th[sa]nks/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=OLmun1JEIw0', '41');
        }
        else if (/uncle/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=XvbxrpFx0FU');
        }
        else if (/iasip/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=idoYCVLh2qI');
        }
        else if (/get\s*you\s*bitch/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=bip40seuVqI');
        }
        else if (/congratulations|congrats/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=wDajqW561KM');
        }
        

        
        else if (/monke assign houses/i.test(msg.content)){
            msg.channel.send("Assigning houses");
            mHouses.autoAssignHouses(goofsServer, constants.ROLES);
        }
        else if (/monke clear houses/i.test(msg.content)){
            msg.channel.send("Clearing houses");
            mHouses.clearAllHouses(goofsServer);
        }
        else if (/monke test add points/i.test(msg.content)){
            console.log("Testing add points");
            mHouses.addHousePoints(msg);
        }

        else if (/monke(y)?\s*shut\s*down/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=renyltL2Dnc');
            // https://stackoverflow.com/questions/23766259/restart-node-js-server-programmatically
        }
        else if (msg.mentions.has(client.user)) { // If message is pinging Monke Bot
            msg.channel.send(PINGED_GIFS[Math.floor(Math.random() * PINGED_GIFS.length)]);
        }


        
    }
});

client.on('messageDelete', msg => {
    if (Math.random() >= 0.75) {
        msg.reply('I saw you delete that. You can\'t hide your mistakes.');
    }
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
        botChannel.send("<@" + constants.USERS.CHRISTIAN + "> <@" + constants.USERS.JON + "> <@" + constants.USERS.SPENCER + "> OH FUCK OH SHIT IT'S HERE FUCK FUCK FUCK FUCK FUCK AAHAHAHAHAHAHHHAHAHAHHAHHAHAHAH YEEEEEEEEEEEEEAAAAHHHHHH BOOOOOIIIIIIIIIIIII!!!!!!!!!");
    }
}

// Login to server
client.login(constants.PRIVATE_KEY);

// Other general funcs
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
