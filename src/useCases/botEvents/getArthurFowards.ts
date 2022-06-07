import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../../database/Entities/Person/Person";
import drawName from "../../names";

export const getArthurFowards = async (message: TelegramBot.Message, bot: TelegramBot) => {
  const name = 'Arthur';

  const counter = await PersonModel.getCounter(name);
  const nicknames = await PersonModel.getNicknames(name);

  const nickname = drawName(nicknames);

  const { chat: { id } } = message;
  bot.sendMessage(id, `${nickname} dividiu e compartilhou ${counter} vezes`)
}