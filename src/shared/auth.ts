import Elysia from "elysia";
import { bearer } from "@elysiajs/bearer"

export const requireAuthentication = new Elysia()
    .use(bearer())
    .onBeforeHandle(({ bearer, set }) => {
        const authorizationHeader = bearer;

        if (!authorizationHeader || authorizationHeader !== Bun.env.API_KEY) {
            set.status = 401;
            return {
                message: !authorizationHeader
                    ? "Invalid Request: Missing Authorization Header"
                    : "Invalid Request: Invalid API Key"
            };
        }

        return
    })
    .as("scoped")

export const requireSpecialUserAgent = new Elysia()
    .onBeforeHandle(({ request, set }) => {
        const userAgentHeader = request.headers.get("User-Agent");

        if (!userAgentHeader || userAgentHeader !== Bun.env.MAGIC_USER_AGENT) {
            set.status = 401;
            return {
                message: "Invalid Request: Unauthorized"
            }
        }
    })
    .as("scoped")