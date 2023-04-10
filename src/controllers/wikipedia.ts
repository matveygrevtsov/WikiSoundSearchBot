import axios from "axios";

const wikipediaAxiosRequestConfig = {
  format: "json",
  action: "query",
  prop: "extracts",
  exintro: "",
  explaintext: "",
  redirects: 1,
};

export async function wikipedia(ctx: any) {
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
  const text = page.extract.replaceAll("\n", " ");

  ctx.reply(text);
}
