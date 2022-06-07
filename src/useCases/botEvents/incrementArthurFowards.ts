import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../../database/Entities/Person/Person";
import drawName from "../../names";

const ARTHUR_USERNAME = 'Arthur_HOS';

export const incrementArthurFowards = async (message: TelegramBot.Message, bot: TelegramBot) => {
  if (!message.from) {
    return
  }

  const name = 'Arthur';

  if (message.from.username === ARTHUR_USERNAME && message.forward_date) {
    await PersonModel.incrementCounter(name);
    const counter = await PersonModel.getCounter(name);

    const nicknames = await PersonModel.getNicknames(name);

    const nickname = drawName(nicknames);

    const { chat: { id } } = message;
    bot.sendMessage(id, `${nickname} dividiu e compartilhou ${counter} vezes`)
  }
}