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

const BOOF_GIFS = [
    "https://c.tenor.com/jcjQaLHIG_YAAAAd/have-boof.gif",
    "https://c.tenor.com/XX7_VZxPgw8AAAAd/forgot-the-boof.gif",
    "https://c.tenor.com/88KcKzh9LrUAAAAC/judgement-judgeeyes.gif"
];

// Assorted sound arrays
const BB_SOUNDS = [
    'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/b/b5/Echo1.ogg/revision/latest?cb=20141113012504',
    'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/0/0e/Echo3b.ogg/revision/latest?cb=20141113012523',
    'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/2/2d/Echo4b.ogg/revision/latest?cb=20141113012542'
];

const OWW_SOUNDS = [
    "https://static.wikia.nocookie.net/monkebot/images/7/7a/Oww.ogg/revision/latest?cb=20211022063550",
    "https://static.wikia.nocookie.net/monkebot/images/0/08/Oww2.ogg/revision/latest?cb=20211022063325"
];

const HELP_SOUNDS = [
    'https://static.wikia.nocookie.net/monkebot/images/b/b1/Help_1.ogg/revision/latest?cb=20211022064642',
    'https://static.wikia.nocookie.net/monkebot/images/e/ec/Help_2.ogg/revision/latest?cb=20211022064701',
    'https://static.wikia.nocookie.net/monkebot/images/9/9a/Help_3.ogg/revision/latest?cb=20211022064719',
    'https://static.wikia.nocookie.net/monkebot/images/c/c8/Help_4.ogg/revision/latest?cb=20211022064730',
    'https://static.wikia.nocookie.net/monkebot/images/1/12/Help_5.ogg/revision/latest?cb=20211022064739',
    'https://static.wikia.nocookie.net/monkebot/images/e/ea/Engineer_helpme01.ogg/revision/latest?cb=20211022064755',
    'https://static.wikia.nocookie.net/monkebot/images/1/12/Engineer_helpme03.ogg/revision/latest?cb=20211022064803',
    'https://overwikifiles.com/files/Citizen/Help01_male.ogg'
];

const HI_SOUNDS = [
    'https://overwikifiles.com/files/Citizen/Hi01_male.ogg',
    'https://overwikifiles.com/files/Citizen/Hi02_male.ogg'
];

const BYEAH_SOUNDS = [
    'https://static.wikia.nocookie.net/monkebot/images/c/cd/Byeah.ogg/revision/latest?cb=20211118102233',
    'https://static.wikia.nocookie.net/monkebot/images/d/dc/Byeah1.ogg/revision/latest?cb=20211118102254',
    'https://static.wikia.nocookie.net/monkebot/images/5/56/Byeah2.ogg/revision/latest?cb=20211118102324',
    'https://static.wikia.nocookie.net/monkebot/images/d/dc/Byeah3.ogg/revision/latest?cb=20211118102354',
    'https://static.wikia.nocookie.net/monkebot/images/f/f4/Byeah4.ogg/revision/latest?cb=20211118102415',
    'https://static.wikia.nocookie.net/monkebot/images/1/17/Byeah5.ogg/revision/latest?cb=20211118102441'
];

const THINK_SOUNDS = [
    'https://www.youtube.com/watch?v=V-tFWwXTJn8',
    'https://www.youtube.com/watch?v=7neipvZ_H0c',
    'https://www.youtube.com/watch?v=fPmruHc4S9Q',
    'https://www.youtube.com/watch?v=U_JFLb1IItM'
];

var spoonPointer = 0;
var currentSpoonDate = new Date();
var lastSpoonDate = new Date();
const HOW_TO_SPOON_SOUNDS = [
    "https://static.wikia.nocookie.net/monkebot/images/6/66/HowToSpoon1.ogg/revision/latest?cb=20211211061733",
    "https://static.wikia.nocookie.net/monkebot/images/f/f2/HowToSpoon2.ogg/revision/latest?cb=20211211061819",
    "https://static.wikia.nocookie.net/monkebot/images/9/95/HowToSpoon3.ogg/revision/latest?cb=20211211061825",
    "https://static.wikia.nocookie.net/monkebot/images/3/31/HowToSpoon4.ogg/revision/latest?cb=20211211061836"
];

