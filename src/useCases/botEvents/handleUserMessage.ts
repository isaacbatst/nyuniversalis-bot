import TelegramBot from "node-telegram-bot-api";
import { incrementArthurFowards } from "./incrementArthurFowards";
import { incrementLuanAmouranth } from "./incrementLuanAmouranth";

const ARTHUR_USERNAME = 'Arthur_HOS';
const LUAN_FIRST_NAME = 'Luan'

export const handleUserMessage = async (message: TelegramBot.Message, bot: TelegramBot) => {
  if (!message.from) {
    return
  }

  // log users info
  console.log(message.from, message.chat);

  if (message.from.username === ARTHUR_USERNAME && message.forward_date) {
    return incrementArthurFowards(message, bot)
  }

  if(message.text === 'https://www.twitch.tv/amouranth' && message.from.first_name === LUAN_FIRST_NAME) {
    return incrementLuanAmouranth(message, bot)
  }
}