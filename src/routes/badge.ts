import Elysia from "elysia";
import type { LanyardData } from "src/shared/types";

const getLanyardData = async (): Promise<LanyardData> => {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${Bun.env.DISCORD_ID}`);
    return (await res.json()) as LanyardData;
}

export default new Elysia({ prefix: "/badge", tags: ["Utility"] })
    .get("/spotify", async () => {
        const body = await getLanyardData();
        return {
            schemaVersion: 1,
            namedLogo: 'spotify',
            logoColor: 'white',
            color: '1db954',
            label: 'listening to',
            message: body.data.listening_to_spotify
                ? `${body.data.spotify?.song} by ${body.data.spotify?.artist}`
                : 'nothing :3',
        };
    })

    .get("/status", async () => {
        let color: string | null = null;
        const body = await getLanyardData();

        switch (body.data.discord_status) {
            case 'online':
                color = 'green';
                break;
            case 'idle':
                color = 'yellow';
                break;
            case 'dnd':
                color = 'red';
                break;
            case 'offline':
                color = 'lightgrey';
        }

        return {
            schemaVersion: 1,
            color,
            label: 'currently',
            message: body.data.discord_status,
        };
    })

    .get("/playing", async () => {
        const body = await getLanyardData();
        const activityArray = body.data.activities;

        let filteredActivity;

        for (const activity of activityArray) {
            if (
                activity.type === 0 &&
                activity.application_id !== '782685898163617802'
            ) {
                filteredActivity = activity;
            }
        }

        return {
            schemaVersion: 1,
            color: '5865F2',
            label: 'playing',
            message: filteredActivity ? filteredActivity.name : 'nothing :3',
        };
    })