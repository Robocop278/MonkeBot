import { ActivityType, Message, VoiceChannel, TextChannel, User, GuildMember, Guild } from 'discord.js';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import * as monkeVoice from './monke-voice';
import * as monkeCommands from './bot-commands';
import { ActionableCommand, MediaCommand, GroupCommand, AdminCommand, SequenceCommand, TimedSequenceCommand, TextMessageCommand, ReactCommand, S3FolderCommand, CleanUpCommand } from './bot-commands';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';

require('json5/lib/register');
// eslint-disable-next-line node/no-unpublished-require
const configs = require('../config.json5');

const child_process = require('node:child_process');
const exec = child_process.exec;
const execSync = child_process.execSync;

const s3Client = new S3({
  accessKeyId: configs.aws_access_key_id,
  secretAccessKey: configs.aws_secret_access_key,
  region: configs.aws_region
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

const commandSequenceIndices: { [key: string]: number } = {};
let timedSequenceUuid: string;

client.once(Events.ClientReady, (c: Client<boolean>) => {
  client.user?.setActivity('with type safety!', { type: ActivityType.Playing });
  // client.user?.setAvatar('avatar_images/skylarMonke.png');
  client.guilds.cache
    .get(configs.CHANNEL_MAIN)
    ?.members.cache.get('690351869650010333')
    ?.setNickname('Monke 2.0');
  console.log(`Ready! Logged in as ${c.user?.tag}`);

  let inittime = new Date();
  let OS = process.platform;
  let initinfo = execSync(`git log -1 --pretty="format:The author of %h was %an, %ar;;The title was >>%s<<%n"`, { encoding: 'utf8' });
  console.log(`------------------\n  INITIALIZATION\n------------------\nTIME:\t${inittime.toLocaleTimeString('it-IT')} \nOFFSET:\t${inittime.getTimezoneOffset()} \nOS:\t${OS}\n------------------\n`);
  console.log(`${initinfo.replace(';;', '\n')}------------------\n`);

  client.channels.fetch('974290034133987429')
    .then(channel => {
      (channel as TextChannel).send(`------------------------------\nmonke started at ${inittime}, it ${inittime.getTimezoneOffset() == 0 ? 'is being hosted via AWS.' : `***is being hosted locally***, probably by ${inittime.getTimezoneOffset() >= 420 ? 'socal nerds christian or lisbin.' : 'the Ohio:tm: lad kebo.'}`}\n\n${initinfo.replace(';;', '\n')}------------------------------\n`);
    });
});

let currentMessage: Message;
client.on(Events.MessageCreate, message => {
  // We want to ignore all messages that come from monke itself
  if (message.author.id === '690351869650010333') return;

  // if coming from Minecraft chat integration bot ...
  if (message.applicationId === '1231040317105373295') {
    let bottag = message.author.username;
    const minecraft = [
      { key: 'theemadbro', value: '102131584240480256' },
      { key: 'awbeans18', value: '464864751206531082' },
      { key: 'CrackBone17', value: '107376008528711680' },
      { key: 'Robocop278', value: '102265685224194048' },
      { key: 'Bramblestaff', value: '300122791959855106' },
      { key: 'HyperMate', value: '227115221838331905' },
      { key: 'KingOfCactus', value: '144327546832551937' }
    ]
    let returnuser = minecraft.find(key => key.key === bottag)?.value
    if (returnuser) {
      let voiceuserlist = message.guild?.voiceStates.cache;
      let founduser = voiceuserlist?.get(returnuser);

      let updateMes: Message = Object.assign({} as Message, message as Message, { member: founduser?.member as GuildMember }) as Message;

      // const updateMemb: { member: GuildMember } = { member: founduser?.member as GuildMember }

      // const updateMes: Message = { ...message, ...updateMemb } as Message
      message = updateMes as Message;
      // message = { message: message, sent_messages: [] } as MessageContext;
      console.log(typeof (message));
      console.log("updatedMes: \n" + updateMes);
      // message.member = founduser?.member;
      // Object.assign(message, { ...message, member: founduser?.member })

      console.log(founduser);
    }
  }

  console.log(`Message from ${message.author.username}: ${message.content}`);
  currentMessage = message;

  const result = monkeCommands.test.find(
    (command: monkeCommands.RootCommand) => {
      if (
        typeof command.look_up === 'string' &&
        message.content.includes(command.look_up)
      ) {
        return command;
      } else if (
        command.look_up instanceof RegExp &&
        command.look_up.test(message.content)
      ) {
        return command;
      } else {
        return undefined;
      }
    }
  );

  if (result !== undefined) {
    if (
      message.member?.voice.channel !== null &&
      message.member?.voice.channel !== undefined &&
      message.member?.voice.channel instanceof VoiceChannel
    ) {
      console.log("Found match for lookUp: " + result.look_up);
      timedSequenceUuid = "";
      void processCommand(result.command, message)
    }
  }
});

interface MessageContext {
  message: Message;
  sent_messages: Message[]
}
async function processCommand(command: ActionableCommand, message: Message | MessageContext) {
  console.log("processCommand: " + command);

  // First check our message. If it's just a message, set up a new message context to work with
  if (message instanceof Message) {
    message = { message: message, sent_messages: [] };
  }

  // Check if a weight < 1 has been defined. If so, we need to roll to hit this event
  if (command.weight && command.weight < 1) {
    let rand = Math.random();
    console.log("Rolling for execution, weight: " + command.weight + ", rolled: " + rand);
    if (rand >= command.weight) {
      console.log("Execution failed, bad roll");
      return;
    }
    console.log("Execution success, continuing");
  }

  if ((<GroupCommand>command).content !== undefined) {
    console.log("Fetched as GroupCommand");
    let groupCommand = command as GroupCommand;

    if (groupCommand.content.length === 1) {
      processCommand(groupCommand.content[0], message);
    } else {
      // If executeAll is set to true, execute all commands
      if (groupCommand.execute_all) {
        for (let index = 0; index < groupCommand.content.length; index++) {
          await processCommand(groupCommand.content[index], message);
        }
        return;
      }

      // Get all of our content. If no weight is explicitly declared, assume a weight of 1
      // Get sum of all weights into weightsTotal
      // Then generate a random number between 0 weightsTotal to determine which media to use
      let weightsTotal = 0;

      console.log("Parsing through available media:")
      groupCommand.content.forEach(content => {
        console.log("  Content weight: " + (content.weight ?? 1));
        weightsTotal += (content.weight ?? 1);
      });
      console.log("Weight Sum for all content: " + weightsTotal);

      let randIndex = Math.random() * weightsTotal;
      console.log("Generated randIndex: " + randIndex);
      let weightIndex = 0;
      for (let content of groupCommand.content) {
        weightIndex += (content.weight ?? 1);
        console.log("  Current weightIndex: " + weightIndex);
        if (randIndex < weightIndex) {
          console.log("  Selecting content");
          processCommand(content, message)
          break;
        }
      };
    }
    console.log("Finished GroupCommand");
  }
  else if ((<AdminCommand>command).shcmd !== undefined) {
    console.log("Fetched as AdminCommand");
    let adminshcmd = command as AdminCommand;
    if (message.message.member?.roles.cache.has('899529644880056341')) {
      console.log(adminshcmd.shcmd)
      switch (adminshcmd.shcmd) {
        case 'update': {
          console.log(' pulling latest from git')
          await message.message.reply("https://tenor.com/view/chef-armando-strainer-chef-cooking-gif-7301575759299383064");
          exec('sh shcmd/update.sh');
          break;
        }
        case 'restart': {
          console.log(' restarting')
          await message.message.reply("https://tenor.com/view/bmo-adventure-time-recharge-batteries-power-gif-5006828");
          exec('sh shcmd/restart.sh');
          break;
        }
        case 'shutdown': {
          console.log(` fucking off, I don't need this shit`)
          await message.message.reply("https://tenor.com/view/walks-away-sad-leave-tom-and-jerry-gif-16877258");
          exec('sh shcmd/shutdown.sh');
          break;
        }
      }
    } else {
      processCommand({
        content: [
          { reply: true, text_content: 'https://64.media.tumblr.com/fcb630b33a66e2d0a45e76baa59f1e2b/tumblr_o35vmuaRom1s2w9y9o4_500.gif' },
          { reply: true, text_content: 'https://www.reactiongifs.com/r/trlrky.gif' },
          { reply: true, text_content: 'https://i.kym-cdn.com/photos/images/original/001/885/235/969.gif' },
          { reply: true, text_content: 'https://giphy.com/gifs/ForbesTheCulture-fortheculture-forbestheculture-forbes-the-culture-0FPXJfQjetvyOFcOgo' }
        ]
      }, message);
    }
    console.log("Finished AdminCommand");
  }
  else if ((<SequenceCommand>command).sequence) {
    console.log("Fetched as SequenceCommand");
    const sequenceCommand = command as SequenceCommand;

    let sequenceIdx = commandSequenceIndices[sequenceCommand.sequence_id];
    if (Number.isNaN(sequenceIdx) || sequenceIdx == undefined) {
      sequenceIdx = -1;
    }
    sequenceIdx = (sequenceIdx + 1) % sequenceCommand.sequence.length;
    commandSequenceIndices[sequenceCommand.sequence_id] = sequenceIdx;

    processCommand(sequenceCommand.sequence[sequenceIdx], message);
    console.log("Finished SequenceCommand");
  }
  else if ((<TimedSequenceCommand>command).timed_sequence !== undefined) {
    console.log("Fetched as TimedSequenceCommand");
    let timedSequenceCommand = command as TimedSequenceCommand;

    const selfUuid: string = (timedSequenceUuid = uuidv4());

    for (let i = 0; i < timedSequenceCommand.timed_sequence.length; i++) {
      if (selfUuid != timedSequenceUuid) {
        // Special case, if there is a cleanup command remaining in the rest of our timed sequence, execute it
        for (let index = i; index < timedSequenceCommand.timed_sequence.length; index++) {
          const element = timedSequenceCommand.timed_sequence[index];
          if ((<CleanUpCommand>(element.command)).clean_up !== undefined) {
            processCommand(element.command, message);
            break;
          }
        }
        break;
      }

      const sequenceEvent = timedSequenceCommand.timed_sequence[i];

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
          if (selfUuid === timedSequenceUuid) {
            processCommand(sequenceEvent.command, message);
          }
        }, sequenceEvent.timeout_ms);
      });
    }
    console.log("Finished TimedSequenceCommand");
  }
  else if ((<TextMessageCommand>command).text_content !== undefined) {
    console.log("Fetched as TextMessageCommand");
    let textMessageCommand = command as TextMessageCommand;
    if (textMessageCommand.reply) {
      message.sent_messages.push(await currentMessage.reply(textMessageCommand.text_content));
    } else {
      message.sent_messages.push(await message.message.channel.send(textMessageCommand.text_content));
    }
    console.log("Finished TextMessageCommand");
  }
  else if ((<MediaCommand>command).media_url !== undefined) {
    console.log("Fetched as MediaCommand");
    let mediaCommand = command as MediaCommand;
    let voiceChannel;
    if (!('sent_messages' in message)) {
      voiceChannel = message['member']['voice']['channel']
    }
    else {
      voiceChannel = message.message.member?.voice.channel
    }
    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      monkeVoice.connect(voiceChannel);
      await monkeVoice.testAudio(mediaCommand.media_url);
    }
    console.log("Finished MediaCommand");
  }
  else if ((<ReactCommand>command).reaction !== undefined) {
    console.log("Fetched as ReactCommand");
    let reactionCommand = command as ReactCommand;
    message.message.react(reactionCommand.reaction);
    console.log("Finished ReactCommand");
  }
  else if ((<S3FolderCommand>command).bucket_folder !== undefined) {
    console.log("Fetched as S3FolderCommand");
    let s3FolderCommand = command as S3FolderCommand;

    const data = await s3Client.listObjectsV2({ Bucket: configs.aws_bucket_name, Prefix: `${s3FolderCommand.bucket_folder}/`, StartAfter: `${s3FolderCommand.bucket_folder}/` }).promise();
    if (data.Contents) {
      const dataContents = data.Contents.filter(entry => (entry.Size ?? 0) > 0);
      console.log(`Reading S3 bucket contents for "${s3FolderCommand.bucket_folder}":\n${JSON.stringify(dataContents.map((entry) => entry.Key))}`);
      const selectedMedia = dataContents[Math.floor(Math.random() * dataContents.length)].Key;
      console.log("Selected S3 media: " + selectedMedia);
      if (selectedMedia) {
        if (s3FolderCommand.type === 'text') {
          processCommand({ text_content: `https://monke.s3.amazonaws.com/${selectedMedia}` }, message);
        } else {
          processCommand({ media_url: `https://monke.s3.amazonaws.com/${selectedMedia}` }, message);
        }
      }
    }
    console.log("Finished S3FolderCommand");
  }
  else if ((<CleanUpCommand>command).clean_up !== undefined) {
    console.log("Fetched as CleanUpCommand");
    let cleanUpCommand = command as CleanUpCommand;

    if (cleanUpCommand.clean_up) {
      (message.message.channel as TextChannel).bulkDelete(message.sent_messages);
    }
    console.log("Finished CleanUpCommand");
  }
}

client.login(configs.PRIVATE_KEY);

export = {};
