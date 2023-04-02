import {Client, Events, GatewayIntentBits, Partials} from 'discord.js';
require('json5/lib/register');
// eslint-disable-next-line node/no-unpublished-require
const constantants = require('../config.json5');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.once(Events.ClientReady, (c: Client<boolean>) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
});

client.on(Events.MessageCreate, message => {
  console.log(message.content);
});

client.login(constantants.PRIVATE_KEY);

console.log('TEST');
