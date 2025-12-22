import Elysia from "elysia";
import { stripe } from "src/shared/stripe";
import { z } from 'zod'
import Stripe from 'stripe';
import { StripeProductModel } from "src/schema/products";
import { getDiscordUser, sendDiscordMessage } from "src/shared/discord";
import { EmbedBuilder } from "discord.js";

export default new Elysia({ prefix: "/stripe", tags: ["Finance"] })
    .guard({
        headers: z.object({
            "stripe-signature": z.string()
        })
    })

    .post("/recieve", async ({ set, request }) => {
        try {
            const rawBody = await request.arrayBuffer();
            const stripeEvent = await stripe.webhooks.constructEventAsync(
                Buffer.from(rawBody),
                String(request.headers.get("Stripe-Signature")!),
                Bun.env.STRIPE_WEBHOOK_SECRET!
            );

            if (
                stripeEvent.type === "checkout.session.completed" &&
                (stripeEvent.data.object as Stripe.Checkout.Session).payment_status === "paid"
            ) {
                const session = stripeEvent.data.object as Stripe.Checkout.Session;
                const purchase = await StripeProductModel.findOne({
                    checkoutSessions: {
                        $in: [session.id]
                    }
                });

                if (purchase) {
                    const [user, lineItems] = await Promise.all([
                        getDiscordUser(purchase.discordUserId),
                        stripe.checkout.sessions.listLineItems(session.id, { limit: 1 }),
                    ]);

                    const amountFormatted = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: lineItems.data[0]?.currency,
                    }).format(lineItems.data[0]!.amount_total / 100);

                    await sendDiscordMessage(
                        Bun.env.PAYMENT_CHANNEL_ID!,
                        {
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle("Payment Captured")
                                    .setDescription(
                                        "A Stripe payment was received from a completed checkout session."
                                    )
                                    .addFields(
                                        { name: "Username", value: user.username, inline: true },
                                        { name: "User ID", value: user.id, inline: true },
                                        { name: "Captured Amount", value: amountFormatted },
                                        { name: "Checkout Session ID", value: session.id }
                                    )
                                    .setColor("Green")
                                    .setTimestamp()
                                    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`)
                            ]
                        }
                    )
                }
            }

            return {
                message: "OK",
                success: true
            }
        } catch (err) {
            console.error(err);

            set.status = 500;
            return { message: "Internal Server Error", error: err };
        }
    }, {
        parse: "none"
    })