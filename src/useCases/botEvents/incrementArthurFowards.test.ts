import { CelebrationCalculator } from "../../entities/CelebrationCalculator";
import { CelebrationCalculatorFactory } from "../../entities/CelebrationCalculatorFactory";
import MessageGeneratorStatic from "../../infra/MessageGenerator/MessageGeneratorStatic";
import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { IncrementArthurFowards, IncrementArthurFowardsModel } from "./incrementArthurFowards";

class FakeMessageDispatcher implements MessageDispatcher {
  sendMessage = jest.fn()
}

class FakeModel implements IncrementArthurFowardsModel {
  counter = 0

  getCounter = jest.fn(async () => this.counter)
  getNicknames = jest.fn(async () => ['arthur'])
  incrementCounter = jest.fn(async () => {
    this.counter++
  })
}

describe('IncrementArthurFowards', () => {
  let incrementArthurFowards: IncrementArthurFowards;
  let messageDispatcher: FakeMessageDispatcher;
  let model: FakeModel;
  let messageGenerator: MessageGeneratorStatic
  let celebrationCalculator: CelebrationCalculator

  beforeEach(() => {
    messageDispatcher = new FakeMessageDispatcher();
    celebrationCalculator = CelebrationCalculatorFactory.make()
    model = new FakeModel();
    messageGenerator = new MessageGeneratorStatic();
    incrementArthurFowards = new IncrementArthurFowards(messageDispatcher, celebrationCalculator, messageGenerator, model)
  })

  it('should return missing ten celebration message', async () => {
    const number = 500;
    model.counter = 489;
    await incrementArthurFowards.execute(1);

    expect(messageDispatcher.sendMessage).toBeCalledTimes(3);
    expect(messageDispatcher.sendMessage).toBeCalledWith(1, `A essa altura espero que o role dos ${number} já tenha data, local e atrações confirmadas`);
  })

  it('should return missing ten percent celebration message', async () => {
    const number = 500;
    model.counter = 449;
    await incrementArthurFowards.execute(1);
    expect(messageDispatcher.sendMessage).toBeCalledTimes(3);
    expect(messageDispatcher.sendMessage).toBeCalledWith(1, `Quase nos ${number}, podem começar a marcar o churrasco, vai ser na casa de quem?`);
  })

  it('should send generated message', async () => {
    await incrementArthurFowards.execute(1);
    expect(messageDispatcher.sendMessage).toBeCalledTimes(2);
    expect(messageDispatcher.sendMessage).toBeCalledWith(1, `Valeu, cabo!`);
  })
})