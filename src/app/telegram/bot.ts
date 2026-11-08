import { Api } from "node-telegram-bot-api";

export async function sendMessage(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    throw new Error("Registration delivery is not configured.");
  }
  const api = new Api(botToken);
  await api.sendMessage({ chat_id: chatId, text, parse_mode: "MarkdownV2" });
}
