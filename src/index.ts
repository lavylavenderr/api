import { Elysia } from "elysia";
import { version } from "../package.json"
import { mongoClient } from "./shared/database";
import { mongo } from "mongoose";

const app = new Elysia()
  .use((app) =>
    app
      .onBeforeHandle(({ set }) => {
        set.headers["X-Powered-By"] = "Elysia-Lavender"
        set.headers["X-Api-Version"] = version
      })
  )
  .get("/", () => {
    return {
      version,
      message: "owo~ what's this?",
      database: mongoClient.ConnectionStates[mongoClient.connection.readyState]
    }
  })
  .use((await import("./routes/badge")).default)
  .use((await import("./routes/discord")).default)
  .use((await import("./routes/stripe")).default)
  .use((await import("./routes/utility")).default)
  .listen(3000)

console.info(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
console.info(`💾 Mongo is ${mongoClient.ConnectionStates[mongoClient.connection.readyState]}.`)
