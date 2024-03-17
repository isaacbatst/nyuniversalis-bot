export interface MessageGenerator {
  generateArthurMessage(nickname: string, fowardedFrom?: string): Promise<string>
  generateLuanAmouranthMessage(nickname: string, channelUrl: string): Promise<string>
  generateIrineuMessage(nickname: string, counter: number): Promise<string>
  generateAnswer(message: {text?: string, from: string, previousText: string}, previousMessages: {
    from: string;
    text: string;
  }[]): Promise<string>
}