import { prisma } from '../util/db';

// This is to keep up with spammers who just wanna fuck with me :P
const logRequest = async (request, reply) => {
  await prisma.request.create({
    data: {
      requestip: request.headers["x-forwarded-for"] as string ?? "127.0.0.1", // For Railway, since it uses the "X-Forwarded-For" header
      endpoint: request.url as string,
      useragent:
        (request.headers['user-agent'] as string) ??
        'Toaster/1.0 (Unknown Device)'
    }
  });
};

export default logRequest;
