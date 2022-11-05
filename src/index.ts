import createBot from './bot';
import { connect } from './database';
import { BOT_TOKEN } from './env';
import handleEvents from './useCases/botEvents';
import { PersonModel } from './database/Entities/Person/Person';

try {
  main();
} catch (error) {
  console.log(error)
}

async function main() {
  if (BOT_TOKEN) {
    connect();

    const bot = createBot(BOT_TOKEN);
    handleEvents(bot);
  }
}


