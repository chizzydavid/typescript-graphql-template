import dotenv from "dotenv";

dotenv.config();
const { DB_URL } = process.env;

const development = DB_URL;
const staging = DB_URL;
const production = DB_URL;
const test = DB_URL;
const qa = DB_URL

export default { development, production, test, staging, qa };
