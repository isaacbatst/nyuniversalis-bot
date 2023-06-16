import { PersonModel } from "../../database/Entities/Person/Person";
import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { MessageGenerator } from "../../interfaces/MessageGenerator";
import drawName from "../../names";

export default class IncrementIrineuCounter {
  constructor(
    private messageDispatcher: MessageDispatcher,
    private messageGenerator: MessageGenerator
  ){}

  async execute(chatId: string | number) {
    const name = 'Irineu';
    await PersonModel.incrementCounter(name);
    const counter = await PersonModel.getCounter(name);
    const nicknames = await PersonModel.getNicknames(name);
    const nickname = drawName(nicknames);
    const message = await this.messageGenerator.generateIrineuMessage(nickname, counter);
    await this.messageDispatcher.sendMessage(
      chatId, message
    )
  }
}