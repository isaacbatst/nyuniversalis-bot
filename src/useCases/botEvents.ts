import TelegramBot from "node-telegram-bot-api";
import { getArthurFowards } from "./botEvents/getArthurFowards";
import { getLuanKitchen } from "./botEvents/getLuanKitchen";
import { incrementArthurFowards } from "./botEvents/incrementArthurFowards";
import { incrementLuanKitchen } from "./botEvents/incrementLuanKitchen";

function handleEvents(bot: TelegramBot) {
  bot.onText(/\/luan_na_cozinha/, (message) => incrementLuanKitchen(message, bot))

  bot.onText(/\/qnts_na_cozinha/, (message) => getLuanKitchen(message, bot))

  bot.on('message', (message) => incrementArthurFowards(message, bot))

  bot.onText(/\/qnts_macaco/, (message) => getArthurFowards(message, bot))
}

export default handleEvents;