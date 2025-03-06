import { SonosManager } from '@svrooij/sonos';
import { NextRequest } from 'next/server';

type NotificationOptions = {
  trackUri?: string;
  onlyWhenPlaying?: boolean;
  timeout?: number;
  volume?: number;
  delayMs?: number;
  ip: string;
};


export async function POST(req: NextRequest) {
    const data: NotificationOptions = await req.json();
    const manager = new SonosManager();
    const { trackUri, onlyWhenPlaying, timeout, volume, delayMs } = data;
    manager.InitializeFromDevice(data.ip)
    .then(console.log)
    .then(() => {
      return manager.PlayNotification({
        trackUri:
        trackUri ||
        'https://cdn.smartersoft-group.com/various/pull-bell-short.mp3', // Can be any uri sonos understands
      // trackUri: 'https://cdn.smartersoft-group.com/various/someone-at-the-door.mp3', // Cached text-to-speech file.
      onlyWhenPlaying: onlyWhenPlaying || false, // make sure that it only plays when you're listening to music. So it won't play when you're sleeping.
      timeout: timeout || 2, // If the events don't work (to see when it stops playing) or if you turned on a stream, it will revert back after this amount of seconds.
      volume: volume || 70, // Set the volume for the notification (and revert back afterwards)
      delayMs: delayMs || 700, // Pause between commands in ms, (when sonos fails to play sort notification sounds).
      })
    })
    .catch(console.error)
  return Response.json({ message: 'Notification sent' });
}
