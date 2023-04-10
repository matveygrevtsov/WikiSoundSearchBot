import { Telegraf } from "telegraf";
import { messageHandler } from "./controllers/messageHandler";

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Начинаем!"));

bot.on("message", (ctx) => {
  messageHandler(ctx);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
