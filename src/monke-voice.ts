import {
  AudioPlayer,
  DiscordGatewayAdapterCreator,
  PlayerSubscription,
  StreamType,
  VoiceConnection,
  VoiceConnectionStatus,
  createAudioResource,
  getVoiceConnections,
  joinVoiceChannel,
} from '@discordjs/voice';
import { VoiceChannel } from 'discord.js';
import { createReadStream } from 'fs';

export function connect(channel: VoiceChannel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
  });
}

export async function testAudio(pathToFile: string): Promise<void> {
  return new Promise(async (resolve) => {
    console.log("testAudio");
    const player = new AudioPlayer();

    const resource = createAudioResource(pathToFile);

    const connections = getVoiceConnections();
    console.log(connections.size);
    let subscribers: PlayerSubscription[] = [];
    connections.forEach(connection => {
      const subscription = connection.subscribe(player);
      if (subscription instanceof PlayerSubscription) {
        subscribers.push(subscription);
      }
    });

    await connectionReady(connections);

    player.play(resource);

    player.on('stateChange', (oldState, newState) => {
      if (newState.status === 'idle') {
        console.log("unsubscribing in testAudio")
        subscribers.forEach(subscriber => {
          subscriber.unsubscribe();
        });
        subscribers = [];
        resolve();
      }
    })
  })
}

function connectionReady(connections: Map<String, VoiceConnection>) {
  const promises: Promise<void>[] = [];
  connections.forEach(connection => {
    const connectionPromise = new Promise<void>(resolve => {
      if (connection.state.status === VoiceConnectionStatus.Ready) resolve();
      else connection.on(VoiceConnectionStatus.Ready, () => resolve());
    });
    promises.push(connectionPromise);
  });

  return Promise.all(promises);
}
