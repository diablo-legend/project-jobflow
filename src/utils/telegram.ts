const TELEGRAM_BOT_TOKEN = '7981000787:AAF6y9Ka8sbDTPCSC9YRyMIsm2xW3ZrhPbw';

export async function sendToTelegram(message: string, files: File[]) {
  const chatId = localStorage.getItem('telegram_chat_id') || '1486835865';
  
  try {
    // Сначала отправляем текстовое сообщение
    const messageResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!messageResponse.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    // Затем отправляем каждый файл
    for (const file of files) {
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('document', file);

      const fileResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: formData,
      });

      if (!fileResponse.ok) {
        throw new Error(`Failed to send file ${file.name} to Telegram`);
      }
    }

    return true;
  } catch (error) {
    console.error('Error sending data to Telegram:', error);
    throw error;
  }
}