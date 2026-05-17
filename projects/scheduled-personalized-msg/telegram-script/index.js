require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(token);

async function sendMessage() {
  await bot.sendMessage(
    chatId,
    'Daily AI summary completed.'
  );
}

sendMessage();
