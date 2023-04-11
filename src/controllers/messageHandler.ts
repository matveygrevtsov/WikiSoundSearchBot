import { mapTextToAudioFile } from "../utils/mapTextToAudioFile";
import { getDefinitionTextFromWikipedia } from "../utils/getDefinitionTextFromWikipedia";
import { texts } from "../texts";

export async function messageHandler(ctx: any) {
  const messageText: string = ctx.message.text;

  if (typeof messageText !== "string")
    return ctx.reply(texts.errors.notATextMessage);

  let definitionTextFromWikipedia: string | null = null;

  try {
    definitionTextFromWikipedia = await getDefinitionTextFromWikipedia(
      messageText
    );
  } catch (error) {
    console.error(error);
    return ctx.reply(texts.errors.wikipediaError);
  }

  if (!definitionTextFromWikipedia) {
    return ctx.reply(`${texts.errors.wikipediaNotFound}: "${messageText}"`);
  }

  let audioFile: any;

  try {
    audioFile = await mapTextToAudioFile(definitionTextFromWikipedia);
  } catch (error) {
    console.error(error);
    return ctx.reply(texts.errors.yandexSpeechkitError);
  }

  try {
    ctx.sendVoice({
      source: audioFile,
    });
  } catch (error) {
    console.error(error);
    ctx.reply(texts.errors.telegrafSendVoiceMessageError);
  }
}
