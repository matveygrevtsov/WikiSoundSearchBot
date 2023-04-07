import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });

// import { Telegraf } from "telegraf";
// const bot = new Telegraf("");
console.log(process.env.TEST_MESSAGE);
