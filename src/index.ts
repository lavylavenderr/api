import Fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { config } from 'dotenv';
import { phone } from './routes/phone';
import { spotify } from './routes/spotify';

config();

const app = Fastify().withTypeProvider<JsonSchemaToTsProvider>();
const port = parseInt(process.env.PORT) || 3333;

app.get('/', (request, reply) => {
  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({
      success: true,
      message: "Welcome to Alexander's API! Specify an endpoint to get started."
    });
});

app.register(phone, { prefix: '/phone' });
app.register(spotify, { prefix: '/spotify' });

(async () => {
  try {
    await app.listen({ host: '0.0.0.0', port });

    console.log(`Server is now listening on ${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
