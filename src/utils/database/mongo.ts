import mongoose from "mongoose";
import config from "../../config/config";


const dbLink: string = config["development"]!;

export default async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(dbLink);
    console.log("Successfully connected to database!");
    return connection;
  } catch (err) {
    console.log(err);
  }
}
