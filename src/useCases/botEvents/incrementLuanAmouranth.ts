import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../../database/Entities/Person/Person";
import drawName from "../../names";

export const incrementLuanAmouranth = async (message: TelegramBot.Message, bot: TelegramBot) => {
  const name = 'Luan';

  await PersonModel.incrementCounterAmouranth(name);
  const counter = await PersonModel.getCounterAmouranth(name);

  const nicknames = await PersonModel.getNicknames(name);
  const nickname = drawName(nicknames);

  return bot.sendMessage(message.chat.id, `${nickname} dividiu e compartilhou ${counter} vezes`)
}