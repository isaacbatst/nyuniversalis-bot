import createBot from './bot';
import { connect } from './database';
import { ARTHUR_FALLBACK_MESSAGE, BOT_TOKEN, LUAN_FALLBACK_MESSAGE, OPEN_AI_API_KEY } from './env';
import setupEventListeners from './useCases/botEvents';
import { PersonModel } from './database/Entities/Person/Person';
import { TelegramBotMessageDispatchAdapter } from './adapters/TelegramBotMessageDispatcherAdapter';
import bot from './bot';
import { CelebrationCalculatorFactory } from './entities/CelebrationCalculatorFactory';
import { MessageGeneratorOpenAi } from './infra/MessageGenerator/MessageGeneratorOpenAi';
import { IncrementArthurFowards } from './useCases/botEvents/incrementArthurFowards';
import IncrementLuanAmouranth from './useCases/botEvents/incrementLuanAmouranth';
import IncrementIrineuCounter from './useCases/botEvents/incrementIrineuCounter';

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
  connect();
  setupEventListeners(bot, incrementArthurFowards, incrementLuanAmourant, incrementIrineuCounter);
}


