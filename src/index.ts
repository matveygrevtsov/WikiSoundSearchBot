import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
import { Telegraf } from "telegraf";
import { texts } from "./texts";
import { extractMessageTextMiddleware } from "./middlewares/extractMessageTextMiddleware";
import { getDefinitionFromWikipediaMiddleware } from "./middlewares/getDefinitionFromWikipediaMiddleware";
import { yandexSpeechKitMiddleware } from "./middlewares/yandexSpeechKitMiddleware";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(texts.greeting));

bot.on(
  "message",
  extractMessageTextMiddleware,
  getDefinitionFromWikipediaMiddleware,
  yandexSpeechKitMiddleware
);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
