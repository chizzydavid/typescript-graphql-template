import mongoose from "mongoose";
import config from "../../../config/config";


const env = process.env.NODE_ENV;
// config[index] should be different environments
const dbLink: string = config["development"]!;

export default async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(dbLink);
    console.log("Successfully connected to database!");
    return connection;
  } catch (err) {
    console.log(err);
  }
};


// mongoose connection options deprecated
// https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported

