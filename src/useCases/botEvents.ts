import TelegramBot from "node-telegram-bot-api";
import { getArthurFowards } from "./botEvents/getArthurFowards";
import { getLuanAmouranth } from "./botEvents/getLuanAmouranth";
import { getLuanKitchen } from "./botEvents/getLuanKitchen";
import { handleUserMessage } from "./botEvents/handleUserMessage";
import { IncrementArthurFowards } from "./botEvents/incrementArthurFowards";
import { incrementLuanKitchen } from "./botEvents/incrementLuanKitchen";
import IncrementLuanAmouranth from "./botEvents/incrementLuanAmouranth";

function setupEventListeners(
  bot: TelegramBot, 
  incrementArthurFowards: IncrementArthurFowards,
  incrementLuanAmourant: IncrementLuanAmouranth
) {
  bot.on('message', (message) => handleUserMessage(message, incrementArthurFowards, incrementLuanAmourant))
  bot.onText(/\/luan_na_cozinha/, (message) => incrementLuanKitchen(message, bot))
  bot.onText(/\/qnts_na_cozinha/, (message) => getLuanKitchen(message, bot))
  bot.onText(/\/qnts_amouranth/, (message) => getLuanAmouranth(message, bot))
  bot.onText(/\/qnts_macaco/, (message) => getArthurFowards(message, bot))
}

export default setupEventListeners;