const BOSS_SOUNDS = [
    "https://static.wikia.nocookie.net/monkebot/images/3/37/Boss_vordt.ogg/revision/latest?cb=20220129223209",
    "https://static.wikia.nocookie.net/monkebot/images/8/86/Boss_sephiroth.ogg/revision/latest?cb=20220129223642",
    "https://static.wikia.nocookie.net/monkebot/images/c/c0/Boss_grimm.ogg/revision/latest?cb=20220129225349"
];

const BONER_SOUNDS = [
    "https://static.wikia.nocookie.net/monkebot/images/5/5d/Boner_-3.ogg/revision/latest?cb=20220130044031",
    "https://static.wikia.nocookie.net/monkebot/images/8/82/Boner_-2.ogg/revision/latest?cb=20220130044108",
    "https://static.wikia.nocookie.net/monkebot/images/6/67/Boner_-1.ogg/revision/latest?cb=20220130044134",
    "https://static.wikia.nocookie.net/monkebot/images/7/78/Boner_0.ogg/revision/latest?cb=20220130044154",
    "https://static.wikia.nocookie.net/monkebot/images/5/5e/Boner_1.ogg/revision/latest?cb=20220130044613",
    "https://static.wikia.nocookie.net/monkebot/images/2/2e/Boner_2.ogg/revision/latest?cb=20220130044649",
    "https://static.wikia.nocookie.net/monkebot/images/8/86/Boner_3.ogg/revision/latest?cb=20220130044713"
];

const COUNTRY_SOUNDS = [
    "https://static.wikia.nocookie.net/monkebot/images/f/fc/Country_alabama.ogg/revision/latest?cb=20220130075013",
    "https://static.wikia.nocookie.net/monkebot/images/1/16/Country_koth.ogg/revision/latest?cb=20220130080603",
    "https://static.wikia.nocookie.net/monkebot/images/7/7b/Country_duel_1.ogg/revision/latest?cb=20220130080921",
    "https://static.wikia.nocookie.net/monkebot/images/a/a6/Country_duel_2.ogg/revision/latest?cb=20220130080942",
    "https://static.wikia.nocookie.net/monkebot/images/8/81/Country_tex-ex.ogg/revision/latest?cb=20220130080816"
];

