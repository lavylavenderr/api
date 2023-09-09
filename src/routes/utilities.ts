import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { MessageBuilder, Webhook } from 'discord-webhook-node';

interface reuqestData {
  name: string;
  message: string;
  email: string;
  authorization: string;
}

export const utilities: FastifyPluginAsyncJsonSchemaToTs = async function (
  app,
  _options
) {
  app.post<{ Querystring: reuqestData }>('/form', (request, reply) => {
    if (request.query.authorization != process.env.AUTHORIZATION) {
      return reply
        .code(401)
        .header('Content-Type', 'application/json')
        .send({ success: false, message: 'Unauthorized' });
    } else {
      const hook = new Webhook({ url: process.env.WEBHOOK });
      const { name, message, email } = request.query;

      if (!name || !message || !email) {
        return reply
          .code(400)
          .header('Content-Type', 'application/json')
          .send({ success: false, message: 'Invalid Request' });
      }

      hook.send(
        new MessageBuilder()
          .setTitle('New Contact Submission')
          .addField('Name', name, true)
          .addField('Email', email, true)
          .addField('Message', message)
          .setColor(0x967bb6)
      );

      return reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send({ success: true, message: 'OK' });
    }
  });
};
