import axios from "axios";

export function mapTextToAudioFile(text: string) {
  const urlSearchParams = new URLSearchParams({
    text,
    voice: "filipp",
    folderId: process.env.YANDEX_FOLDER_ID,
  });

  return axios.post(
    "https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize",
    urlSearchParams,
    {
      headers: {
        Authorization: `Bearer ${process.env.YANDEX_TOKEN}`,
      },
      responseType: "arraybuffer",
    }
  );
}
