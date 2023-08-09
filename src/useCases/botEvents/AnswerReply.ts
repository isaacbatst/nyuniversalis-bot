import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { MessageGenerator } from "../../interfaces/MessageGenerator";

export class AnswerReply {
  constructor(
    private messageDispatcher: MessageDispatcher, 
    private messageGenerator: MessageGenerator
  ) {}

  async execute(chatId: string | number, message: {text?: string, from: string, previousText: string}) {
    const answer = await this.messageGenerator.generateAnswer(message)
    this.messageDispatcher.sendMessage(chatId, answer)
  }
}