import { cutText } from "../utils/cutText";
import { texts } from "../texts";
import { getDefinitionTextFromWikipedia } from "../utils/getDefinitionTextFromWikipedia";
import { Context } from "telegraf";

export async function getDefinitionFromWikipediaMiddleware(ctx: Context, next) {
  const { text } = ctx.state;
  let definitionTextFromWikipedia: string = "";
  try {
    definitionTextFromWikipedia = await getDefinitionTextFromWikipedia(text);
  } catch (error) {
    console.error(error);
    return ctx.reply(texts.errors.wikipediaError);
  }
  if (!definitionTextFromWikipedia) {
    return ctx.reply(`${texts.errors.wikipediaNotFound}: "${text}"`);
  }
  ctx.state.text = cutText(definitionTextFromWikipedia);
  next();
}
