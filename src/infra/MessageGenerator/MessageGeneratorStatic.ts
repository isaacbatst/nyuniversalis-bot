import { MessageGenerator } from "../../interfaces/MessageGenerator";

export default class MessageGeneratorStatic implements MessageGenerator {
  generateAnswer(message: { text?: string | undefined; from: string; previousText: string; }): Promise<string> {
    throw new Error("Method not implemented.");
  }
  generateArthurMessage(): Promise<string> {
    return Promise.resolve('Valeu, cabo!');
  }

  generateLuanAmouranthMessage(): Promise<string> {
    return Promise.resolve(':furry:');
  }

  generateIrineuMessage(): Promise<string> {
    return Promise.resolve('obrigado por nos agraciar com seus stickers pela zilhonezima vez');
  }
}