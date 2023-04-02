import {joinVoiceChannel} from '@discordjs/voice';
import {VoiceChannel} from 'discord.js';

export function connect(channel: VoiceChannel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
}
