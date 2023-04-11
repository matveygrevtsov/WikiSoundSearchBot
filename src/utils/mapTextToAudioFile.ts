import axios from "axios";

/**
 * Преобразует текст в аудиофайл.
 * @param text - текст, который будет преобразован в аудиофайл.
 */
export async function mapTextToAudioFile(text: string) {
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
        Authorization: `Bearer ${process.env.YANDEX_TOKEN}`,
      },
      responseType: "arraybuffer",
    }
  );

  return result.data;
}
