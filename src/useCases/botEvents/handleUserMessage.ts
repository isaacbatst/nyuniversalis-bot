import TelegramBot from "node-telegram-bot-api";
import { IncrementArthurFowards } from "./incrementArthurFowards";
import IncrementLuanAmouranth from "./incrementLuanAmouranth";
import IncrementIrineuCounter from "./incrementIrineuCounter";

const ARTHUR_USERNAME = 'Arthur_HOS';
const IRINEU_USERNAME = 'irimeu'
const LUAN_FIRST_NAME = 'Luamboru'

export const handleUserMessage = async (
  message: TelegramBot.Message, 
  incrementArthurFowards: IncrementArthurFowards,
  incrementLuanAmourant: IncrementLuanAmouranth,
  incrementIrineuCounter: IncrementIrineuCounter
) => {
  if (!message.from) {
    return
  }
  // log users info
  console.log(message.from);

  if(message.from.username === IRINEU_USERNAME && message.sticker && message.sticker.set_name ===  'AcervoPicaPau') {
    return incrementIrineuCounter.execute(message.chat.id)
  }

  if (message.from.username === ARTHUR_USERNAME && message.forward_date) {
    return incrementArthurFowards.execute(message.chat.id)
  }

  if(message.text?.includes('https://www.twitch.tv') && message.from.first_name === LUAN_FIRST_NAME) {
    const channelUrl = message.text.split(' ').find(word => word.includes('https://www.twitch.tv/'))
    return incrementLuanAmourant.execute(message.chat.id, channelUrl!)
  }
}
