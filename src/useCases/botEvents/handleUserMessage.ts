import TelegramBot from "node-telegram-bot-api";
import { IncrementArthurFowards } from "./incrementArthurFowards";
import IncrementLuanAmouranth from "./incrementLuanAmouranth";
import IncrementIrineuCounter from "./incrementIrineuCounter";
import { AnswerReply } from "./AnswerReply";
import { CircularQueue } from "../../entities/Queue/CircularQueue";

const ARTHUR_USERNAME = "Arthur_HOS";
const IRINEU_USERNAME = "irimeu";
const LUAN_FIRST_NAME = "Luamboru";
const BOT_USERNAME = process.env.BOT_USERNAME ?? "nyuniversalis_bot";

let lastMessageDate: number | undefined;

const maxMessages = 50;
const messages = new CircularQueue<{ from: string; text: string }>(maxMessages);

export const handleUserMessage = async (
  message: TelegramBot.Message,
  incrementArthurFowards: IncrementArthurFowards,
  incrementLuanAmourant: IncrementLuanAmouranth,
  incrementIrineuCounter: IncrementIrineuCounter,
  answerReply: AnswerReply
) => {
  if (!message.from) {
    return;
  }
  if (lastMessageDate === message.date) {
    return;
  }
  lastMessageDate = message.date;
  // log message info
  console.log(message);

  if (message.text) {
    messages.enqueue({
      from: message.from.username ?? message.from.first_name,
      text: message.text,
    });
  }

  if (message.reply_to_message?.from?.username === BOT_USERNAME) {
    const answer = await answerReply.execute(
      message.chat.id,
      {
        from: message.from.first_name,
        text: message.text,
        previousText: message.reply_to_message.text!,
      },
      messages.items()
    );
    messages.enqueue({
      from: BOT_USERNAME,
      text: answer,
    })
  }

  if (
    message.from.username === IRINEU_USERNAME &&
    message.sticker &&
    (message.sticker.set_name === "AcervoPicaPau" || message.sticker.set_name === "picapaupic")
  ) {
    return incrementIrineuCounter.execute(message.chat.id);
  }

  if (message.from.username === ARTHUR_USERNAME && message.forward_date) {
    const forwardFrom =
      message.forward_from_chat?.title ??
      message.forward_from_chat?.username ??
      `${message.forward_from?.first_name} ${message.forward_from?.last_name}` ??
      message.forward_from?.username;
    return incrementArthurFowards.execute(message.chat.id, forwardFrom);
  }

  if (
    message.text?.includes("https://www.twitch.tv") &&
    message.from.first_name === LUAN_FIRST_NAME
  ) {
    const channelUrl = message.text
      .split(" ")
      .find((word) => word.includes("https://www.twitch.tv/"));
    return incrementLuanAmourant.execute(message.chat.id, channelUrl!);
  }
};
