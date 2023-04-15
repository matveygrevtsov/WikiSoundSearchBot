import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
import axios from "axios";

interface GenerateYandexIamTokenResponse {
  data: {
    iamToken: string;
  };
}

/**
 * Возвращает IAM-токен для аккаунта на яндексе (см. https://cloud.yandex.ru/docs/iam/operations/iam-token/create).
 */
export async function getYandexIAMToken(): Promise<string> {
  const payload: GenerateYandexIamTokenResponse = await axios.post(
    "https://iam.api.cloud.yandex.net/iam/v1/tokens",
    {
      yandexPassportOauthToken: process.env.YANDEX_PASSPORT_OAUTH_TOKEN,
    }
  );
  return payload.data.iamToken;
}
