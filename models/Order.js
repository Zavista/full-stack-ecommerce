import mongoose from "mongoose";
import { models } from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        products: Object,
        name: String,
        email: String,
        address: String,
        city: String,
        country: String,
        postal: String,
        paid: { type: Number, default: 0 },
        date: { type: Date, default: Date.now } // Set the default value as the current date
    }
);


const Order = models.Order || mongoose.model("Order", OrderSchema);
export default Order;