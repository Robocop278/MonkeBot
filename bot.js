const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client();
const ytdl = require('discord-ytdl-core');
const exec = require('child_process').exec;

// Import constants
const constants = require('./constants');
// Youtube handler
const mYouTube = require('./monke-yt');
// Monke Houses
const mHouses = require('./monke-houses');
// Other imports
const timecards = require('./timecards');
const phasmo = require('./phasmophobia-sounds');
const lounge = require('./lounge-sounds');
const aws = require('./aws-adapter');

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

const BOOF_GIFS = [
    "https://c.tenor.com/jcjQaLHIG_YAAAAd/have-boof.gif",
    "https://c.tenor.com/XX7_VZxPgw8AAAAd/forgot-the-boof.gif",
    "https://c.tenor.com/88KcKzh9LrUAAAAC/judgement-judgeeyes.gif"
];

const PULL_DENY_GIFS = [
    "https://c.tenor.com/zrItGKVKzYoAAAAd/mokey-puppet-monkey.gif",
    "https://c.tenor.com/rSpLSbGlCXYAAAAC/monkey-no.gif",
    "https://c.tenor.com/ukJ-Ncx0eFYAAAAd/gorilla-no.gif"
];

// Assorted sound arrays
const BB_SOUNDS = [
    'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/b/b5/Echo1.ogg/revision/latest?cb=20141113012504',
    'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/0/0e/Echo3b.ogg/revision/latest?cb=20141113012523',
    'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/2/2d/Echo4b.ogg/revision/latest?cb=20141113012542'
];

const OWW_SOUNDS = [
    "https://monke.s3.amazonaws.com/oww/oww.ogg",
    "https://monke.s3.amazonaws.com/oww/oww2.ogg"
];

const HELP_SOUNDS = [
    'https://monke.s3.amazonaws.com/cry+of+fear/help_1.ogg',
    'https://monke.s3.amazonaws.com/cry+of+fear/help_2.ogg',
    'https://monke.s3.amazonaws.com/cry+of+fear/help_3.ogg',
    'https://monke.s3.amazonaws.com/cry+of+fear/help_4.ogg',
    'https://monke.s3.amazonaws.com/cry+of+fear/help_5.ogg',
    'https://monke.s3.amazonaws.com/cry+of+fear/Engineer_helpme01.ogg',
    'https://monke.s3.amazonaws.com/cry+of+fear/Engineer_helpme03.ogg',
    'https://overwikifiles.com/files/Citizen/Help01_male.ogg'
];

const HI_SOUNDS = [
    'https://overwikifiles.com/files/Citizen/Hi01_male.ogg',
    'https://overwikifiles.com/files/Citizen/Hi02_male.ogg'
];

const BYEAH_SOUNDS = [
    'https://monke.s3.amazonaws.com/byeah/byeah.ogg',
    'https://monke.s3.amazonaws.com/byeah/byeah1.ogg',
    'https://monke.s3.amazonaws.com/byeah/byeah2.ogg',
    'https://monke.s3.amazonaws.com/byeah/byeah3.ogg',
    'https://monke.s3.amazonaws.com/byeah/byeah4.ogg',
    'https://monke.s3.amazonaws.com/byeah/byeah5.ogg'
];

const THINK_SOUNDS = [
    'https://www.youtube.com/watch?v=V-tFWwXTJn8',
    'https://www.youtube.com/watch?v=7neipvZ_H0c',
    'https://www.youtube.com/watch?v=fPmruHc4S9Q',
    'https://www.youtube.com/watch?v=U_JFLb1IItM'
];

const WHIP_SOUNDS = [
    'https://www.youtube.com/watch?v=qwvUvx9W8mA',
    'https://www.youtube.com/watch?v=jMNyPqC12O4'
];

const LOUNGE_SOUNDS = [
    'https://www.youtube.com/watch?v=1prweT95Mo0',
    'https://www.youtube.com/watch?v=0ssxu0Zj7Uw',
    'https://www.youtube.com/watch?v=kSE15tLBdso'
];


var spoonPointer = 0;
var currentSpoonDate = new Date();
var lastSpoonDate = new Date();
const HOW_TO_SPOON_SOUNDS = [
    "https://monke.s3.amazonaws.com/howtospoon/howToSpoon1.ogg",
    "https://monke.s3.amazonaws.com/howtospoon/howToSpoon2.ogg",
    "https://monke.s3.amazonaws.com/howtospoon/howToSpoon3.ogg",
    "https://monke.s3.amazonaws.com/howtospoon/howToSpoon4.ogg",
];

const BOSS_SOUNDS = [
    "https://monke.s3.amazonaws.com/boss+music/boss+grimm.ogg",
    "https://monke.s3.amazonaws.com/boss+music/boss+sephiroth.ogg",
    "https://monke.s3.amazonaws.com/boss+music/boss+vordt.ogg"
];

const BONER_SOUNDS = [
    "https://monke.s3.amazonaws.com/boner/boner+-3.ogg",
    "https://monke.s3.amazonaws.com/boner/boner+-2.ogg",
    "https://monke.s3.amazonaws.com/boner/boner+-1.ogg",
    "https://monke.s3.amazonaws.com/boner/boner+0.ogg",
    "https://monke.s3.amazonaws.com/boner/boner+1.ogg",
    "https://monke.s3.amazonaws.com/boner/boner+2.ogg",
    "https://monke.s3.amazonaws.com/boner/boner+3.ogg"
];

const COUNTRY_SOUNDS = [
    "https://monke.s3.amazonaws.com/country/country+alabama.ogg",
    "https://monke.s3.amazonaws.com/country/country+tex-ex.ogg",
    "https://monke.s3.amazonaws.com/country/country+duel+1.ogg",
    "https://monke.s3.amazonaws.com/country/country+duel+2.ogg",
    "https://monke.s3.amazonaws.com/country/country+koth.ogg"
];

