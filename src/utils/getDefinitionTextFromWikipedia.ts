import axios from "axios";
import { cutText } from "./cutText";

const wikipediaAxiosRequestConfig = {
  format: "json",
  action: "query",
  prop: "extracts",
  exintro: "",
  explaintext: "",
  redirects: 1,
};

/**
 * Возвращает определение из Википедии для заданного слова, либо null, если Википедия не смогла найти определение.
 * @param queryString - строка, определение для которой нужно найти в википедии.
 */
export async function getDefinitionTextFromWikipedia(
  queryString: string
): Promise<string | null> {
  const wikipediaResponse = await axios.get(
    "https://ru.wikipedia.org/w/api.php",
    {
      params: {
        ...wikipediaAxiosRequestConfig,
        titles: queryString,
      },
    }
  );

  const { pages } = wikipediaResponse.data.query;

  if (pages["-1"]) {
    return null;
  }

  const pageKey = Object.keys(pages)[0];
  const page = pages[pageKey];
  const text = cutText(page.extract);
  return text;
}
