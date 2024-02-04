import { connectMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handle(req, res) {
    await connectMongoose();
    const response = await Product.find().exec();
    res.status(200).json(response);
}