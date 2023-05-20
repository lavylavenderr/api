import { FastifyRequest } from "fastify"

export function checkAuth(request: FastifyRequest) {
  return request.headers.authorization === process.env.AUTHORIZATION_HEADER;
}