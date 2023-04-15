import { Context } from "telegraf";
import { texts } from "../texts";

export function extractMessageTextMiddleware(ctx: Context, next) {
  const message = ctx.message as { text: string };
  const text = message?.text;
  if (typeof text !== "string") {
    return ctx.reply(texts.errors.notATextMessage);
  }
  ctx.state.text = text;
  next();
}
