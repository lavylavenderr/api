import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'a0f873411e774fe5af38a22b7c4b52cb',
  clientSecret: '69fa64bce12749f99575759668715741',
  redirectUri: 'https://api.itsalexander.dev/spotify/callback'
});

interface CallbackQuery {
  code: string;
}

export const spotify: FastifyPluginAsyncJsonSchemaToTs = async function (
  app,
  _options
) {
  app.get('/top', async (request, reply) => {
    var param = {
      limit: 10,
      time_range: 'short_term'
    };

    await spotifyApi
      .getMyTopTracks(param)
      .then((data) => {
        return reply
          .code(200)
          .header('Content-Type', 'application/json')
          .send({ success: true, data: data });
      })
      .catch((error) => {
        return reply
          .code(500)
          .header('Content-Type', 'application/json')
          .send({ success: false, message: error });
      });
  });

  app.get('/login', (request, reply) => {
    reply.redirect(spotifyApi.createAuthorizeURL(['user-top-read']));
  });

  app.get<{ Querystring: CallbackQuery }>('/callback', (request, reply) => {
    spotifyApi
      .authorizationCodeGrant(request.query.code)
      .then((data) => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];

          spotifyApi.setAccessToken(access_token);
        }, (expires_in / 2) * 1000);

        return reply
          .code(200)
          .header('Content-Type', 'application/json')
          .send({ success: true, message: 'OK' });
      })
      .catch((error) => {
        reply
          .code(500)
          .header('Content-Type', 'application/json')
          .send({ success: false, message: error });
      });
  });
};
