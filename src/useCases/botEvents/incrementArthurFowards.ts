import { PersonModel } from "../../database/Entities/Person/Person";
import { CelebrationCalculator } from "../../entities/CelebrationCalculator";
import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import drawName from "../../names";

export class IncrementArthurFowards {
  static celebrationNumbers: number[] = [500, 666, 800, 1000, 2000];

  constructor(
    private messageDispatcher: MessageDispatcher,
    private celebrationCalculator: CelebrationCalculator,
    private model = PersonModel,
  ){

  }

  async execute(chatId: string | number) {
    const name = 'Arthur';

    await this.model.incrementCounter(name);
    const counter = await this.model.getCounter(name);
  
    const nicknames = await this.model.getNicknames(name);
    const nickname = drawName(nicknames);
  
    await this.messageDispatcher
      .sendMessage(chatId, `${nickname} dividiu e compartilhou ${counter} vezes`)
  
    let celebrationMessage: string | undefined;

    
    for(const number of IncrementArthurFowards.celebrationNumbers){
      if(counter === 656) {
        celebrationMessage = 'Caro monkey, favor apressar pra chegar nos 666, para curtirmos a festa em paz! Ass.: Bot Boêmio do Telegram 🎃'
        break;
      }
      const calculated = this.celebrationCalculator.calculate(counter, number);
      if(calculated){
        celebrationMessage =  calculated
        break;
      }
    }

    if(celebrationMessage) {
      await this.messageDispatcher.sendMessage(chatId, celebrationMessage)
    }
  }
}
