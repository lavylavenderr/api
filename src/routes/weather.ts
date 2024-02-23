import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { sendReply } from '../util/sendReply';
import axios from 'axios';

interface WeatherQuery {
  icao: string;
}

// For a upcoming project ;3
export const weather: FastifyPluginAsyncJsonSchemaToTs = async function (
  app,
  _options
) {
  app.get<{ Querystring: WeatherQuery }>('/metar', async (request, reply) => {
    const response = (
      await axios.get(`https://avwx.rest/api/metar/${request.query.icao}`, {
        headers: {
          Authorization: process.env.AVWX_API
        }
      })
    ).data;
    return sendReply(reply, 200, response);
  });

  app.get<{ Querystring: WeatherQuery }>('/taf', async (request, reply) => {
    const response = (
      await axios.get(`https://avwx.rest/api/taf/${request.query.icao}`, {
        headers: {
          Authorization: process.env.AVWX_API
        }
      })
    ).data;
    return sendReply(reply, 200, response);
  });
};
