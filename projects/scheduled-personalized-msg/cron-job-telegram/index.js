require('dotenv').config();

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

async function sendMessage() {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: TEST_MESSAGE
    })
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.description || `Telegram API failed with ${response.status}`);
  }
}

sendMessage().catch((error) => {
  const details = error.message || error;
  console.error('Failed to send Telegram message:', details);
  process.exit(1);
});
