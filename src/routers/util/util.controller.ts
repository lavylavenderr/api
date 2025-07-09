import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Response } from 'src/interfaces/response.interface';
import { env } from 'src/lib/env';
import * as jwa from 'jwa';

@Controller('util')
export class UtilityController {
  constructor() {}

  @Get('time')
  async time(): Promise<Response> {
    const dateString = format(
      toZonedTime(new Date(), 'America/Los_Angeles'),
      'MM/dd/yyyy',
    );
    const timeString = format(
      toZonedTime(new Date(), 'America/Los_Angeles'),
      'HH:mm',
    );
    const ISOTimeString = toZonedTime(new Date(), 'America/Los_Angeles');

    return {
      statusCode: 200,
      message: {
        date: dateString,
        time: timeString,
        isoString: ISOTimeString,
      },
    };
  }

  @Get('snapshot')
  async snapshot(
    @Query('center') center: string,
    @Query('zoom') zoom: string | undefined,
    @Query('scale') scale: string | undefined,
    @Query('type') type: string,
    @Res() response,
  ): Promise<any> {
    try {
      // construct the query params
      const params = new URLSearchParams();

      params.append('center', center);
      params.append('t', type);
      params.append('teamId', env.APPLE_TEAMID);
      params.append('keyId', env.APPLEMAPS_KEYID);
      params.append('poi', '0');
      params.append('colorScheme', 'dark');

      if (zoom !== undefined) {
        params.append('z', zoom);
      }

      if (scale !== undefined) {
        params.append('scale', scale);
      }

      // sign the url
      const completePath = `/api/v1/snapshot?${params.toString()}`;
      const es256 = jwa('ES256');
      const signature = es256.sign(
        completePath,
        env.APPLEMAPS_KEY.replace(/\\n/g, '\n'),
      );

      // fetch and return the map image
      const photo = await fetch(
        `https://snapshot.apple-mapkit.com${completePath}&signature=${signature}`,
      );

      if (!photo.ok) throw Error();

      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      response.set('Content-Type', 'image/png');
      return response.send(buffer);
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: error.message || 'Invalid Response from Apple API',
      };
    }
  }
}
