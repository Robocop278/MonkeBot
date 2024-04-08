import { ActivityType, MediaChannel, Message, StageChannel, VoiceChannel, messageLink } from 'discord.js';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import * as monkeVoice from './monke-voice';
import * as monkeCommands from './bot-commands';
import { ActionableCommand, MediaCommand, GroupCommand, SequenceCommand, ReplyCommand, ReactCommand } from './bot-commands';
require('json5/lib/register');
// eslint-disable-next-line node/no-unpublished-require
const configs = require('../config.json5');

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
      processCommand(result.command, message)
    }
  }
});

function processCommand(command: ActionableCommand, message: Message) {
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
      // If exectuteAll is set to true, execute all commands
      if (monkeyCommand.executeAll) {
        monkeyCommand.content.forEach(element => {
          processCommand(element, message);
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
  else if ((<ReplyCommand>command).text_content !== undefined) {
    console.log("Fetched as ReplyCommand");
    let replyCommand = command as ReplyCommand;
    currentMessage.reply(replyCommand.text_content);
  }
  else if ((<MediaCommand>command).media_url !== undefined) {
    console.log("Fetched as MediaCommand");
    let mediaCommand = command as MediaCommand;
    let voiceChannel = message.member?.voice.channel
    if (voiceChannel && voiceChannel instanceof VoiceChannel) {
      monkeVoice.connect(voiceChannel);
      monkeVoice.testAudio(mediaCommand.media_url);
    }
  }
  else if ((<ReactCommand>command).reaction !== undefined) {
    console.log("Fetched as ReactCommand");
    let reactionCommand = command as ReactCommand;
    message.react(reactionCommand.reaction);
  }

}

client.login(configs.PRIVATE_KEY);

export = {};
