import { prisma } from '../util/db';
import { type FastifyRequest } from 'fastify';

// This is to keep up with spammers who just wanna fuck with me :P
const logRequest = async (request: FastifyRequest) => {
  await prisma.request.create({
    data: {
      ip: (request.headers['x-forwarded-for'] as string) ?? '127.0.0.1', // For Hop, I think it's proxied?
      route: request.url as string
    }
  });
};

export default logRequest;
