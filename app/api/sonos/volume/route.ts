import { SonosDevice } from '@svrooij/sonos';
import { NextRequest } from 'next/server';

type NotificationOptions = {
  direction: string;
  step: number;
  ip: string;
};

export async function POST(req: NextRequest) {
    const data: NotificationOptions = await req.json();

    const device = new SonosDevice(data.ip);
    const currentVolume = device.Volume || 0;
    const newVolume = data.direction === "up" ? currentVolume + data.step : currentVolume - data.step;

    device.SetVolume(newVolume);

  return Response.json({ message: 'Notification sent' });
}
