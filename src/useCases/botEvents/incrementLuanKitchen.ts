import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../../database/Entities/Person/Person";
import drawName from "../../names";

export const incrementLuanKitchen = async (message: TelegramBot.Message, bot: TelegramBot) => {
  const { chat: { id } } = message;

  const name = 'Luan';

  await PersonModel.incrementCounter(name);
  const counter = await PersonModel.getCounter(name);
  const nicknames = await PersonModel.getNicknames(name);

  const nickname = drawName(nicknames);

  bot.sendMessage(id, `${nickname} foi na cozinha ${counter} vezes`)
}