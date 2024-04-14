import { ActivityType, Message, VoiceChannel } from 'discord.js';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import * as monkeVoice from './monke-voice';
import * as monkeCommands from './bot-commands';
import { ActionableCommand, MediaCommand, GroupCommand, AdminCommand, SequenceCommand, TimedSequenceCommand, TextMessageCommand, ReactCommand, S3FolderCommand } from './bot-commands';
import S3 from 'aws-sdk/clients/s3';

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

client.once(Events.ClientReady, (c: Client<boolean>) => {
  client.user?.setActivity('with type safety!', { type: ActivityType.Playing });
  // client.user?.setAvatar('avatar_images/monkeBot_hardHat.png');
  client.guilds.cache
    .get(configs.CHANNEL_MAIN)
    ?.members.cache.get('690351869650010333')
    ?.setNickname('🚧 Monke 2.0 🚧');
  console.log(`Ready! Logged in as ${c.user?.tag}`);
});

let timeoutId: NodeJS.Timeout;
let currentMessage: Message;
client.on(Events.MessageCreate, message => {
  // We want to ignore all messages that come from monke itself
  if (message.author.id === '690351869650010333') return;

  console.log(`Message from ${message.author.username}: ${message.content}`);
  currentMessage = message;

  const result = monkeCommands.test.find(
    (command: monkeCommands.RootCommand) => {
      if (
        typeof command.lookUp === 'string' &&
        message.content.includes(command.lookUp)
      ) {
        return command;
      } else if (
        command.lookUp instanceof RegExp &&
        command.lookUp.test(message.content)
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
      console.log("Found match for lookUp: " + result.lookUp);
      clearTimeout(timeoutId);
      void processCommand(result.command, message)
    }
  }
});

async function processCommand(command: ActionableCommand, message: Message) {
  console.log("processCommand: " + command);

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
    let monkeyCommand = command as GroupCommand;

    if (monkeyCommand.content.length === 1) {
      processCommand(monkeyCommand.content[0], message);
    } else {
      // If executeAll is set to true, execute all commands
      if (monkeyCommand.executeAll) {
        monkeyCommand.content.forEach(async element => {
          await processCommand(element, message);
        });
        return;
      }

      // Get all of our content. If no weight is explicitly declared, assume a weight of 1
      // Get sum of all weights into weightsTotal
      // Then generate a random number between 0 weightsTotal to determine which media to use
      let weightsTotal = 0;

      console.log("Parsing through available media:")
      monkeyCommand.content.forEach(content => {
        console.log("  Content weight: " + (content.weight ?? 1));
        weightsTotal += (content.weight ?? 1);
      });
      console.log("Weight Sum for all content: " + weightsTotal);

      let randIndex = Math.random() * weightsTotal;
      console.log("Generated randIndex: " + randIndex);
      let weightIndex = 0;
      for (let content of monkeyCommand.content) {
        weightIndex += (content.weight ?? 1);
        console.log("  Current weightIndex: " + weightIndex);
        if (randIndex < weightIndex) {
          console.log("  Selecting content");
          processCommand(content, message)
          break;
        }
      };
    }
  }
  else if ((<AdminCommand>command).shcmd !== undefined) {
    console.log("AdminCommand awawaw");
    let adminshcmd = command as AdminCommand;
    if (message.member != null && message.member.roles.cache.has('899529644880056341')) {
      console.log(adminshcmd.shcmd)
      switch (adminshcmd.shcmd) {
        case 'update': {
          console.log(' pulling latest from git')
          await message.reply("https://tenor.com/view/chef-armando-strainer-chef-cooking-gif-7301575759299383064");
          exec('sh shcmd/update.sh');
          break;
        }
        case 'restart': {
          console.log(' restarting')
          await message.reply("https://tenor.com/view/bmo-adventure-time-recharge-batteries-power-gif-5006828");
          exec('sh shcmd/update.sh');
          break;
        }
        case 'shutdown': {
          console.log(` fucking off, I don't need this shit`)
          await message.reply("https://tenor.com/view/walks-away-sad-leave-tom-and-jerry-gif-16877258");
          exec('sh shcmd/shutdown.sh');
          break;
        }
      }
    } else {
      processCommand({
        content: [
          { reply: true, media_url: 'https://64.media.tumblr.com/fcb630b33a66e2d0a45e76baa59f1e2b/tumblr_o35vmuaRom1s2w9y9o4_500.gif' },
          { reply: true, media_url: 'https://www.reactiongifs.com/r/trlrky.gif' },
          { reply: true, media_url: 'https://www.bigfooty.com/forum/media/dr-evil-how-about-no-gif.115792/full' },
          { reply: true, media_url: 'https://giphy.com/gifs/ForbesTheCulture-fortheculture-forbestheculture-forbes-the-culture-0FPXJfQjetvyOFcOgo' }
        ]
      }, message);
    }
  }
  else if ((<SequenceCommand>command).sequence) {
    console.log("Fetched as SequenceCommand");
    const sequenceCommand = command as SequenceCommand;

    let sequenceIdx = commandSequenceIndices[sequenceCommand.sequenceId];
    if (Number.isNaN(sequenceIdx) || sequenceIdx == undefined) {
      sequenceIdx = -1;
    }
    sequenceIdx = (sequenceIdx + 1) % sequenceCommand.sequence.length;
    commandSequenceIndices[sequenceCommand.sequenceId] = sequenceIdx;

    processCommand(sequenceCommand.sequence[sequenceIdx], message);
  }
  else if ((<TimedSequenceCommand>command).timedSequence !== undefined) {
    console.log("Fetched as TimedSequenceCommand");
    let timedSequenceCommand = command as TimedSequenceCommand;

    for (let i = 0; i < timedSequenceCommand.timedSequence.length; i++) {
      const sequenceEvent = timedSequenceCommand.timedSequence[i];
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => {
          processCommand(sequenceEvent.command, message);
          resolve();
        }, sequenceEvent.timeoutMillisecs);
      });
    }
  }
  else if ((<TextMessageCommand>command).text_content !== undefined) {
    console.log("Fetched as TextMessageCommand");
    let textMessageCommand = command as TextMessageCommand;
    if (textMessageCommand.reply) {
      currentMessage.reply(textMessageCommand.text_content);
    } else {
      message.channel.send(textMessageCommand.text_content);
    }
  }
  else if ((<MediaCommand>command).media_url !== undefined) {
    console.log("Fetched as MediaCommand");
    let mediaCommand = command as MediaCommand;
    let voiceChannel = message.member?.voice.channel
    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      monkeVoice.connect(voiceChannel);
      await monkeVoice.testAudio(mediaCommand.media_url);
    }
  }
  else if ((<ReactCommand>command).reaction !== undefined) {
    console.log("Fetched as ReactCommand");
    let reactionCommand = command as ReactCommand;
    message.react(reactionCommand.reaction);
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
        processCommand({ media_url: `https://monke.s3.amazonaws.com/${selectedMedia}` }, message);
      }
    }
  }

}

client.login(configs.PRIVATE_KEY);

export = {};
