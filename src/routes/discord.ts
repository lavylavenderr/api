import Elysia from "elysia";
import { requireAuthentication } from "src/shared/auth";
import { editDiscordMessage, sendDiscordMessage } from "src/shared/discord";
import { z } from 'zod'

export default new Elysia({ prefix: "/discord", tags: ["Utility"] })
    .use(requireAuthentication)
    .guard({
        headers: z.object({
            authorization: z.string()
        })
    })

    .post("/send/:channelId", async ({ set, body, params: { channelId } }) => {
        if (!body) {
            set.status = 400;
            return {
                message: "Invalid Request: Missing Body"
            };
        }

        try {
            await sendDiscordMessage(channelId, body);
            return { message: "Message sent successfully" };
        } catch (err) {
            console.error(err);

            set.status = 500;
            return { message: "Internal Server Error", error: err };
        }
    }, {
        params: z.object({
            channelId: z.string()
        })
    })

    .post("/edit/:channelId/:messageId", async ({ set, body, params: { channelId, messageId } }) => {
        if (!body) {
            set.status = 400;
            return {
                message: "Invalid Request: Missing Body"
            };
        }

        try {
            await editDiscordMessage(messageId, channelId, body);
            return { message: "Message edited successfully" };
        } catch (err) {
            console.error(err);

            set.status = 500;
            return { message: "Internal Server Error", error: err };
        }
    }, {
        params: z.object({
            channelId: z.string(),
            messageId: z.string()
        })
    });
