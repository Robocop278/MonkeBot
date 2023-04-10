import {ActivityType, StageChannel, VoiceChannel} from 'discord.js';
import {Client, Events, GatewayIntentBits, Partials} from 'discord.js';
import * as monkeVoice from './monke-voice';
import * as monkeCommands from './bot-commands';
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

client.once(Events.ClientReady, (c: Client<boolean>) => {
  client.user?.setActivity('with type safety!', {type: ActivityType.Playing});
  // client.user?.setAvatar('avatar_images/monkeBot_hardHat.png');
  client.guilds.cache
    .get(configs.CHANNEL_MAIN)
    ?.members.cache.get('690351869650010333')
    ?.setNickname('🚧 Monke 2.0 🚧');
  console.log(`Ready! Logged in as ${c.user?.tag}`);
});

client.on(Events.MessageCreate, message => {
  // We want to ignore all messages that come from monke itself
  if (message.author.id === '690351869650010333') return;

  const result = monkeCommands.test.find(
    (command: monkeCommands.MonkeCommand) => {
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
      message.member?.id === configs.LISBIN &&
      message.member?.voice.channel !== null &&
      message.member?.voice.channel !== undefined &&
      message.member?.voice.channel instanceof VoiceChannel &&
      result.media !== undefined
    ) {
      monkeVoice.connect(message.member?.voice.channel);
      // if (result.crits !== undefined) {
      //   const rand = Math.random();
      //   result.crits.forEach(element => {
      //     switch (element.comparatorType) {
      //       case monkeCommands.Comparator.GreaterThanOrEqualTo:
      //         return rand >= element.percentChance;
      //       case monkeCommands.Comparator.GreaterThan:
      //         return rand > element.percentChance;
      //       case monkeCommands.Comparator.LessThanOrEqualTo:
      //         return rand <= element.percentChance;
      //       case monkeCommands.Comparator.LessThan:
      //         return rand < element.percentChance;
      //       default:
      //         return result?.media;
      //     }
      //   });
      // }
      monkeVoice.testAudio(result.media);
    }
  }

  console.log(`Message from ${message.author.username}: ${message.content}`);
});

client.login(configs.PRIVATE_KEY);

export = {};
