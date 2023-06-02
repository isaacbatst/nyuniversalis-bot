export interface MessageGenerator {
  generateArthurMessage(nickname: string): Promise<string>
  generateLuanAmouranthMessage(nickname: string, channelUrl: string): Promise<string>
}