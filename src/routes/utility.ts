import Elysia from "elysia";
import { requireSpecialUserAgent } from "src/shared/auth";

export default new Elysia({ prefix: "/utility", tags: ["Utility"] })
    .use(requireSpecialUserAgent)
    .get("/staffDatabase", async ({ set }) => {
        try {
            const response = await fetch(
                `https://${Bun.env.SHULKERBOX_URL}/api/data/staffDatabase?level=basic`,
                {
                    headers: {
                        Authorization: Bun.env.SHULKERBOX_TOKEN!,
                        "User-Agent": Bun.env.MAGIC_USER_AGENT!
                    },
                }
            );

            if (!response.ok)
                return {
                    message: "Upstream Error",
                    error: (response.headers.get("Content-Type") === "application/json"
                        ? await response.json()
                        : "Unknown"
                    )
                }

            return (await response.json() as { message: any[] }).message
        } catch (err) {
            console.error(err)

            set.status = 500;
            return { message: "Internal Server Error", error: err };
        }
    })