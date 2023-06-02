import { Configuration, OpenAIApi } from "openai";
import { MessageGenerator } from "../../interfaces/MessageGenerator";


type MessageGeneratorOpenAiParams = {
  apiKey: string
  fallbackMessage: string
}

export class MessageGeneratorOpenAi implements MessageGenerator {
  openAiApi: OpenAIApi
  fallbackMessage: string
  arthurActionMessage: string

  constructor(params: MessageGeneratorOpenAiParams) {
    const configuration = new Configuration({
      apiKey: params.apiKey,
    })
    
    this.openAiApi = new OpenAIApi(configuration)
    this.fallbackMessage = params.fallbackMessage
    this.arthurActionMessage = 'Um amigo acabou de compartilhar um meme, reaja a ele.'
  }

  makeSetupMessage(name: string): string {
    return `Você é um bot que reage quando um amigo compartilha algo no grupo. \
Suas mensagens tem apenas uma ou duas frases, com tom humorístico, elas não tem letras maiúsculas e tem 50% de chance de serem sarcásticas. \
A linguagem deve ser coloquial. A mensagem terá será como mensagens de jovens em redes sociais, sem letras maiúsculas, \
com emojis e escrita com abreviações. Suas mensagens usam gírias como: fmz, slc, top, nice. \
Chame o autor do meme de ${name}`
  }

  async generateArthurMessage(name: string): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        messages: [
          {role: 'system', content: this.makeSetupMessage(name) },
          {role: 'system', content: this.arthurActionMessage }
        ],
        max_tokens: 50,
      })
  
      const [firstChoice] = data.choices
  
      if(!firstChoice.message) {
        throw new Error('Error generating message')
      }
  
      return firstChoice.message.content
    } catch (err) {
      console.error(err)
      return this.fallbackMessage
    }
  }
}