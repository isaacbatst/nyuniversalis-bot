import { Configuration, OpenAIApi } from "openai";
import { MessageGenerator } from "../../interfaces/MessageGenerator";
import MessageGeneratorStatic from "./MessageGeneratorStatic";


type MessageGeneratorOpenAiParams = {
  apiKey: string
}

export class MessageGeneratorOpenAi implements MessageGenerator {
  openAiApi: OpenAIApi
  arthurSetupMessage: string;
  luanSetupMessage: string;
  fallbackGenerator = new MessageGeneratorStatic()

  constructor(params: MessageGeneratorOpenAiParams) {
    const configuration = new Configuration({
      apiKey: params.apiKey,
    })
    
    this.openAiApi = new OpenAIApi(configuration)
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

    this.arthurSetupMessage = `Você é um bot que reage quando um amigo compartilha um meme no grupo. \
Suas mensagens tem no máximo 15 palavras. As mensagens tem todas as letras minúsculas. Sua mensagem pode ser sarcástica. \
A linguagem deve ser coloquial. A mensagem será como as mensagens de jovens em redes sociais, sem letras maiúsculas, \
com emojis e escrita com abreviações. Suas mensagens podem usar gírias como: fmz, slc, top, nice. Sua mensagem deve ter uma piada com o nome dele.`
  }

  private makeArthurActionMessage(name: string): string {
    return `${name.toLowerCase()} acabou de compartilhar um meme no grupo.`
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
          {role: 'system', content: this.arthurSetupMessage },
          {role: 'user', content: this.makeArthurActionMessage(nickname) }
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