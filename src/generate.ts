import 'dotenv/config'
import { MessageGeneratorOpenAi } from "./infra/MessageGenerator/MessageGeneratorOpenAi";
async function main() {
  if(!process.env.OPEN_AI_API_KEY) {
    throw new Error('Missing OPEN_AI_API_KEY')
  }
  const apiKey = process.env.OPEN_AI_API_KEY

  if(!process.env.OPEN_AI_ARTHUR_SETUP) {
    throw new Error('Missing OPEN_AI_ARTHUR_SETUP')
  }
  const arthurSetupMessage = process.env.OPEN_AI_ARTHUR_SETUP

  if(!process.env.OPEN_AI_ARTHUR_ACTION) {
    throw new Error('Missing OPEN_AI_ARTHUR_ACTION')
  }

  const arthurActionMessage = process.env.OPEN_AI_ARTHUR_ACTION

  const generator = new MessageGeneratorOpenAi({
    apiKey,
    arthurSetupMessage,
    arthurActionMessage,
    fallbackMessage: 'Fallback'
  });
    const message = await generator.generateArthurMessage('soldado');
    console.log(message)
}

main()
  .catch(err => console.error(err))