import { PersonModel } from "../../database/Entities/Person/Person";
import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { MessageGenerator } from "../../interfaces/MessageGenerator";
import drawName from "../../names";

export default class IncrementLuanAmouranth {
  constructor(
    private messageDispatcher: MessageDispatcher,
    private messageGenerator: MessageGenerator
  ){}

  async execute(chatId: string | number, channelUrl: string) {
    const name = 'Luan';

    await PersonModel.incrementCounterAmouranth(name);
    const counter = await PersonModel.getCounterAmouranth(name);
  
    const nicknames = await PersonModel.getNicknames(name);
    const nickname = drawName(nicknames);
    await this.messageDispatcher.sendMessage(
      chatId, `${nickname} dividiu e compartilhou ${counter} vezes`
    )

    const message = await this.messageGenerator.generateLuanAmouranthMessage(nickname, channelUrl);
    await this.messageDispatcher.sendMessage(
      chatId, message
    )
  }
}