import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { Webhook, MessageBuilder } from 'discord-webhook-node';
import { checkAuth } from '../utils/auth';
import moment from 'moment-timezone';

export const phone: FastifyPluginAsyncJsonSchemaToTs = async function (
  app,
  _options
) {
  app.post('/alarm', (request, reply) => {
    const time = moment.tz('America/Los_Angeles').format('HH:mm');

    if (checkAuth(request)) {
      const hook = new Webhook(process.env.PHONEWEBHOOK);
      let description = '';

      if (time === '6:30')
        description = `<@988801425196867644>'s **${time}** alarm to wake up for school has gone off.`;
      else
        description = `<@988801425196867644>'s **${time}** alarm has gone off.`;

      try {
        const embed = new MessageBuilder()
          .setDescription(description)
          .setColor(10181046);

        hook.send(embed);

        return {
          success: true,
          message: 'OK'
        };
      } catch (error) {
        console.error(error);
        return reply
          .code(500)
          .header('Content-Type', 'application/json')
          .send({ success: false, message: error });
      }
    } else {
      return reply
        .code(401)
        .header('Content-Type', 'application/json')
        .send({ success: false, message: 'Unauthorized' });
    }
  });

  app.post('/charging', (request, reply) => {
    if (checkAuth(request)) {
      const hook = new Webhook(process.env.PHONEWEBHOOK);

      if (request.headers['state'] == 'plugin') {
        const embed = new MessageBuilder()
          .setDescription(
            `<@988801425196867644> has begun charging their phone. Their battery is currently at **${request.headers['battery']}%**.`
          )
          .setColor(10181046);

        hook.send(embed);
        return {
          success: true,
          message: 'OK'
        };
      } else {
        const embed = new MessageBuilder()
          .setDescription(
            `<@988801425196867644> has stopped charging their phone. Their battery is now at **${request.headers['battery']}%**.`
          )
          .setColor(10181046);

        hook.send(embed);
        return {
          success: true,
          message: 'OK'
        };
      }
    } else {
      return reply
        .code(401)
        .header('Content-Type', 'application/json')
        .send({ success: false, message: 'Unauthorized' });
    }
  });

  app.post('/unlockfail', (request, reply) => {
    if (checkAuth(request)) {
      const hook = new Webhook(process.env.PHONEWEBHOOK);

      try {
        const embed = new MessageBuilder()
          .setDescription(
            '<@988801425196867644> failed to unlock their phone, fuckin dumbass'
          )
          .setColor(10181046);

        hook.send(embed);

        return {
          success: true,
          message: 'OK'
        };
      } catch (error) {
        console.error(error);
        return reply
          .code(500)
          .header('Content-Type', 'application/json')
          .send({ success: false, message: error });
      }
    } else {
      return reply
        .code(401)
        .header('Content-Type', 'application/json')
        .send({ success: false, message: 'Unauthorized' });
    }
  });
};
