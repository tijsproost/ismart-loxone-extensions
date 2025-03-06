import { SonosDeviceDiscovery } from '@svrooij/sonos';

export async function GET() {
    const discovery = new SonosDeviceDiscovery();

    const devices = await discovery.Search();


  return Response.json({ message: devices});
}
