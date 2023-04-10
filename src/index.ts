import { Telegraf } from "telegraf";
import { wikipedia } from "./controllers/wikipedia";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Начинаем!"));

bot.on("message", wikipedia);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
