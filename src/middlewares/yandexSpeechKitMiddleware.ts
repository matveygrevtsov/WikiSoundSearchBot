import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
import { mapTextToAudioFile } from "../utils/mapTextToAudioFile";
import { Context } from "telegraf";
import { texts } from "../texts";
import { getYandexIAMToken } from "../utils/getYandexIAMToken";

export async function yandexSpeechKitMiddleware(ctx: Context, next) {
  let isYandexIAMTokenExpiredError = false;

  const fetchAudioAndSendAsVoiceMessage = async () => {
    const audioFile = await mapTextToAudioFile(ctx.state.text);
    ctx.sendVoice({
      source: audioFile,
    });
  };

  try {
    await fetchAudioAndSendAsVoiceMessage();
    return;
  } catch (error) {
    isYandexIAMTokenExpiredError = error.response.status === 401;
    if (!isYandexIAMTokenExpiredError) {
      console.error(error);
      return ctx.reply(texts.errors.yandexSpeechkitError);
    }
  }

  try {
    process.env["YANDEX_IAM_TOKEN"] = await getYandexIAMToken();
    await fetchAudioAndSendAsVoiceMessage();
    return;
  } catch (error) {
    return ctx.reply(texts.errors.yandexGenerateIamTokenError);
  }
}
