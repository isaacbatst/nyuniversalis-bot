import TelegramBot from "node-telegram-bot-api";
import ENV, { NAMES } from '../env';
import sortName from "../names";

let luanCounter = ENV.LUAN_VALUE;
let arthurCounter = ENV.ARTHUR_VALUE;

const ARTHUR_USERNAME = 'Arthur_HOS';

function handleEvents(bot: TelegramBot){
  bot.onText(/\/luan_na_cozinha/, (message) => {
    const { chat: { id } } = message;

    luanCounter += 1;

    const name = sortName(NAMES.luan);

    bot.sendMessage(id, `${name} foi na cozinha ${luanCounter} vezes`)
  })

  bot.onText(/\/qnts_na_cozinha/, (message) => {
    const { chat: { id } } = message;

    const name = sortName(NAMES.luan);

    bot.sendMessage(id, `${name} foi na cozinha ${luanCounter} vezes`)
  })

  bot.on('message', (message) => {
    if(!message.from){
      return
    }

    
    if(message.from.username === ARTHUR_USERNAME && message.forward_date){
      arthurCounter += 1
      bot.sendMessage(message.chat.id, `🙈 Ooops - ${arthurCounter}`)
    }
  })

  bot.onText(/\/qnts_macaco/, (message) => {
    const { chat: { id } } = message;

    const name = sortName(NAMES.arthur);

    bot.sendMessage(id, `${name} dividiu e compartilhou ${arthurCounter} vezes`)
  })
}

export default handleEvents;