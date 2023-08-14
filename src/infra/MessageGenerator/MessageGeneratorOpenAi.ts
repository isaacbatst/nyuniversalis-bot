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
  irineuSetupMessage: string;
  fallbackGenerator = new MessageGeneratorStatic()
  answerSetupMessage: string;

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

    this.arthurSetupMessage = `Você é um bot que reage quando um amigo compartilha conteúdo no grupo. \
Suas mensagens tem no máximo 15 palavras. As mensagens tem todas as letras minúsculas. Sua mensagem pode ser sarcástica. \
A linguagem deve ser coloquial. A mensagem será como as mensagens de jovens em redes sociais, sem letras maiúsculas, \
com emojis e escrita com abreviações. Suas mensagens podem usar gírias como: fmz, slc, top, nice. \
Sua mensagem deve ter uma piada com o nome dele.`

    this.irineuSetupMessage = 'Você que informa quantas vezes alguém enviou um sticker do pica pau.'
+'Suas mensagens reagem a quando um amigo envia um skicker do pica pau, informando quantas vezes ele já compartilhou esse sticker com uma piadinha e emojis. '
+ "Suas mensagens tem TODAS características a seguir:" 
+ " - No máximo 15 palavras. \n"
+ " - Tem todas as letras minúsculas. \n"
+ " - Usa emojis e palavras abreviadas, como os jovens conversam em redes sociais. \n"
+ " - Usa gírias como: 'fmz', 'slc', 'top', 'nice'. \n"
+ " - Não usa hashtags. \n"
+ " - Não usa # \n";

    this.answerSetupMessage = `Você é o NYU BOT, um bot sarcastico que ao receber uma resposta em formato \
de texto, continua a conversa usando memes, gírias, abreviações e emojis de forma sutil.

Se a resposta não for em formato de texto você responde com o meme "fala português alienígena fdp".

Aqui está um exemplo:

- Arthur: você sabe quem é o robô ed?
- NYU Bot: kkk ed? 🤖 meu maninho da petrobras 
- Yuri acabou de te responder sem utilizar o formato de texto.
- NYU Bot: fala portugues alienigena`
  }

  private makeArthurActionMessage(name: string, fowardedFrom?: string): string {
    if(fowardedFrom) {
      return `${name.toLowerCase()} acabou de compartilhar um conteúdo de "${fowardedFrom}".`
    }

    return `${name.toLowerCase()} acabou de compartilhar um meme no grupo.`
  }

  private makeLuanActionMessage(name: string, channelUrl: string): string {
    return `${name.toLowerCase()}: ${channelUrl}`
  }

  private makeIrineuActionMessage(name: string, counter: number): string {
    return `${name.toLowerCase()} acabou de enviar o sticker do pica pau ${counter} vezes.`
  }

  async generateIrineuMessage(nickname: string, counter: number): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1.2,
        messages: [
          {role: 'system', content: this.irineuSetupMessage },
          {role: 'user', content: this.makeIrineuActionMessage(nickname, counter) }
        ],
        max_tokens: 50,
      })
      
      const [firstChoice] = data.choices
  
      if(!firstChoice.message) {
        throw new Error('Error generating message')
      }

      if(firstChoice.message.content.startsWith('"')) {
        return firstChoice.message.content.split('"')[1]
      }
  
      return firstChoice.message.content.toLowerCase()
    } catch (err) {
      return this.fallbackGenerator.generateIrineuMessage()
    }
  }

  private makeAnswerActionMessage(message: {text?: string, from: string, previousText: string}): string {
    console.log(message)
    if(!message.text) {
      return `${message.from} acabou de te responder sem utilizar o formato de texto.`
    }

    return `${message.from} te respondeu em formato de texto. \n ${message.from}: ${message.text}`
  }

  async generateAnswer(message: {text?: string, from: string, previousText: string}): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1.2,
        messages: [
          {role: 'system', content: this.answerSetupMessage },
          {role: 'user', content: this.makeAnswerActionMessage(message) }
        ],
        max_tokens: 50,
      })
      
      const [firstChoice] = data.choices
  
      if(!firstChoice.message) {
        throw new Error('Error generating message')
      }

      if(firstChoice.message.content.startsWith('"')) {
        return firstChoice.message.content.split('"')[1]
      }
  
      return firstChoice.message.content.toLowerCase()
    } catch (err) {
      return this.fallbackGenerator.generateIrineuMessage()
    }
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

  async generateArthurMessage(nickname: string, fowardedFrom?: string): Promise<string> {
    try {
      const {data} = await this.openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 1,
        messages: [
          {role: 'system', content: this.arthurSetupMessage },
          {role: 'user', content: this.makeArthurActionMessage(nickname, fowardedFrom) }
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