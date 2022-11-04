import TelegramBot from "node-telegram-bot-api";
import { MessageDispatcher } from "../interfaces/MessageDispatcher";

export class TelegramBotMessageDispatchAdapter implements MessageDispatcher {
  constructor(private bot: TelegramBot){}

  async sendMessage(chatId: string | number, message: string): Promise<void> {
    await this.bot.sendMessage(chatId, message)
  }
}