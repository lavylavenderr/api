import Fastify from 'fastify';
import { config } from 'dotenv';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

import { weather } from './routes/weather';
import { badge } from './routes/badge';
import { sendReply } from './util/sendReply';

config();

// Fastify
const app = Fastify().withTypeProvider<JsonSchemaToTsProvider>();
const port = parseInt(process.env.PORT) || 3333;

app.get('/', (request, reply) => {
  sendReply(reply, 200, {
    success: true,
    message: 'OwO, welcome to the Fox Den, what might we have here? :3'
  });
});

app.register(weather, { prefix: '/weather' });
app.register(badge, { prefix: '/badge' });

// Start Fastify
(async () => {
  try {
    await app.listen({ host: '0.0.0.0', port });

    console.log(`Server is now listening on ${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
