import TelegramBot from 'node-telegram-bot-api';


function createBot(token: string): TelegramBot {
  const bot = new TelegramBot(token, {
    polling: true
  })

  return bot;
}

export default createBot;