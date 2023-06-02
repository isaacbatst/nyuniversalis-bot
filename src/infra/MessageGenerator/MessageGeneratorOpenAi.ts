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
    this.luanSetupMessage = "Você é um bot que reage quando um amigo compartilha um canal de uma streamer. Sua reação é uma mensagem curta "
+ ", com no máximo 15 palavras. A mensagem não terá letras maiúsculas. A mensagem tem 20% de chance de ser sarcástica."
+ "A linguagem deve ser coloquial. A mensagem terá será como mensagens de jovens em redes sociais, sem letras maiúsculas,"
+ "com emojis, sem acentos ortográficos e escrita com abreviações."
  }

  private makeArthurSetupMessage(name: string): string {
    return `Você é um bot que reage quando um amigo compartilha algo no grupo. \
Suas mensagens tem apenas uma ou duas frases, com tom humorístico, elas não tem letras maiúsculas e tem 50% de chance de serem sarcásticas. \
A linguagem deve ser coloquial. A mensagem será como as mensagens de jovens em redes sociais, sem letras maiúsculas, \
com emojis e escrita com abreviações. Suas mensagens usam gírias como: fmz, slc, top, nice. \
Chame o autor do meme de ${name}`
  }

  private makeLuanActionMessage(name: string, channelUrl: string): string {
    return `Um amigo acaba compartilhar esse canal ${channelUrl} sua mensagem deve fazer referência ao tipo de conteúdo dele. \
Chame o autor do post de ${name}.`
  }

  async generateLuanAmouranthMessage(nickname: string, channelUrl: string): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        messages: [
          {role: 'system', content: this.luanSetupMessage },
          {role: 'system', content: this.makeLuanActionMessage(nickname, channelUrl) }
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