import createBot from './bot';
import handleEvents from './useCases/botEvents';
import ENV from './env';


try {
  const token = ENV.BOT_TOKEN;
  
  if(token){
    const bot = createBot(token);
    handleEvents(bot);
  }
  
} catch (error) {
  console.log(error)
}


