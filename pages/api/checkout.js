import { connectMongoose } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Product from "@/models/Product";

export default async function handler(req, res) {
    await connectMongoose();

    if (req.method !== 'POST') {
        res.status(400).json({ error: "Invalid method, should be a POST." });
        return;
    }

    const {email} = req.body;

    const productsIds = req.body.products.split(',');
    const uniqIds = [...new Set(productsIds)];
    const products = await Product.find({_id:{$in:uniqIds}});

    let line_items = [];
    for (let productId of uniqIds) {
        const quantity = productsIds.filter(id => id === productId).length;
        const product = products.find(p => p._id.toString() === productId);
        line_items.push({
            quantity: quantity,
            price_data: {
                currency: 'USD',
                product_data: {name: product.name},
                unit_amount: product.price * 100, //cause Stripe uses cents, so I need to turn $100 into 10,000 cents
            },

        })
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);

}
