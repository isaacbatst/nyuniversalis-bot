import { MessageGenerator } from "../../interfaces/MessageGenerator";

export default class MessageGeneratorStatic implements MessageGenerator {
  generateArthurMessage(): Promise<string> {
    return Promise.resolve('Valeu, cabo!');
  }
}