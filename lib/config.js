// Public site URL (used for Open Graph images and Telegram photo links)
export const BASE_URL = 'https://avinox.uz/';

// Admin Telegram chat IDs that receive website requests
export const CHAT_IDS = ['6550264522', '943969214'];

// Sends one message to every admin chat through the /api/telegram route
export async function sendToTelegram({ text, photo }) {
  for (const chatId of CHAT_IDS) {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, photo, parse_mode: 'HTML' }),
    });
    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.description || result.message || 'Failed to send message');
    }
  }
}
