export interface MessageGenerator {
  generateArthurMessage(nickname: string): Promise<string>
}