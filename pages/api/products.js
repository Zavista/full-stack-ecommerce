import { connectMongoose } from "@/lib/mongoose";

export default async function handle(req, res) {
    await connectMongoose();
    
}