// Main client functions
client.on('ready', async () => {
    client.user.setActivity('with his boof', { type: 'PLAYING' });
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
        else if (/nia/i.test(msg.content)) {
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
        else if (/^music$/i.test(msg.content)) {
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
                mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/b/b1/Cbt.ogg/revision/latest?cb=20211025041045');
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
            rnd = Math.floor(Math.random() * THINK_SOUNDS.length)
            mYouTube.playYoutubeSound(msg, THINK_SOUNDS[rnd]);
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
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=wDajqW561KMx');
        }
        else if (/brain/i.test(msg.content)) {
            if (Math.random() >= 0.8) {
                mYouTube.playSoundOgg(msg, "https://static.wikia.nocookie.net/monkebot/images/2/22/Brain_crit.mp3/revision/latest?cb=20211105054825")
            }
            else {
                mYouTube.playYoutubeSound(msg, 'https://youtu.be/UKU0AdOMXLA');
            }
        }
        else if (/horsey|chobunso/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/2QYcKByGEY8');
        }
        else if (/scatman/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/Hy8kmNEo1i8');
        }
        else if (/america|🇺🇸|🦅/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/MhQ5678cJU8');
        }
        else if (/burger\s*king|foot\s*lettuce/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/XPnwmZ6gf6I');
        }
        else if (/Emily|X[-\s]files/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/Vpqffgak7To');
        }
        else if (/beginning|beninging/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/fRCOpbp_Wyo');
        }
        else if (/Charles|pull\s*up|capybara/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/v8Q4BSgBkRc');
            msg.channel.send('https://c.tenor.com/g05O_S6b0f4AAAAd/capybara-ok-i-pull-up.gif');
        }
        else if (/oh\s*ok/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/UrdhAzKcfNk');
        }
        else if (/i'?ll\s*kill\s*ya/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/NfrKsyUJqI4');
        }
        else if (/sigma/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/wLz9xU6J88k');
        }
        else if (/mail/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/fzRC37grckk');
        }
        else if (/shut\s*down/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/m1QrNZCjRag');
        }
        else if (/oh\s*my\s*goodness/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/6k5VOvrBCss');
        }
        else if (/do\s*your\s*best/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/jGatO6vMPqw', '9');
        }
        else if (/dosh|loads\s*a\s*money/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/ULeDlxa3gyc');
        }
        else if (/beat\s*that\s*bitch/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/mRowQGqkjRA');
        }
        else if (/horny/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/_jhgncXEbjc');
        }
        else if (/you\s*can'?t\s*milk\s*those/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/RlKVC-MRmjA');
        }
        else if (/milk/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/I9gLFHj5AWk', '4');
        }
        else if (/wombo\s*combo/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/5PMmPRBfdBQ');
        }
        else if (/interior|crocodile|alligator/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/kZwhNFOn4ik');
        }
        else if (/hold\s*it!/i.test(msg.content)) {
            var prob = Math.random()
            if (prob <= 0.5) {
                mYouTube.playYoutubeSound(msg, 'https://youtu.be/66LCfFqIbAA');
            } else if (prob <= 0.85) {
                mYouTube.playYoutubeSound(msg, 'https://youtu.be/d7SYy5JvyOA');
            } else {
                mYouTube.playYoutubeSound(msg, 'https://youtu.be/TIZH3Ur0zcQ');
            }
        }
        else if (/take\s*that!/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://youtu.be/fR4P8o95WPA');
        }
        else if (/OBJECTION!/.test(msg.content)) {
            if (Math.random() >= 0.5) {
                mYouTube.playYoutubeSound(msg, 'https://youtu.be/UxnvGDK0WGM');
            }
            else {
                mYouTube.playYoutubeSound(msg, 'https://youtu.be/lAWdWk6a2gg');
            }
        }
        else if (/that'?s\s*hilarious/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=oj0Nu5yTnTA');
        }
        else if (/bojji/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=wWnak7V8hr0');
        }
        else if (/mortis/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=iHLMnP7bpnk');
        }
        else if (/tequila/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=U_JFLb1IItM');
        }
        else if (/bitconnect/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=772eWds6z0U');
        }
        else if (/bwop/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=EIA1iX7Ooz8');
        }
        else if (/disappoint/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=Ncgv7ruZ6HU');
        }
        else if (/gambino/i.test(msg.content)) {
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=bdYIC-otbvU');
        }


    ///////////////////////////////////
    //                               //
    //      Non-Youtube  Sounds      //
    //                               //
    ///////////////////////////////////


        else if (/(balloon\s*boy|balloonboy|bb)\s*hello/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BB_SOUNDS[1]);
        }
        else if (/(balloon\s*boy|balloonboy|bb)\s*hi/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BB_SOUNDS[0]);
        }
        else if (/(balloon\s*boy|balloonboy|bb)\s*(haha|laugh)/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BB_SOUNDS[2]);
        }
        else if (/balloon\s*boy|balloonboy/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BB_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BB_SOUNDS[rnd]);
        }
        else if (/icpp/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/ed/Vo_nyx_assassin_nyx_attack_16.mp3/revision/latest?cb=20201017155639');
        }
        else if (/^ow+$/i.test(msg.content)) {
            if (Math.random() >= 0.85) {
                mYouTube.playSoundOgg(msg, "https://static.wikia.nocookie.net/monkebot/images/5/59/Owwcrit.ogg/revision/latest?cb=20211022064501")
            }
            else {
                rnd = Math.floor(Math.random() * OWW_SOUNDS.length)
                mYouTube.playSoundOgg(msg, OWW_SOUNDS[rnd]);
            }
        }
        else if (/help/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * HELP_SOUNDS.length)
            mYouTube.playSoundOgg(msg, HELP_SOUNDS[rnd]);
        }
        else if (/pirate|spencer/i.test(msg.content)) {
            if (Math.random() >= 0.85) {
                mYouTube.playSoundOgg(msg, "https://static.wikia.nocookie.net/monkebot/images/a/a6/Pirate_crit.ogg/revision/latest?cb=20211025042611")
            }
            else {
                mYouTube.playSoundOgg(msg, "https://static.wikia.nocookie.net/monkebot/images/3/38/Pirate.ogg/revision/latest?cb=20211025042453")
            }
        }
        else if (/mmm monke/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/9/92/Mm_monke.ogg/revision/latest?cb=20211025043051');
        }
        else if (/^hi$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * HI_SOUNDS.length)
            mYouTube.playSoundOgg(msg, HI_SOUNDS[rnd]);
        }
        else if (/^intermission$/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/b/bf/Intermission.mp3/revision/latest?cb=20211101030603');
        }
        else if (/duke1\s?\.5/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/2/20/Duke4.ogg/revision/latest?cb=20220125075631');
        }
        else if (/duke\s?1/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/e/ea/Duke1.ogg/revision/latest?cb=20211105055208');
        }
        else if (/duke2\s?\.5/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/f/f6/Duke5.ogg/revision/latest?cb=20220125080837');
        }
        else if (/duke2\s?\.6/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/b/b1/Duke2-2.ogg/revision/latest?cb=20220127042036');
        }
        else if (/duke\s?2/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/3/32/Duke2.ogg/revision/latest?cb=20211105055304');
        }
        else if (/duke3\s?\.5/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/c/c4/Duke6.ogg/revision/latest?cb=20220125082049');
        }
        else if (/duke\s?3/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/d/d9/Duke3.ogg/revision/latest?cb=20211105055331');
        }
        else if (/duke\s*riff/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/1/13/Duke_riff.ogg/revision/latest?cb=20211105055356');
        }
        else if (/meeting of the byeahs?/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/9/91/Meeting_of_the_byeah.ogg/revision/latest?cb=20211118095123');
        }
        else if (/^byeah attack$/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/1/1b/Byeah_attack.ogg/revision/latest?cb=20211118095530');
        }
        else if (/^byeah$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BYEAH_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BYEAH_SOUNDS[rnd]);
        }
        else if (/monke.*fart/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/8/87/Fart_reverb.mp3/revision/latest?cb=20211121065340');
        }
        else if (/monke.*suck|monke.*succ/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/b/be/Succ.mp3/revision/latest?cb=20211121064124');
        }
        else if (/monke.*die/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/2/29/Die.mp3/revision/latest?cb=20211121070306');
        }
        else if (/monke.*nut/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/5/55/Worlds_Loudest_Orgasm.mp3/revision/latest?cb=20211121062645');
        }
        else if (/how\s*to\s*spoon/i.test(msg.content)) {
            currentSpoonDate = new Date();
            if ((Math.abs(currentSpoonDate - lastSpoonDate) / 1000) > 60) {
                spoonPointer = 0;
            }
            lastSpoonDate = currentSpoonDate;
            mYouTube.playSoundOgg(msg, HOW_TO_SPOON_SOUNDS[spoonPointer]);
            spoonPointer = (spoonPointer+1) % HOW_TO_SPOON_SOUNDS.length;
        }
        else if (/^what\??$/i.test(msg.content)) {
            currentSpoonDate = new Date();
            if (spoonPointer > 0 && (Math.abs(currentSpoonDate - lastSpoonDate) / 1000) <= 60) {
                lastSpoonDate = currentSpoonDate;
                mYouTube.playSoundOgg(msg, HOW_TO_SPOON_SOUNDS[spoonPointer]);
                spoonPointer = (spoonPointer+1) % HOW_TO_SPOON_SOUNDS.length;
            }
        }
        else if (/^cyberpunk$|cyberriff|cyber.*riff/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/5/5e/Cyber_riff.ogg/revision/latest?cb=20211227060931');
        }
        else if (/sea\s*shanty/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/8/8f/BiggieShanty.ogg/revision/latest?cb=20220116211258');
        }
        else if (/^e$/i.test(msg.content)) {
            if (Math.random() >= 0.95) {
                mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/1/17/E_crit.ogg/revision/latest?cb=20220129220753');
            } else {
                mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/6/61/E-long.ogg/revision/latest?cb=20220129220626');
            }
        }
        else if (/^boss\s*music$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BOSS_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BOSS_SOUNDS[rnd]);
        }
        else if (/^boss\s*vordt/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BOSS_SOUNDS[0]);
        }
        else if (/^boss\s*sephiroth/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BOSS_SOUNDS[1]);
        }
        else if (/^boss\s*grimm/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BOSS_SOUNDS[2]);
        }
        else if (/very\s*cool/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/b/b8/Very_cool.ogg/revision/latest?cb=20220130043257');
        }
        else if (/^boner\s*-3/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[0]);
        }
        else if (/^boner\s*-2/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[1]);
        }
        else if (/^boner\s*-1/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[2]);
        }
        else if (/^boner\s*0/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[3]);
        }
        else if (/^boner\s*1/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[4]);
        }
        else if (/^boner\s*2/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[5]);
        }
        else if (/^boner\s*3/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[6]);
        }
        else if (/^boner$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * BONER_SOUNDS.length)
            mYouTube.playSoundOgg(msg, BONER_SOUNDS[rnd]);
        }
        else if (/^country$/i.test(msg.content)) {
            rnd = Math.floor(Math.random() * COUNTRY_SOUNDS.length)
            mYouTube.playSoundOgg(msg, COUNTRY_SOUNDS[rnd]);
        }
        else if (/dundun|dun\s*dun|law\s*and\s*order/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/b/bd/Dun_dun.ogg/revision/latest?cb=20220130113335');
        }
        else if (/^(shart|shart.mp3)/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/3/3e/Shart.ogg/revision/latest?cb=20220130113702');
        }
        else if (/fitness\s*gram\s*pacer\s*test/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/9/97/At_night_i_think_of.mp3/revision/latest?cb=20220131041310');
        }
        else if (/YYYY/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/f/fc/YYYY.mp3/revision/latest?cb=20220131041636');
        }
        else if (/monkey?\s*story/i.test(msg.content)) {
            mYouTube.playSoundOgg(msg, 'https://static.wikia.nocookie.net/monkebot/images/8/8f/The_Story_Of_Three_Socks_And_The_Gold_Bears.mp3/revision/latest?cb=20220131041746');
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
            mYouTube.playYoutubeSound(msg, 'https://www.youtube.com/watch?v=renyltL2Dnc');
            // https://stackoverflow.com/questions/23766259/restart-node-js-server-programmatically
        }
        else if (msg.mentions.has(client.user) && !msg.mentions.everyone) { // If message is pinging Monke Bot (but not pinging everyone)
            msg.channel.send(PINGED_GIFS[Math.floor(Math.random() * PINGED_GIFS.length)]);
        }

    }
});

client.on('messageDelete', msg => {
    if (Math.random() >= 0.91) {
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
