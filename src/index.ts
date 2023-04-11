import { Telegraf } from "telegraf";
import { messageHandler } from "./controllers/messageHandler";
import { texts } from "./texts";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(texts.greeting));

bot.on("message", messageHandler);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
