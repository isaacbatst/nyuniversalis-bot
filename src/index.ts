import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import createBot from './bot';
import sortName from './names';

dotenv.config();

let counter = parseInt(process.env.INITIAL_VALUE || "0");

try {
  const token = process.env.BOT_TOKEN;
  
  if(token){
    const bot = createBot(token);
    handleEvents(bot);
  }
  
} catch (error) {
  console.log(error)
}

function handleEvents(bot: TelegramBot){
  bot.onText(/\/foi_denovo/, (message) => {
    console.log('oi')
    const { chat: { id } } = message;

    counter += 1;

    const name = sortName();

    bot.sendMessage(id, `${name} foi na cozinha ${counter} vezes`)
  })
}

