export interface MessageGenerator {
  generateArthurMessage(): Promise<string>
}