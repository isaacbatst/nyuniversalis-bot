import createBot from './bot';
import handleEvents from './useCases/botEvents';
import { BOT_TOKEN } from './env';
import { connect } from './database';


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


