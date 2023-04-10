import axios from "axios";
import { cutText } from "../utils/cutText";
import { mapTextToAudioFile } from "../utils/mapTextToAudioFile";

const wikipediaAxiosRequestConfig = {
  format: "json",
  action: "query",
  prop: "extracts",
  exintro: "",
  explaintext: "",
  redirects: 1,
};

export async function messageHandler(ctx: any) {
  const messageText: string = ctx.message.text;
  const wikipediaResponse = await axios.get(
    "https://ru.wikipedia.org/w/api.php",
    {
      params: {
        ...wikipediaAxiosRequestConfig,
        titles: messageText,
      },
    }
  );
  const { pages } = wikipediaResponse.data.query;

  if (pages["-1"]) {
    ctx.reply(
      `К сожалению, в Википедии по запросу "${messageText}" ничего найти не удалось.`
    );
    return;
  }

  const pageKey = Object.keys(pages)[0];
  const page = pages[pageKey];
  const text = cutText(page.extract);

  try {
    const audioFile = await mapTextToAudioFile(text);
    ctx.sendVoice({
      source: audioFile,
    });
  } catch (error) {
    ctx.reply(`Что-то пошло не так. ${JSON.stringify(error)}`);
  }
}
