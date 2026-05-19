require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { TEST_MESSAGE } = require('./CONSTANTS');

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

if (!token) {
  console.error('BOT_TOKEN is required. Add it as a GitHub Actions repository secret.');
  process.exit(1);
}

if (!chatId) {
  console.error('CHAT_ID is required. Add it as a GitHub Actions repository secret.');
  process.exit(1);
}

const bot = new TelegramBot(token);

async function sendMessage() {
  await bot.sendMessage(chatId, TEST_MESSAGE);
}

sendMessage().catch((error) => {
  const details = error.response?.body || error.message || error;
  console.error('Failed to send Telegram message:', details);
  process.exit(1);
});
