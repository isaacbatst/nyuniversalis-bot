import TelegramBot from "node-telegram-bot-api";
import { PersonModel } from "../../database/Entities/Person/Person";
import drawName from "../../names";

const celebrationNumbers: number[] = [500, 1000, 2000];

const differenceTenMessage = (number: number) => `A essa altura espero que o role dos ${number} já tenha data, local e atrações confirmadas`
const differenceTenPercentMessage = (number: number) => `Quase nos ${number}, podem começar a marcar o churrasco, vai ser na casa de quem?`

export const incrementArthurFowards = async (message: TelegramBot.Message, bot: TelegramBot) => {
  const name = 'Arthur';

  await PersonModel.incrementCounter(name);
  const counter = await PersonModel.getCounter(name);

  const nicknames = await PersonModel.getNicknames(name);
  const nickname = drawName(nicknames);

  const celebrationMessage = celebrationNumbers.reduce<string | null>((acc, number) => {
    if(acc) return acc;

    const isDifferenceTenPercent = (number - counter) === (number * 0.1);
    
    if(isDifferenceTenPercent){
      return differenceTenPercentMessage(number)
    }

    const isDifferenceTen = (number - counter) === 10;

    if(isDifferenceTen) {
      return differenceTenMessage(number)
    }

    return null;
  }, null)

  await bot.sendMessage(message.chat.id, `${nickname} dividiu e compartilhou ${counter} vezes`)

  if(celebrationMessage) {
    await bot.sendMessage(message.chat.id, celebrationMessage)
  }
}