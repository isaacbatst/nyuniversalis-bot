import { PersonModel } from "../../database/Entities/Person/Person";
import { CelebrationCalculatorFactory } from "../../entities/CelebrationCalculatorFactory";
import { MessageDispatcher } from "../../interfaces/MessageDispatcher";
import { IncrementArthurFowards } from "./incrementArthurFowards";

jest.mock('../../database/Entities/Person/Person')

class FakeMessageDispatcher implements MessageDispatcher {
  sendMessage = jest.fn(async (chatId: string | number, message: string) => {
    console.log(`Faker sending to: ${chatId}`);
    console.log(`Message: ${message}`);
  })
}

it('should return missing ten celebration message', async () => {
  const number = 500;
  const messageDispatcher = new FakeMessageDispatcher();
  PersonModel.getCounter = jest.fn().mockResolvedValue(490);
  PersonModel.getNicknames = jest.fn().mockResolvedValue(['arthur']);

  const celebrationCalculator = CelebrationCalculatorFactory.make()
  const incrementArthurFowards = new IncrementArthurFowards(messageDispatcher, celebrationCalculator)
  await incrementArthurFowards.execute(1);

  expect(messageDispatcher.sendMessage).toBeCalledTimes(2);
  expect(messageDispatcher.sendMessage).toBeCalledWith(1, `A essa altura espero que o role dos ${number} já tenha data, local e atrações confirmadas`);

})

it('should return missing ten percent celebration message', async () => {
  const number = 500;
  const messageDispatcher = new FakeMessageDispatcher();
  PersonModel.getCounter = jest.fn().mockResolvedValue(450);
  PersonModel.getNicknames = jest.fn().mockResolvedValue(['arthur']);

  const celebrationCalculator = CelebrationCalculatorFactory.make()
  const incrementArthurFowards = new IncrementArthurFowards(messageDispatcher, celebrationCalculator)
  await incrementArthurFowards.execute(1);

  expect(messageDispatcher.sendMessage).toBeCalledTimes(2);
  expect(messageDispatcher.sendMessage).toBeCalledWith(1, `Quase nos ${number}, podem começar a marcar o churrasco, vai ser na casa de quem?`);

})

it('should return missing 10 to 666 celebration message', async () => {
  const messageDispatcher = new FakeMessageDispatcher();
  PersonModel.getCounter = jest.fn().mockResolvedValue(656);
  PersonModel.getNicknames = jest.fn().mockResolvedValue(['arthur']);

  const celebrationCalculator = CelebrationCalculatorFactory.make()
  const incrementArthurFowards = new IncrementArthurFowards(messageDispatcher, celebrationCalculator)
  await incrementArthurFowards.execute(1);

  expect(messageDispatcher.sendMessage).toBeCalledTimes(2);
  expect(messageDispatcher.sendMessage).toBeCalledWith(1, `Caro monkey, favor apressar pra chegar nos 666, para curtirmos a festa em paz! Ass.: Bot Boêmio do Telegram 🎃`);

})