const DRUNKE_SOUNDS = [
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish01.wav",
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish02.wav",
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish03.wav",
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish04.wav",
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish05.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish06.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish08.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish09.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish10.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish12.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_gibberish13.wav", 
    "https://monke.s3.amazonaws.com/demoman/Demoman_jeers06.wav"
];
const TT_LAUGH_SOUNDS = [
    "https://static.wikia.nocookie.net/tattletail/images/0/06/Laughter1.ogg/revision/latest?cb=20170505143643&format=original",
    "https://static.wikia.nocookie.net/tattletail/images/2/2f/Laughter2.ogg/revision/latest?cb=20170505143657&format=original",
    "https://static.wikia.nocookie.net/tattletail/images/2/25/Laughter3.ogg/revision/latest?cb=20170505143717&format=original"
]
const TT_MAMA_SOUNDS = [
    "https://static.wikia.nocookie.net/tattletail/images/c/c4/TMama1.ogg/revision/latest?cb=20170505144615",
    "https://static.wikia.nocookie.net/tattletail/images/b/b2/TMama2.ogg/revision/latest?cb=20170505144642",
    "https://static.wikia.nocookie.net/tattletail/images/e/ef/TMama3.ogg/revision/latest?cb=20170505144709",
    "https://static.wikia.nocookie.net/tattletail/images/b/be/TMama4.ogg/revision/latest?cb=20170505144737",
    "https://static.wikia.nocookie.net/tattletail/images/9/9a/TMama5.ogg/revision/latest?cb=20170505144834",
    "https://static.wikia.nocookie.net/tattletail/images/a/aa/TMama6.ogg/revision/latest?cb=20170505144905",
    "https://static.wikia.nocookie.net/tattletail/images/3/32/TMama7.ogg/revision/latest?cb=20170505144938",
    "https://static.wikia.nocookie.net/tattletail/images/f/f0/Misc14.ogg/revision/latest?cb=20170505144227",
    "https://static.wikia.nocookie.net/tattletail/images/5/58/EmptyBattery.ogg/revision/latest?cb=20170505142938",
    "https://static.wikia.nocookie.net/tattletail/images/b/b5/Ritual2.ogg/revision/latest?cb=20170918231359"
]
const GO_TO_BED_RANGE = ['09:00:00','13:00:00'];
const GO_TO_BED_RANGE_TEST = ['00:00:00','01:00:00'];
const GO_TO_BED_GIFS = ["https://media.giphy.com/media/faIJtxH7QqlVNVBUNl/giphy.gif",
    "https://monophy.com/media/26hiscEbskfemtM7m/monophy.gif",
    "http://i.cdn.turner.com/cnn/2011/LIVING/05/13/go.the.f--k.to.sleep/t1larg.bookillustration.jpg",
    "https://i.kym-cdn.com/entries/icons/original/000/036/356/limmy.jpg"
];

// Main client functions
client.on('ready', async () => {
    client.user.setActivity('his meats cook', { type: 'WATCHING' });
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
    let inittime = new Date();
    console.log(inittime.toLocaleTimeString('it-IT') + " " + inittime.getTimezoneOffset())
    console.log("Parsing through servers...");
    client.guilds.cache.forEach(async server =>{
        if (server.id == constants.SERVER_GOOFS) {
            goofsServer = server;
            console.log("Found our goofs server!");
        }
    });
    console.log(`Monke bot ready`);
    client.channels.fetch('974290034133987429')
    .then(channel => {
        channel.send(`monke started at ${inittime}, it ${inittime.getTimezoneOffset() == 0 ? 'is being hosted via AWS.':`***is being hosted locally***, probably by ${inittime.getTimezoneOffset() >= 420 ? 'socal nerds christian or lisbin.':'the Ohio:tm: lad kebo.'}`}`);
    });
    // msg.guild.channels.cache.get('974290034133987429').send(`monke bot started up and ready`)
});

