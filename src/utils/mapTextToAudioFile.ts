import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
import axios from "axios";

/**
 * Преобразует текст в аудиофайл.
 * @param text - текст, который будет преобразован в аудиофайл.
 */
export async function mapTextToAudioFile(text: string) {
  const yandexIamToken = process.env.YANDEX_IAM_TOKEN || "";
  const urlSearchParams = new URLSearchParams({
    text,
    voice: "filipp",
    folderId: process.env.YANDEX_FOLDER_ID,
  });

  const result = await axios.post(
    "https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize",
    urlSearchParams,
    {
      headers: {
        Authorization: `Bearer ${yandexIamToken}`,
      },
      responseType: "arraybuffer",
    }
  );

  return result.data;
}
