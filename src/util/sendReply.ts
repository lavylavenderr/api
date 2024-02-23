import { FastifyReply } from 'fastify';

export function sendReply(reply: FastifyReply, code: number, data: Object) {
  return reply.code(code).header('Content-Type', 'application/json').send(data);
}
