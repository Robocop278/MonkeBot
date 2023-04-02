import {ActivityType, StageChannel, VoiceChannel} from 'discord.js';
import {Client, Events, GatewayIntentBits, Partials} from 'discord.js';
import * as monkeVoice from './monke-voice';
require('json5/lib/register');
// eslint-disable-next-line node/no-unpublished-require
const configs = require('../config.json5');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.once(Events.ClientReady, (c: Client<boolean>) => {
  client.user?.setActivity('with type safety!', {type: ActivityType.Playing});
  client.user?.setAvatar('avatar_images/monkeBot_hardHat.png');
  client.guilds.cache
    .get(configs.CHANNEL_MAIN)
    ?.members.cache.get('690351869650010333')
    ?.setNickname('🚧 Monke 2.0 🚧');
  console.log(`Ready! Logged in as ${c.user?.tag}`);
});

client.on(Events.MessageCreate, message => {
  // We want to ignore all messages that come from monke itself
  if (message.author.id === '690351869650010333') return;

  if (
    message.member?.voice.channel !== null &&
    message.member?.voice.channel !== undefined &&
    !(message.member?.voice.channel instanceof StageChannel)
  )
    monkeVoice.connect(message.member?.voice.channel as VoiceChannel);

  console.log(`Message from ${message.author.username}: ${message.content}`);
});

client.login(configs.PRIVATE_KEY);
