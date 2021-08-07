import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../database/Entities/Person/Person";
import sortName from "../names";

const ARTHUR_USERNAME = 'Arthur_HOS';

function handleEvents(bot: TelegramBot) {
  bot.onText(/\/luan_na_cozinha/, async (message) => {
    const { chat: { id } } = message;

    const name = 'Luan';

    await PersonModel.incrementCounter(name);
    const counter = await PersonModel.getCounter(name);
    const nicknames = await PersonModel.getNicknames(name);

    const nickname = sortName(nicknames);

    bot.sendMessage(id, `${nickname} foi na cozinha ${counter} vezes`)
  })

  bot.onText(/\/qnts_na_cozinha/, async (message) => {
    const { chat: { id } } = message;

    const name = 'Luan';

    const nicknames = await PersonModel.getNicknames(name);
    const counter = await PersonModel.getCounter(name);

    const nickname = sortName(nicknames);

    bot.sendMessage(id, `${nickname} foi na cozinha ${counter} vezes`)
  })

  bot.on('message', async (message) => {
    if (!message.from) {
      return
    }

    const name = 'Arthur';

    if (message.from.username === ARTHUR_USERNAME && message.forward_date) {
      await PersonModel.incrementCounter(name);
      const counter = await PersonModel.getCounter(name);

      bot.sendMessage(message.chat.id, `🙈 Ooops - ${counter}`)
    }
  })

  bot.onText(/\/qnts_macaco/, async (message) => {
    const { chat: { id } } = message;

    const name = 'Arthur';

    const counter = await PersonModel.getCounter(name);
    const nicknames = await PersonModel.getNicknames(name);

    const nickname = sortName(nicknames);

    bot.sendMessage(id, `${nickname} dividiu e compartilhou ${counter} vezes`)
  })
}

export default handleEvents;