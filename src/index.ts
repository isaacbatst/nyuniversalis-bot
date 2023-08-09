import { TelegramBotMessageDispatchAdapter } from './adapters/TelegramBotMessageDispatcherAdapter';
import createBot from './bot';
import { connect } from './database';
import { CelebrationCalculatorFactory } from './entities/CelebrationCalculatorFactory';
import { BOT_TOKEN, OPEN_AI_API_KEY } from './env';
import { MessageGeneratorOpenAi } from './infra/MessageGenerator/MessageGeneratorOpenAi';
import setupEventListeners from './useCases/botEvents';
import { AnswerReply } from './useCases/botEvents/AnswerReply';
import { IncrementArthurFowards } from './useCases/botEvents/incrementArthurFowards';
import IncrementIrineuCounter from './useCases/botEvents/incrementIrineuCounter';
import IncrementLuanAmouranth from './useCases/botEvents/incrementLuanAmouranth';

try {
  main();
} catch (error) {
  console.log(error)
}

async function main() {
  if(!BOT_TOKEN) {
    throw new Error('Missing BOT_TOKEN')
  }
  if(!OPEN_AI_API_KEY) {
    throw new Error('Missing OPEN_AI_API_KEY')
  }

  const bot = createBot(BOT_TOKEN);
  const messageDispatcher = new TelegramBotMessageDispatchAdapter(bot)
  const celebrationCalculator = CelebrationCalculatorFactory.make();
  const generator = new MessageGeneratorOpenAi({
    apiKey: OPEN_AI_API_KEY,
  });
  const incrementArthurFowards = new IncrementArthurFowards(messageDispatcher, celebrationCalculator, generator)
  const incrementLuanAmourant = new IncrementLuanAmouranth(messageDispatcher, generator)
  const incrementIrineuCounter = new IncrementIrineuCounter(messageDispatcher, generator)
  const answerReply = new AnswerReply(messageDispatcher, generator)
  connect();
  setupEventListeners(
    bot,
    incrementArthurFowards,
    incrementLuanAmourant,
    incrementIrineuCounter,
    answerReply
  );
}


