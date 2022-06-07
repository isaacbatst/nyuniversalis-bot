import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../../database/Entities/Person/Person";
import drawName from "../../names";

export const getLuanAmouranth = async (message: TelegramBot.Message, bot: TelegramBot) => {
  const { chat: { id } } = message;

  const name = 'Luan';

  const nicknames = await PersonModel.getNicknames(name);
  const counter = await PersonModel.getCounter(name, true);

  const nickname = drawName(nicknames);

  bot.sendMessage(id, `${nickname} compartilhou amor ${counter} vezes`)
}