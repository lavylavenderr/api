import { EmbedBuilder } from "@discordjs/builders";
import got from "got";
import type { DiscordAPIUser } from "./types";

const discordApi = "https://discord.com/api/v10"
const gotConfig = {
    throwHttpErrors: false,
    timeout: { request: 10000 },
    retry: { limit: 2 },
    headers: {
        Authorization: `Bot ${Bun.env.BOT_TOKEN}`
    }
};

export async function sendDiscordMessage(
    channelId: string,
    content: string | { content?: string; embeds?: EmbedBuilder[] }
) {
    const body = typeof content === "string" ? { content } : content;
    return got
        .post(discordApi + `/channels/${channelId}/messages`, {
            ...gotConfig,
            json: body
        })
        .json();
}

export async function editDiscordMessage(
    messageId: string,
    channelId: string,
    content: string | { content?: string; embeds?: EmbedBuilder[] }
) {
    const body = typeof content === "string" ? { content } : content;
    return got
        .patch(discordApi + `/channels/${channelId}/messages/${messageId}`, {
            ...gotConfig,
            json: body
        })
        .json();
}

export async function getDiscordUser(
    userId: string
) {
    return (await got
        .get(discordApi + `/users/${userId}`, gotConfig)
        .json()) as DiscordAPIUser;
}