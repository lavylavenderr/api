import mongoose, { Schema } from "mongoose"

export const StripeProductSchema = new Schema({
    discordUserId: {
        type: String,
        required: true,
        unique: true
    },
    stripeProductId: {
        type: String,
        required: true,
        unique: true
    },
    stripePriceId: {
        type: String,
        required: true,
        unique: true
    },
    checkoutSessions: {
        type: [String],
        default: []
    }
}, { collection: "stripeProducts" })

export const StripeProductModel = mongoose.model("StripeProduct", StripeProductSchema)