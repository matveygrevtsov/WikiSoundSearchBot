import { Telegraf } from "telegraf";

export const launchConfig: Telegraf.LaunchOptions = {
  // webhook - это конфигурация, которая позволяет стартовать сервер только тогда, когда к нему начинают поступать запросы. После того, как запросы закончатся - сервер снова временно засыпает до получения следующих.
  webhook: {
    domain: process.env.PUBLIC_DOMAIN,
    port: parseInt(process.env.PORT),
    secretToken: process.env.WEBHOOK_SECRET_TOKEN,
  },
};
