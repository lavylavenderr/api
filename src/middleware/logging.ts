import { prisma } from '../util/db';

// This is to keep up with spammers who just wanna fuck with me :P
const logRequest = async (request, reply) => {
  await prisma.request.create({
    data: {
      requestip: request.ip as string,
      endpoint: request.url as string,
      useragent:
        (request.headers['user-agent'] as string) ??
        'Toaster/1.0 (Unknown Device)'
    }
  });
};

export default logRequest;
