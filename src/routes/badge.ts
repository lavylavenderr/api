import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import axios from 'axios';

export const badge: FastifyPluginAsyncJsonSchemaToTs = async function (
  app,
  _options
) {
  app.get<{}>('/spotify', async (req, res) => {
    const lanyard = (
      await axios.get('https://api.lanyard.rest/v1/users/988801425196867644')
    ).data;

    if (!lanyard.data.listening_to_spotify)
      return res.code(200).header('Content-Type', 'application/json').send({
        schemaVersion: 1,
        namedLogo: 'spotify',
        logoColor: 'white',
        color: '1db954',
        label: 'listening to',
        message: 'nothin :3'
      });

    const { song, artist } = lanyard.data.spotify;

    return res
      .code(200)
      .header('Content-Type', 'application/json')
      .send({
        schemaVersion: 1,
        namedLogo: 'spotify',
        logoColor: 'white',
        color: '1db954',
        label: 'listening to',
        message: song + ' by ' + artist
      });
  });

  app.get<{}>('/status', async (req, res) => {
    const lanyard = (
      await axios.get('https://api.lanyard.rest/v1/users/988801425196867644')
    ).data;

    let color: string;

    switch (lanyard.data.discord_status) {
      case 'online':
        color = 'green';
        break;
      case 'idle':
        color = 'yellow';
        break;
      case 'dnd':
        color = 'red';
        break;
      default:
        color = 'lightgrey';
        break;
    }

    return res.code(200).header('Content-Type', 'application/json').send({
      schemaVersion: 1,
      color,
      label: 'currently',
      message: lanyard.data.discord_status
    });
  });

  app.get<{}>('/playing', async (req, res) => {
    const lanyard = (
      await axios.get('https://api.lanyard.rest/v1/users/988801425196867644')
    ).data;
    const activityArray = lanyard.data.activites as [];
    const filteredActivity = activityArray.find((activity: any) => {
      activity.type == 0 && activity.id !== '782685898163617802';
    }) as any;
    let activityName: string;

    if (filteredActivity) activityName = filteredActivity.name;
    else activityName = 'nothing :3';

    return res.code(200).header('Content-Type', 'application/json').send({
      schemaVersion: 1,
      color: '5865F2',
      label: 'playing',
      message: activityName
    });
  });
};
