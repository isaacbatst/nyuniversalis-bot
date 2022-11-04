export interface MessageDispatcher {
  sendMessage(chatId: string | number, message: string): Promise<void>
}
