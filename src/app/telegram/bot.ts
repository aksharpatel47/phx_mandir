import TelegramBot from "node-telegram-bot-api";

const botToken = process.env.TELEGRAM_BOT_TOKEN!;
const chatId = process.env.TELEGRAM_CHAT_ID!;

const bot = new TelegramBot(botToken, { polling: false });

export async function sendMessage(text: string) {
  try {
    await bot.sendMessage(chatId, text, { parse_mode: "MarkdownV2" });
  } catch (error) {
    console.error(error);
  }
}
