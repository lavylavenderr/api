import Fastify from "fastify";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts"
import { config } from "dotenv";
import { phone } from "./routes/phone";
import { spotify } from "./routes/spotify"

config()

const app = Fastify().withTypeProvider<JsonSchemaToTsProvider>();
const port = parseInt(process.env.PORT) || 3333;

app.register(phone , { prefix: "/phone" });
app.register(spotify, { prefix: "/spotify" });

(async () => {
  try {
    await app.listen({ port });

    console.log(`Server is now listening on ${port}`);
  } catch (error) {
    console.error(error)
    process.exit(1)
  }  
})()