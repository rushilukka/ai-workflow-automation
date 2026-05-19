require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { TEST_MESSAGE } = require('./CONSTANTS');

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

if (!token) {
  throw new Error('BOT_TOKEN is required');
}

if (!chatId) {
  throw new Error('CHAT_ID is required');
}

const bot = new TelegramBot(token);

async function sendMessage() {
  await bot.sendMessage(chatId, TEST_MESSAGE);
}

sendMessage().catch((error) => {
  console.error('Failed to send Telegram message:', error);
  process.exit(1);
});
