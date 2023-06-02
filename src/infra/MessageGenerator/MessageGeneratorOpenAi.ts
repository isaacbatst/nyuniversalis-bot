import { Configuration, OpenAIApi } from "openai";
import { MessageGenerator } from "../../interfaces/MessageGenerator";
import MessageGeneratorStatic from "./MessageGeneratorStatic";


type MessageGeneratorOpenAiParams = {
  apiKey: string
}

export class MessageGeneratorOpenAi implements MessageGenerator {
  openAiApi: OpenAIApi
  arthurActionMessage: string;
  luanSetupMessage: string;
  fallbackGenerator = new MessageGeneratorStatic()

  constructor(params: MessageGeneratorOpenAiParams) {
    const configuration = new Configuration({
      apiKey: params.apiKey,
    })
    
    this.openAiApi = new OpenAIApi(configuration)
    this.arthurActionMessage = 'Um amigo acabou de compartilhar um meme, reaja a ele.'
    this.luanSetupMessage = "Você é um bot imitando um jovem conversando em redes sociais. "
+ "Você responde quando um amigo compartilha um canal de uma streamer e faz uma piada sarcástica com o conteúdo dela. " 
+ "Suas respostas tem TODAS características a seguir:" 
+ " - No máximo 15 palavras. \n"
+ " - Tem todas as letras minúsculas. \n"
+ " - Usa emojis e palavras abreviadas, como os jovens conversam em redes sociais. \n"
+ " - Usa gírias como: 'fmz', 'slc', 'top', 'nice'. \n"
+ " - Não usa hashtags. \n"
+ " - Não usa # \n"
+ " - Chama amigo pelo nome dele."
+ " - Tem uma referência ao conteúdo da stream que foi compartilhada."
  }

  private makeArthurSetupMessage(name: string): string {
    return `Você é um bot que reage quando um amigo compartilha algo no grupo. \
Suas mensagens tem apenas uma ou duas frases, com tom humorístico, elas não tem letras maiúsculas e tem 50% de chance de serem sarcásticas. \
A linguagem deve ser coloquial. A mensagem será como as mensagens de jovens em redes sociais, sem letras maiúsculas, \
com emojis e escrita com abreviações. Suas mensagens usam gírias como: fmz, slc, top, nice. \
Chame o autor do meme de ${name.toLowerCase()}`
  }

  private makeLuanActionMessage(name: string, channelUrl: string): string {
    return `${name.toLowerCase()}: ${channelUrl}`
  }

  async generateLuanAmouranthMessage(nickname: string, channelUrl: string): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1.2,
        messages: [
          {role: 'system', content: this.luanSetupMessage },
          {role: 'user', content: this.makeLuanActionMessage(nickname, channelUrl) }
        ],
        max_tokens: 50,
      })
  
      const [firstChoice] = data.choices
  
      if(!firstChoice.message) {
        throw new Error('Error generating message')
      }
  
      return firstChoice.message.content
    } catch (err) {
      return this.fallbackGenerator.generateLuanAmouranthMessage()
    }
  }

  async generateArthurMessage(nickname: string): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        messages: [
          {role: 'system', content: this.makeArthurSetupMessage(nickname) },
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
      return this.fallbackGenerator.generateArthurMessage()
    }
  }
}