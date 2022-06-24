import mongoose from "mongoose";
import { MONGO_URI } from "./config/env.config.js";

export const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Db connected')
    } catch (error) {
        console.log(error)
    }
}