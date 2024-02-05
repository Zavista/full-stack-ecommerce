import { connectMongoose } from "@/lib/mongoose";
const stripe = require('stripe')('sk_test_...');

export default async function handler(req, res) {
    await connectMongoose();

    if (req.method !== 'POST') {
        res.status(400).json({ error: "Invalid method, should be a POST." });
        return;
    }

    res.json

}
