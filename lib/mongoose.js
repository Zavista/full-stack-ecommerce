import mongoose from "mongoose";

export async function connectMongoose() {

    if (mongoose.connection.readyState === 1) { //already connected
        return mongoose.connection.asPromise(); //returns existing connection
    }

    return await mongoose.connect(process.env.MONGODB_URL);
}