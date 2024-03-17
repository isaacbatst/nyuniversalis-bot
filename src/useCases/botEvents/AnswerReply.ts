import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { MessageGenerator } from "../../interfaces/MessageGenerator";

export class AnswerReply {
  constructor(
    private messageDispatcher: MessageDispatcher, 
    private messageGenerator: MessageGenerator
  ) {}

  async execute(chatId: string | number, message: {text?: string, from: string, previousText: string}, previousMessages: {
    from: string;
    text: string;
  }[]) {
    const answer = await this.messageGenerator.generateAnswer(message, previousMessages)
    this.messageDispatcher.sendMessage(chatId, answer)
    return answer
  }
}