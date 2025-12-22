import mongoose from "mongoose"

export const mongoClient = await mongoose.connect(Bun.env.MONGO_URI as string)