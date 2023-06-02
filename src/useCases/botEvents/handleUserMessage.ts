import TelegramBot from "node-telegram-bot-api";
import { TelegramBotMessageDispatchAdapter } from "../../adapters/TelegramBotMessageDispatcherAdapter";
import { CelebrationCalculatorFactory } from "../../entities/CelebrationCalculatorFactory";
import { IncrementArthurFowards } from "./incrementArthurFowards";
import { incrementLuanAmouranth } from "./incrementLuanAmouranth";
import { MessageGeneratorOpenAi } from "../../infra/MessageGenerator/MessageGeneratorOpenAi";

const ARTHUR_USERNAME = 'Arthur_HOS';
const LUAN_FIRST_NAME = 'Luamboru'

export const handleUserMessage = async (message: TelegramBot.Message, bot: TelegramBot, incrementArthurFowards: IncrementArthurFowards) => {
  if (!message.from) {
    return
  }

  // log users info
  console.log(message.from);
  if (message.from.username === ARTHUR_USERNAME && message.forward_date) {
    return incrementArthurFowards.execute(message.chat.id)
  }

  if(message.text?.includes('https://www.twitch.tv') && message.from.first_name === LUAN_FIRST_NAME) {
    return incrementLuanAmouranth(message, bot)
  }
}
