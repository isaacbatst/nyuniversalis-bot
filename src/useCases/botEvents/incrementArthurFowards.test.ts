import { PersonModel } from "../../database/Entities/Person/Person";
import { incrementArthurFowards } from "./incrementArthurFowards"

jest.mock('../../database/Entities/Person/Person')

class FakeMessageDispatcher {
  sendMessage = jest.fn(async (chatId: string | number, message: string) => {
    console.log(`Faker sending to: ${chatId}`);
    console.log(`Message: ${message}`);
  })
}

const message = {
  chat: {
    id: 1
  }
}

it('should return missing ten celebration message', async () => {
  const number = 500;
  const messageDispatcher = new FakeMessageDispatcher();
  PersonModel.getCounter = jest.fn().mockResolvedValue(490);
  PersonModel.getNicknames = jest.fn().mockResolvedValue(['arthur']);
  await incrementArthurFowards(message, messageDispatcher);

  expect(messageDispatcher.sendMessage).toBeCalledTimes(2);
  expect(messageDispatcher.sendMessage).toBeCalledWith(message.chat.id, `A essa altura espero que o role dos ${number} já tenha data, local e atrações confirmadas`);

})

it('should return missing ten percent celebration message', async () => {
  const number = 500;
  const messageDispatcher = new FakeMessageDispatcher();
  PersonModel.getCounter = jest.fn().mockResolvedValue(450);
  PersonModel.getNicknames = jest.fn().mockResolvedValue(['arthur']);
  await incrementArthurFowards(message, messageDispatcher);

  expect(messageDispatcher.sendMessage).toBeCalledTimes(2);
  expect(messageDispatcher.sendMessage).toBeCalledWith(message.chat.id, `Quase nos ${number}, podem começar a marcar o churrasco, vai ser na casa de quem?`);

})