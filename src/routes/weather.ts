import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { Metar, Taf } from '@flybywiresim/api-client';

interface WeatherQuery {
  icao: string;
}

// For a upcoming project ;3
export const weather: FastifyPluginAsyncJsonSchemaToTs = async function (
  app,
  _options
) {
  app.get<{ Querystring: WeatherQuery }>('/metar', async (request, reply) => {
    const icao = request.query.icao;
    const metar = await Metar.get(icao);

    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(metar);
  });

  app.get<{ Querystring: WeatherQuery }>('/taf', async (request, reply) => {
    const icao = request.query.icao;
    const taf = await Taf.get(icao);

    return reply.code(200).header('Content-Type', 'application/json').send(taf);
  });
};
