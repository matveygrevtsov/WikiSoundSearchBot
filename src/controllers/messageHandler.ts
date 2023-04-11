import { mapTextToAudioFile } from "../utils/mapTextToAudioFile";
import { getDefinitionTextFromWikipedia } from "../utils/getDefinitionTextFromWikipedia";

enum ErrorText {
  WikipediaError = "Произошла ошибка при запросе в Википедию.",
  WikipediaNotFound = "К сожалению, Википедия не смогла найти определение по запросу",
  YandexSpeechkitError = "Произошла ошибка при запросе в yandex speechkit",
  TelegrafSendVoiceMessageError = "К сожалению, боту не удалось отправить вам голосовое сообщение.",
}

export async function messageHandler(ctx: any) {
  const messageText: string = ctx.message.text;
  let definitionTextFromWikipedia: string | null = null;

  try {
    definitionTextFromWikipedia = await getDefinitionTextFromWikipedia(
      messageText
    );
  } catch (error) {
    console.error(error);
    return ctx.reply(ErrorText.WikipediaError);
  }

  if (!definitionTextFromWikipedia) {
    return ctx.reply(`${ErrorText.WikipediaNotFound}: "${messageText}"`);
  }

  let audioFile: any;

  try {
    audioFile = await mapTextToAudioFile(definitionTextFromWikipedia);
  } catch (error) {
    console.error(error);
    return ctx.reply(ErrorText.YandexSpeechkitError);
  }

  try {
    ctx.sendVoice({
      source: audioFile,
    });
  } catch (error) {
    console.error(error);
    ctx.reply(ErrorText.TelegrafSendVoiceMessageError);
  }
}
