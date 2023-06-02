import { PersonModel } from "../../database/Entities/Person/Person";
import { CelebrationCalculator } from "../../entities/CelebrationCalculator";
import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { MessageGenerator } from "../../interfaces/MessageGenerator";
import drawName from "../../names";

export interface IncrementArthurFowardsModel {
  getCounter(name: string): Promise<number>;
  getNicknames(name: string): Promise<string[]>
  incrementCounter(name: string): Promise<void>
}

export class IncrementArthurFowards {
  static celebrationNumbers: number[] = [500, 666, 800, 1000, 2000];

  constructor(
    private messageDispatcher: MessageDispatcher,
    private celebrationCalculator: CelebrationCalculator,
    private messageGenerator: MessageGenerator,
    private model: IncrementArthurFowardsModel = PersonModel,
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
  
    const celebrationMessage = this.getCelebrationMessage(counter);

    if(celebrationMessage) {
      await this.messageDispatcher.sendMessage(chatId, celebrationMessage)
    }

    const message = await this.messageGenerator.generateArthurMessage(nickname);
    await this.messageDispatcher.sendMessage(chatId, message);
  }

  private getCelebrationMessage(counter: number): string | undefined {
    for(const number of IncrementArthurFowards.celebrationNumbers){
      const calculated = this.celebrationCalculator.calculate(counter, number);
      if(calculated){
        return calculated
      }
    }
  }
}
