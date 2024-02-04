import mongoose from "mongoose";
import { models } from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        category: String,
        picture: String,
    }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;