client.on('message', msg => {

    let currentgettime = new Date().toLocaleTimeString('it-IT');



    ///////////////////////////////////
    //                               //
    //        Admin  Commands        //
    //                               //
    ///////////////////////////////////
    


    if (!(msg.author.id === '690351869650010333')) { //not monke itself
        if (msg.member.roles.cache.has('899529644880056341')) {
            let my_roles = msg.member.roles.cache;
            if (/monke.app pull/i.test(msg.content)) {
                msg.lineReply('pulling latest from git');
                exec('sh shcmd/gitpull.sh');
                return;
            }
            // else {
            //     msg.reply(PULL_DENY_GIFS[Math.floor(Math.random() * PULL_DENY_GIFS.length)]);
            // }
            else if (/monke.app shutdown/i.test(msg.content)) {
                msg.lineReply('shutting down');
                exec('sh shcmd/shutdown.sh');
                return;
            }
            else if (/monke.app restart/i.test(msg.content)) {
                msg.lineReply('restarting, brb');
                exec('sh shcmd/restart.sh');
                return;
            }
        }



    ///////////////////////////////////
    //                               //
    //       Interactive Monke       //
    //                               //
    ///////////////////////////////////


    
        if (msg.content.toLowerCase() === 'howdy') {
            msg.lineReply('Howdy partner :cowboy:');
        }
        else if (/monke perish/i.test(msg.content)) {
            msg.lineReply('https://monke.s3.amazonaws.com/monke/monke%20perish.mp4');
        }
        else if (/monke say time/i.test(msg.content)) {
            console.log(currentgettime);
            msg.lineReply(currentgettime);
        }
        else if(currentgettime >= GO_TO_BED_RANGE[0] && currentgettime <= GO_TO_BED_RANGE[1] && Math.random() >= 0.85 && msg.channel.id === '102109460914257920') {
            msg.lineReply(GO_TO_BED_GIFS[Math.floor(Math.random() * GO_TO_BED_GIFS.length)]);
        }
        else if(/in time range/i.test(msg.content)) {
            msg.lineReply(`The Test Range is ${GO_TO_BED_RANGE[0]} and ${GO_TO_BED_RANGE[1]} local time. ${currentgettime >= GO_TO_BED_RANGE[0] && currentgettime <= GO_TO_BED_RANGE[1] ? '\n You are in the range!':'\n You are  ***N O T***  in the range!'}\n\n*note that this should be used when hosted on cloud*`);
        }
        else if (/reply-confirm/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Jeopardy Theme.mp3');
            msg.lineReply('Confirm with `yes` or deny with `no`')
            msg.channel.awaitMessages(m => m.author.id == msg.author.id,
                {max: 1, time: 30000}).then(collected => {
                        // only accept messages by the user who sent the command
                        // accept only 1 message, and return the promise after 30000ms = 30s

                        // first (and, in this case, only) message of the collection
                        if (collected.first().content.toLowerCase() == 'yes') {
                                msg.channel.send('CONFIRMATION CONFIRMIFIED');
                                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Stage Clear 2 - Super Smash Bros. Melee.mp3');
                        }
                        else {
                            msg.channel.send('Operation canceled.');
                            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/fart.mp3');
                        }
                                 
                }).catch(() => {
                        message.lineReply('No answer after 30 seconds, operation canceled.');
                });
        }
        else if (/emoji-confirm/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Jeopardy Theme.mp3');
            msg.lineReply(`Confirm by reacting with '👍' or '👎'.`);
            msg.react('👍').then(r => {
                msg.react('👎');
            });
            msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
                {max: 1, time: 33000}).then(collected => {
                        // only accept messages by the user who sent the command
                        // accept only 1 message, and return the promise after 30000ms = 30s

                        // first (and, in this case, only) message of the collection
                        if (collected.first().emoji.name == '👍') {
                                msg.channel.send('CONFIRMATION CONFIRMIFIED');
                                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Stage Clear 2 - Super Smash Bros. Melee.mp3');
                        }
                        else {
                            msg.channel.send('Operation canceled.');
                            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/fart.mp3');
                        }
                }).catch(() => {
                        msg.lineReply('No answer after 30 seconds, operation canceled.');
                });
        }
        else if (/nia/i.test(msg.content)) {
            if (Math.random() >= 0.90) {
                msg.channel.send("<@" + constants.USERS.KENNY + ">");
            }
        }
        else if (/amon?g\s*us/i.test(msg.content)) {
            msg.channel.send('ඞ');
        }        
        else if (/(fuck\s*you|shut.*up).*monke/i.test(msg.content)) {
            msg.channel.send(SAD_GIFS[Math.floor(Math.random() * SAD_GIFS.length)]);
        }
        else if (/boof/i.test(msg.content)) {
            msg.channel.send(BOOF_GIFS[Math.floor(Math.random() * BOOF_GIFS.length)]);
        }
        else if (/monke.*time.*(left|til|for)/i.test(msg.content)) {
            sendCountdownStatus(true);
        }
        else if (msg.author.id === constants.TODDBOT) {
            if (Math.random() >= 0.75) {
                msg.channel.send("Shut the fuck up, Todd");
            }
        }
        else if (/monke.*th(ink|oughts)/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * THINK_SOUNDS.length)
            mYouTube.playSound(msg, THINK_SOUNDS[rnd]);
        }
        else if (/monke.*clear/i.test(msg.content)){
            let cacheRegex = /(monke clear) (\w+ ?\w+)/i;
            let input = msg.content.match(cacheRegex)[2];
            if(input == null){
                msg.lineReply(`please specify which command to clear. EX: 'monke clear lounge piano'`)
            }
            else if(aws.clearCache(input.replace(' ','/'))){
                msg.lineReply(`${input} has been cleared.`)
            }
        }
        else if (/star.*trek/i.test(msg.content)) {
            if (Math.random() >= 0.90) {
                msg.lineReply('https://monke.s3.amazonaws.com/monke/nerd-alert.mp4');
            }
        }
        

        
        ///////////////////////////////////
        //                               //
        //      Gen/Youtube  Sounds      //
        //                               //
        ///////////////////////////////////



        else if (/kenna/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=6vtsKGzGVK4');
        }
        // else if (/sax.*(and|&).*sex/i.test(msg.content)) {
        //     mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=c51x_iJjjD0', '290');
        // }
        else if (/cock.*rock/i.test(msg.content)) {
            if (Math.random() >= 0.90) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=ZYR_r0A-K3g');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=6yisws5rKoo');
            }
        }
        else if (/jabroni/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=8K2wTF7pZzI');
        }
        else if (/(you are already dead|omae wa mou shindeiru)/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=U_EV0HAHBTQ');
        }
        else if (/explo(d|si)/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=GN_lbeRuM0k');
        }
        else if (/monke.*\srap\s*$/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=zlm6bcMD7Fg');
        }
        else if (/^music$/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=Lb4b91Ken7Y');
        }
        else if (/west virginia/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=1vrEljMfXYo');
        }
        else if (/what.*are.*you.*doing/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=gOBimZmfw_4');
        }
        else if (/sylvanas/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=AdYPzbPiosg', '17');
        }
        else if (/wednesday/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=du-TY1GUFGk');
        }
        else if (/friday/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=5Ib_PrnSi50');
        }
        else if (/say\s*goodbye/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=wtx0fdzRAp8');
        }
        else if (/rick\s*roll/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=3BFTio5296w');
        }
        else if (/ram\s*ranch/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MADvxFXWvwE');
        }
        else if (/bonk/i.test(msg.content)) {
            var randomAmt = Math.random();
            if (randomAmt >= 0.99) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=5KEPE2VUSA8');
            } else if (randomAmt >= 0.95) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=08EqQPIvHOU');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=gwxTZaa3NgI');
            }
        }
        else if (/don.?t\s*do\s*it/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=gTUALBzIBWM');
        }
        else if (/speen|spin/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=cerkDJLuT_k');
        }
        else if (/monke.*that.?s\s*shit/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=jyeI3Ziii6w', '9');
        }
        else if (/football/i.test(msg.content)) {
            if (Math.random() >= 0.5) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=37-AlmNdESg');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=ZKPnAfopfO8');
            }
        }
        else if (/monke.*timecard/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=' + timecards.getRandomTimecardVideoID());
        }
        else if (/monke.*play\s*despacito/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=W3GrSMYbkBE');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=FWOXAPI5kZg');
            }
        }
        else if (/CBT/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=fR9ClX0egTc');
            } else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/cbt.ogg');
            }
        }
        else if (/goofy/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MUL5w91dzbo');
        }
        else if (/oof/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=N8xVS57hAs4');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=3w-2gUSus34');
            }
        }
        else if (/ford truck month/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=RVKmdsO6f3g');
        }
        else if (/surprise/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=1gehTA2DTcE');
        }
        else if (/phasmo/i.test(msg.content)) {
            console.log('spooky incoming...')
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=' + phasmo.getRandomSpiritBoxVideoID());
        }
        else if (/shut\s*up/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=ptAVrZh7hV0');
        }
        else if (/u\s*right/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MCT80HJWQ2A', '4');
        }
        else if (/john/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=dGu2Be6tS1A');
        }
        else if (/800.?588.?2300/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=ovVvtC4wXSQ');
        }
        else if (/1.?900.?490.?FREAK|freddie\s*freaker/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MmOiRyWLug0');
        }
        else if (/godzilla/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=JkUQ6s4mrWw');
        }
        else if (/taco\s*bell/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=dNl4-w9ZrBs');
        }
        else if (/egg/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=nhB5WoUYQbc');
        }
        else if (/bean/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=60l1nZIhslU');
        }
        else if (/jam/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=aAh7UnQnC7I');
        }
        else if (/cheese/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=Kf2CSy_ZHCA', '5');
        }
        else if (/pizza/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=czTksCF6X8Y');
        }
        else if (/kick.*butt/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MVMyxJiA9Cg');
        }
        else if (/clap/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=EHjWieD29AM');
        }
        else if (/sell?\s?fish/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=I1USdCFPR_A');
        }
        else if (/what'?s\s*your\s*point/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=Jk5qghpFY-g');
        }
        else if (/find\s*jeffrey/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=jj_TywZ_X_w', '13');
        }
        else if (/brerb/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=1mQG7z-5wok');
        }
        else if (/krabby\s*patty/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=E-xhxS581Uc');
        }
        else if (/devious/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=FFVu0Zbth2A');
        }
        else if (/game\s*over/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=IsS_VMzY10I');
        }
        else if (/liberal/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=QxdC2H2Nndg');
        }
        else if (/careless|whisper/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=izGwDsrQ1eQ');
        }
        else if (/stop\s*it|get\s*some\s*help/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=9Deg7VrpHbM');
        }
        else if (/huge/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=h8Jui7XaKQA');
        }
        else if (/toxic/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=xr5t5vG1fHY');
        }
        else if (/th[sa]nks/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=OLmun1JEIw0', '41');
        }
        else if (/uncle/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=XvbxrpFx0FU');
        }
        else if (/iasip/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=idoYCVLh2qI');
        }
        else if (/get\s*you\s*bitch/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=bip40seuVqI');
        }
        else if (/congratulations|congrats/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=wDajqW561KMx');
        }
        else if (/brain/i.test(msg.content)) {
            if (Math.random() >= 0.8) {
                mYouTube.playSound(msg, "https://monke.s3.amazonaws.com/brain+crit.mp3")
            }
            else {
                mYouTube.playSound(msg, 'https://youtu.be/UKU0AdOMXLA');
            }
        }
        else if (/horsey|chobunso/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/2QYcKByGEY8');
        }
        else if (/scatman/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/Hy8kmNEo1i8');
        }
        else if (/america|🇺🇸|🦅/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/MhQ5678cJU8');
        }
        else if (/burger\s*king|foot\s*lettuce/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/XPnwmZ6gf6I');
        }
        else if (/Emily|X[-\s]files/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/Vpqffgak7To');
        }
        else if (/beginning|beninging/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/fRCOpbp_Wyo');
        }
        else if (/Charles|pull\s*up|capybara/i.test(msg.content)) {
            if (Math.random() >= 0.60) {
                mYouTube.playSound(msg, 'https://youtu.be/v8Q4BSgBkRc');
                msg.channel.send('https://c.tenor.com/g05O_S6b0f4AAAAd/capybara-ok-i-pull-up.gif');
            }
        }
        else if (/oh\s*ok/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/UrdhAzKcfNk');
        }
        else if (/i'?ll\s*kill\s*ya/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/NfrKsyUJqI4');
        }
        else if (/sigma/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/1-emQo-7O3Y');
        }
        else if (/mail/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/fzRC37grckk');
        }
        else if (/shut\s*down/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/m1QrNZCjRag');
        }
        else if (/oh\s*my\s*goodness/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/6k5VOvrBCss');
        }
        else if (/do\s*your\s*best/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/jGatO6vMPqw', '9');
        }
        else if (/dosh|loads\s*a\s*money/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/ULeDlxa3gyc');
        }
        else if (/beat\s*that\s*bitch/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/mRowQGqkjRA');
        }
        else if (/horny/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/_jhgncXEbjc');
        }
        else if (/you\s*can'?t\s*milk\s*those/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/RlKVC-MRmjA');
        }
        else if (/milk/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/I9gLFHj5AWk', '4');
        }
        else if (/wombo\s*combo/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/5PMmPRBfdBQ');
        }
        else if (/interior|crocodile|alligator/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/kZwhNFOn4ik');
        }
        else if (/hold\s*it!/i.test(msg.content)) {
            var prob = Math.random()
            if (prob <= 0.5) {
                mYouTube.playSound(msg, 'https://youtu.be/66LCfFqIbAA');
            } else if (prob <= 0.85) {
                mYouTube.playSound(msg, 'https://youtu.be/d7SYy5JvyOA');
            } else {
                mYouTube.playSound(msg, 'https://youtu.be/TIZH3Ur0zcQ');
            }
        }
        else if (/take\s*that!/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://youtu.be/fR4P8o95WPA');
        }
        else if (/OBJECTION!/.test(msg.content)) {
            if (Math.random() >= 0.5) {
                mYouTube.playSound(msg, 'https://youtu.be/UxnvGDK0WGM');
            }
            else {
                mYouTube.playSound(msg, 'https://youtu.be/lAWdWk6a2gg');
            }
        }
        else if (/that'?s\s*hilarious/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=oj0Nu5yTnTA');
        }
        else if (/bojji/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=wWnak7V8hr0');
        }
        else if (/mortis/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=iHLMnP7bpnk');
        }
        else if (/tequila/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=U_JFLb1IItM');
        }
        else if (/bitconnect/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=772eWds6z0U');
        }
        else if (/bwop/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=EIA1iX7Ooz8');
        }
        else if (/disappoint/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=Ncgv7ruZ6HU');
        }
        else if (/gambino/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=bdYIC-otbvU');
        }
        else if (/whip/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * WHIP_SOUNDS.length)
            mYouTube.playSound(msg, WHIP_SOUNDS[rnd]);
        }
        else if (/g(arry'?s)?\s*mod/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=_GGfz-o5khc');
        }
        else if (/winner/i.test(msg.content)) {
            if (Math.random() >= 0.9) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=d6ySILG_7xk');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Stage+Clear+2+-+Super+Smash+Bros.+Melee.wav');
            }
        }
        else if (/bruh\s*moment/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=i8ooQ8vOAAs');
        }
        else if (/yoooo+/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=VKMw2it8dQY');
        }
        else if (/stargate/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=yWCP8lcbcJg');
        }
        else if (/tng/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=cTLRQDWHQlQ', '12');
        }
        else if (/yes\s*(or)?\s*no|true\s*(or)?\s*false/i.test(msg.content)) {
            var prob = Math.random();
            if (prob <= 0.48) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MCT80HJWQ2A');
            } else if (prob <= 0.96) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=GM-e46xdcUo');
            } else if (prob <= 0.98) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=yMLW6yj8XNY');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=WXwWaueB1Ss');
            }
        }
        // else if (/lounge/i.test(msg.content)) {
        //     rnd = Math.floor(Math.random() * LOUNGE_SOUNDS.length)
        //     mYouTube.playSound(msg, LOUNGE_SOUNDS[rnd]);
        // }
        else if (/sexy/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=kQL7LW3CWXs');
        }
        else if (/scooby/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=igSHbtv52G4');
        }
        else if (/wildstar/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=ey0wgQYTwnU');
        }
        else if (/flashbang/i.test(msg.content)) {
            if (Math.random() < 0.75) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=5tXQ91BYXgg');
            } else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=kjkFP1jU4hk');
            }
        }
        else if (/ladder/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=8aYeoR9LVlI');
        }
        else if (/sneater/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=MxbVL-lYx3w');
        }
        else if (/sumo/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=W2zAg39AXcs');
        }
        else if (/pretty\s*good/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=JeimE8Wz6e4');
        }
        else if (/I\s*clapped(!|when\s*I\s*saw\s*it)/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=4rNhTcq4Iqk');
        }
        else if (/fart?scape/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.us-east-1.amazonaws.com/Fartscape.wav');
        }
        else if (/punchline/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=-h1F93EJIds');
        }
        else if (/taps/i.test(msg.content)) {
            if (Math.random() >= 0.75) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/drunk taps.wav');
            }
            else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=WChTqYlDjtI');
            }
        }
        else if (/batman/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=DKq4uoGdnFw');
        }
        else if (/celebrat/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=1Qu6Dyn-c6M');
        }
        


        else if (/(balloon\s*boy|balloonboy|bb)\s*hello/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSound(msg, BB_SOUNDS[1]);
        }
        else if (/(balloon\s*boy|balloonboy|bb)\s*hi/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSound(msg, BB_SOUNDS[0]);
        }
        else if (/(balloon\s*boy|balloonboy|bb)\s*(haha|laugh)/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSound(msg, BB_SOUNDS[2]);
        }
        else if (/balloon\s*boy|balloonboy/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSound(msg, BB_SOUNDS[rnd]);
        }
        else if (/icpp/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Vo_nyx_assassin_nyx_attack_16.mp3/revision/latest?cb=20201017155639');
        }
        else if (/^ow+$/i.test(msg.content)) {
            if (Math.random() >= 0.85) {
                mYouTube.playSound(msg, "https://monke.s3.amazonaws.com/oww/owwcrit.ogg")
            }
            else {
                rnd = Math.floor(Math.random() * OWW_SOUNDS.length)
                mYouTube.playSound(msg, OWW_SOUNDS[rnd]);
            }
        }
        else if (/help/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * HELP_SOUNDS.length)
            mYouTube.playSound(msg, HELP_SOUNDS[rnd]);
        }
        else if (/pirate/i.test(msg.content)) {
            if (Math.random() >= 0.85) {
                mYouTube.playSound(msg, "https://monke.s3.amazonaws.com/spencer_crit.mp3")
            }
            else {
                mYouTube.playSound(msg, "https://monke.s3.amazonaws.com/spencer.mp3")
            }
        }
        else if (/spencer/i.test(msg.content)) {
            if (Math.random() >= 0.50) {
                if (Math.random() >= 0.90) {
                    mYouTube.playSound(msg, "https://monke.s3.amazonaws.com/spencer_crit.mp3")
                }
                else {
                    mYouTube.playSound(msg, "https://monke.s3.amazonaws.com/spencer.mp3")
                }
            }
        }
        else if (/mmm monke/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/mm_monke.ogg');
        }
        else if (/^hi$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * HI_SOUNDS.length)
            mYouTube.playSound(msg, HI_SOUNDS[rnd]);
        }
        else if (/^intermission$/i.test(msg.content)) {
            if (Math.random() >= 0.85) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/intermission crit.mp3');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/09+-+Intermission.mp3');
            }
        }
        else if (/duke\s?1\s?\.5/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke1-1.ogg');
        }
        else if (/duke\s?1/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke1.ogg');
        }
        else if (/duke2\s?\.5/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke2-1.ogg');
        }
        else if (/duke2\s?\.6/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke2-2.ogg');
        }
        else if (/duke\s?2/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke2.ogg');
        }
        else if (/duke3\s?\.5/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke3-1.ogg');
        }
        else if (/duke\s?3/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke3.ogg');
        }
        else if (/duke\s*riff/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/duke+riff/duke+riff.ogg');
        }
        else if (/meeting of the byeahs?/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/byeah/meeting+of+the+byeah.ogg');
        }
        else if (/^byeah attack$/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/byeah/byeah+attack.ogg');
        }
        else if (/^byeah$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BYEAH_SOUNDS.length)
            mYouTube.playSound(msg, BYEAH_SOUNDS[rnd]);
        }
        else if (/monke.*fart/i.test(msg.content)) {
            if (Math.random() >= 0.92) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=5I-Np6VFlAo');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/fart-with-reverb.mp3');
            }
        }
        else if (/monke.*suck|monke.*succ/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/fart_with_extra_reverb_reversed.mp3');
        }
        else if (/monke.*die/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/yt1s.com+-+Metal+Gear+Solid+Snake+death+scream+sound+effect.mp3');
        }
        else if (/monke.*nut/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/yt1s.com+-+Worlds+Loudest+Orgasm.mp3');
        }
        else if (/how\s*to\s*spoon/i.test(msg.content)) {
            currentSpoonDate = new Date();
            if ((Math.abs(currentSpoonDate - lastSpoonDate) / 1000) > 60) {
                spoonPointer = 0;
            }
            lastSpoonDate = currentSpoonDate;
            mYouTube.playSound(msg, HOW_TO_SPOON_SOUNDS[spoonPointer]);
            spoonPointer = (spoonPointer+1) % HOW_TO_SPOON_SOUNDS.length;
        }
        else if (/^what\??$/i.test(msg.content)) {
            currentSpoonDate = new Date();
            if (spoonPointer > 0 && (Math.abs(currentSpoonDate - lastSpoonDate) / 1000) <= 60) {
                lastSpoonDate = currentSpoonDate;
                mYouTube.playSound(msg, HOW_TO_SPOON_SOUNDS[spoonPointer]);
                spoonPointer = (spoonPointer+1) % HOW_TO_SPOON_SOUNDS.length;
            }
        }
        else if (/^cyberpunk|cyberriff|cyber.*riff|^2077$/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/cyber riff.ogg');
        }
        else if (/sea\s*shanty/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/BiggieShanty.ogg');
            } else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Ian Taylor - Sea Shanty 2.mp3');
            }
        }
        else if (/^e$/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/e+crit.ogg');
            } else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/e-long.ogg');
            }
        }
        else if (/^boss.*(music|fight)$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BOSS_SOUNDS.length)
            mYouTube.playSound(msg, BOSS_SOUNDS[rnd]);
        }
        else if (/^boss\s*vordt/i.test(msg.content)) {
            mYouTube.playSound(msg, BOSS_SOUNDS[0]);
        }
        else if (/^boss\s*sephiroth/i.test(msg.content)) {
            mYouTube.playSound(msg, BOSS_SOUNDS[1]);
        }
        else if (/^boss\s*grimm/i.test(msg.content)) {
            mYouTube.playSound(msg, BOSS_SOUNDS[2]);
        }
        else if (/very\s*cool/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/very+cool.mp3?_=2');
        }
        else if (/^boner\s*-3/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[0]);
        }
        else if (/^boner\s*-2/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[1]);
        }
        else if (/^boner\s*-1/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[2]);
        }
        else if (/^boner\s*0/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[3]);
        }
        else if (/^boner\s*1/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[4]);
        }
        else if (/^boner\s*2/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[5]);
        }
        else if (/^boner\s*3/i.test(msg.content)) {
            mYouTube.playSound(msg, BONER_SOUNDS[6]);
        }
        else if (/^boner$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BONER_SOUNDS.length)
            mYouTube.playSound(msg, BONER_SOUNDS[rnd]);
        }
        else if (/^country$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * COUNTRY_SOUNDS.length)
            mYouTube.playSound(msg, COUNTRY_SOUNDS[rnd]);
        }
        else if (/dun\s*dun|law\s*and\s*order/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/dun+dun.ogg');
        }
        else if (/^shart/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/shart.mp3');
        }
        else if (/fitness\s*gram\s*pacer\s*test/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/at_night_i_think_of.mp3');
        }
        else if (/YYYY/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/YYYY.mp3');
        }
        else if (/monkey?\s*story/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/The_Story_Of_Three_Socks_And_The_Gold_Bears.mp3');
        }
        else if (/drunke/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * DRUNKE_SOUNDS.length)
            mYouTube.playSound(msg, DRUNKE_SOUNDS[rnd]);
        }
        else if (/oreo/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/no_more_oreos.ogg');
        }
        else if (/heHEhe/.test(msg.content)) {
            mYouTube.playSound(msg, TT_LAUGH_SOUNDS[0]);
        }
        else if (/hehehe/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * TT_LAUGH_SOUNDS.length)
            mYouTube.playSound(msg, TT_LAUGH_SOUNDS[rnd]);
        }
        else if (/halo/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('HaloAnnouncer')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/be\s*quiet/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/I_would_really_prefer_if_you_would_be_quiet.mp3');
        }
        else if (/these\s*are\s*the\s*mysteries|tatm/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/These_Are_The_Mysteries.mp3');
        }
        else if(/Valve/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Valve.mp3');
        }
        else if (/fox\s*fanfare/i.test(msg.content)) {
            if (Math.random() >= 0.80) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Fox_Fanfare_shitty.mp3');
                msg.channel.send('https://imgur.com/F8KZaFl');
            } else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/01 - 20th Century Fox Fanfare.mp3');
            }
        }
        else if(/b(o|u)rgir/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/borgir.mp3');
        }
        else if (/spooky\s*string/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('SpookyString')
                mYouTube.playSound(msg, url);
            })()
        }
        else if(/sax\s*(and|&)\s*sex/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Sax & Sex - Simply the best.mp3');
        }
        else if(/tt\s*uh.*oh/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://static.wikia.nocookie.net/tattletail/images/5/58/EmptyBattery.ogg/revision/latest?cb=20170505142938');
        }
        else if(/no\s*more\s*mama/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://static.wikia.nocookie.net/tattletail/images/b/b5/Ritual2.ogg/revision/latest?cb=20170918231359');
        }
        else if (/tt\s*mama/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * TT_MAMA_SOUNDS.length)
            mYouTube.playSound(msg, TT_MAMA_SOUNDS[rnd]);
        }
        else if (/star.*war/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('the  star war', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/(cantina\s*band|jizz)/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('the  star war/cantina band')
                mYouTube.playSound(msg, url);
            })()
        }
        else if(/bbq?.*pit boys/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/BBQ Pit Boys, Blue House - BBQ Shoes.mp3');
        }
        else if(/The entire bee movie|laws of aviation|According to all known laws of aviation, there is no way a bee should be able to fly/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/The Entire Bee Movie.mp3');
        }
        else if(/The entire shrek movie/i.test(msg.content)) {
            if (Math.random() >= 0.49) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/shrek retold.mp3');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/The Entire Shrek Movie.mp3');
                msg.channel.send('https://i.redd.it/4vwc2telggr21.gif');
            }
        }
        else if (/bee/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                msg.channel.send(beeGif);
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=8CvqmD0CZao');
            } else {
                msg.react('🐝').catch(function() {
                    console.log("whoopsies");
                });
            }
        }
        else if (/shrek|somebody\s*once\s*told\s*me/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=g7_VlmEamUQ');
        }
        else if (/doodle.*dip/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/doodledip.mp3');
        }
        else if (/I\s*can.*t\s*take\s*(it|this)\s*anymore/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/I cant take it anymore.mp3');
        }
        else if (/i.*m\s*working\s*on\s*it/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('im working on it')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/pumpkin\s*cowboy/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=4iTAkRHGbuM');
        }
        else if (/SHUT\s*THE\s*FUCK\s*UP/.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/SHUT THE FUCK UP penn.mp3');
        }
        else if (/soccer/.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Mundial Ronaldinho Soccer 64.mp3');
        }
        else if(/a\s*ghost.*s\s*pumpkin\s*soup|Pumpkin\s*hill/i.test(msg.content)) {
            if (Math.random() >= 0.49) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/A Ghost\'s Pumpkin Soup ...for Pumpkin Hill - Sonic Adventure 2 - crit.mp3');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/A Ghost\'s Pumpkin Soup (Pumpkin Hill) - Sonic Adventure 2 [OST].mp3');
                msg.channel.send('https://i.redd.it/4vwc2telggr21.gif');
            }
        }
        else if(/luck/i.test(msg.content)) {
            if (Math.random() >= 0.49) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/luckluckluck.wav');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/luck.mp3');
            }
        }
        else if(/mars\s*the\s*bringer\s*of\s*war/i.test(msg.content)) {
            if (Math.random() >= 0.89) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/mars crit.mp3');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/mars.mp3');
            }
        }
        else if(/super\s*mario\s*world/i.test(msg.content)) {
            if (Math.random() >= 0.89) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/soundclown/dinosaur-land.wav');
            }
            else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=waKumDkYrDY');
            }
        }
        else if(/jeopardy/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Jeopardy Theme.mp3');
        }
        else if (/bad.*to.*the.*bone.*but.*it.*is.*ear.*rape/.test(msg.content)) {
            msg.channel.send('https://tenor.com/view/esqueleto-gif-24452082');
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/bad to the bone ear rape.wav');
        }
        else if (/(rimshot|ba.*dum.*ti?sh?)/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('badumtss')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/bad.*to.*the.*bone/.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Bad_To_The_Bone.mp3');
        }
        else if(/(bad|bone)/i.test(msg.content)) {
            let bad_random = Math.random().toFixed(3);
            msg.guild.channels.cache.get('974290034133987429').send(`${bad_random} bad`)
            if (bad_random >= 0.99) {
                msg.lineReply('https://tenor.com/view/esqueleto-gif-24452082');
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/bad to the bone ear rape.wav');
            }
            else {
               if (bad_random >= 0.70) {
                    mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/bad to the bone normal.mp3');
                }
                else {
                    mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/bad to the bone quiet.mp3');
                } 
            }
        }
        else if (/jon/i.test(msg.content)) {
            if (Math.random() >= 0.60) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/Jon Jon Jon.mp3');
            }
        }
        else if (/dial.?up/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/dialup.mp3');
        }
        else if (/thx/i.test(msg.content)) {
            if (Math.random() >= 0.60) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/soundclown/thx-crank.mp3');
            }
            else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/thx-normal.mp3');
            }
        }
        else if (/sound.*clown/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('soundclown', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/clown/i.test(msg.content)) {
            if (Math.random() >= 0.75) {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=0AZpwvAOnqM');
            }
            else {
                mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=S280Pqq3T_w');
            }
        }
        else if (/(cleveland)/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('cleveland')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/laugh\s*track/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=QGroZXx2eGM');
        }
        else if (/grill/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=K21kmzN5Zk8', '8');
        }
        else if (/(vine|boom)/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/vine-boom.mp3');
        }
        else if (/why.*are.*you.*gay/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/why are you gay.wav');
        }
        else if (/g(od|ah)\s*dam/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('GahDamn')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/pump test/i.test(msg.content)) {
            (async () => {

                let url1 = aws.getRandomFromFolder('HungryPumpkin/Give Me')
                let url2 = aws.getRandomFromFolder('HungryPumpkin/foods')

                Promise.all([url1, url2]).then( ([giveMe, food]) => {
                    mYouTube.playSound(msg, giveMe)
                        .then(() => mYouTube.playSound(msg, food))
                })
            })()
        }
        else if (/no.*I.*don.*t.*want.*that/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/HungryPumpkin/h_no.wav');
            sleep(1550).then(() => {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/HungryPumpkin/h_idontwant.wav');
            });
        }
        else if (/you have (failed|lost) the challenge/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/gnome/GNOME CHALLENGE.mp3');
        }
        else if (/(gnome|ha.*he)/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/gnome/GNOME HAHE.mp3');
        }
        else if (/caught in 4k/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/CameraShutter.mp3');
        }
        else if (/snore/i.test(msg.content)) {
            if (Math.random() >= 0.75) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/snoreCrit.mp3');
            } else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/snore.mp3');
            }
        }
        else if (/xra/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=mR65v4fDqOc'); 
        }
        else if(/https:\/\/tenor.com\/view\/yippee-gif-25852454/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/yippee/yippee.mp3');
        }
        else if(/yippee/i.test(msg.content)) {
            if (Math.random() >= 0.85) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/yippee/yippee jazz.mp3');
            } if (Math.random() >= 0.70) {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/yippee/yippee full.mp3');
            } else {
                mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/yippee/yippee.mp3');
                msg.channel.send('https://tenor.com/view/yippee-gif-25852454');
            }
        }
        // else if(/replace me!/i.test(msg.content)) {
        //     mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=mR65v4fDqOc'); 
        // }



    ///////////////////////////////////
    //                               //
    //       EEnE Sound Effects      //
    //                               //
    ///////////////////////////////////



        else if (/(EEnE\s*)?bird/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('EEnE/birds')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/EEnE\s*monkey/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('EEnE/monkey')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/EEnE\s*orangutan/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('EEnE/orangutan')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/EEnE\s*horse/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('EEnE/horse')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/EEnE\s*impact/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('EEnE/impact')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/EEnE\s*band/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('EEnE/Band Hits')
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/(EEnE\s*88|88)\s*Fingers|slide\s*guitar/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE 88 Fingers Edd.wav');
        }
        else if (/EEnE Hello/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE Hello.wav');
        }
        else if (/EEnE Title/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE - Episode Title.wav');
        }
        else if (/crow/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE Crows.wav');
        }
        else if (/EEnE\s*Mama/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE Mama Doll.wav');
        }
        else if (/EEnE\s*slide/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE Slide 2 longer.wav');
        }
        else if (/EEnE\s*horn/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE THE Horn.wav');
        }
        else if (/https:\/\/tenor.com\/view\/life-has-many-doors-ed-boy-ed-boy-many-doors-yes-gif-20774500/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE VOX ROLF Many Doors Ed Boy.wav');
        }
        else if (/EEnE\s*doors/i.test(msg.content)) {
            msg.channel.send('https://tenor.com/view/life-has-many-doors-ed-boy-ed-boy-many-doors-yes-gif-20774500');
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE VOX ROLF Many Doors Ed Boy.wav');
        }
        else if (/EEnE\s*yodel/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE Yodel Goofy.wav');
        }
        else if (/EEnE\s*baby\s*gasp/i.test(msg.content)) {
            mYouTube.playSound(msg, 'https://monke.s3.amazonaws.com/EEnE/EEnE Baby Gasp 1.wav');
        }



    ///////////////////////////////////
    //                               //
    //        Lounge  Commands       //
    //                               //
    ///////////////////////////////////



        else if (/lounge\s*classical/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('lounge/classical', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/lounge\s*piano/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('lounge/piano', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/lounge\s*jazz/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('lounge/jazz', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/lounge\s*video\s*game/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('lounge/video_games', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }
        else if (/lounge\s*movie/i.test(msg.content)) {
            (async () => {
                let url = await aws.getRandomFromFolder('lounge/movie', msg)
                msg.lineReply(`Now Playing: ${replyNowPlaying(url)}`)
                mYouTube.playSound(msg, url);
            })()
        }


        
    ///////////////////////////////////
    //                               //
    //         Monke  Houses         //
    //                               //
    ///////////////////////////////////



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
            mYouTube.playSound(msg, 'https://www.youtube.com/watch?v=renyltL2Dnc');
            // https://stackoverflow.com/questions/23766259/restart-node-js-server-programmatically
        }
        else if (msg.mentions.has(client.user) && !msg.mentions.everyone) { // If message is pinging Monke Bot (but not pinging everyone)
            msg.channel.send(PINGED_GIFS[Math.floor(Math.random() * PINGED_GIFS.length)]);
            // Also jump into the channel that the user is in and play a join sound
            (async () => {
                let url = await aws.getRandomFromFolder('MonkeJoinSounds')
                mYouTube.playSound(msg, url);
            })()
        }

    }
});

client.on('messageDelete', msg => {
    if (Math.random() >= 0.91) {
        msg.lineReply('I saw you delete that. You can\'t hide your mistakes.');
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

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function replyNowPlaying(url){
    let urlSplit = url.split('/');
    let nowPlaying = urlSplit[urlSplit.length-1]
    return nowPlaying
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
