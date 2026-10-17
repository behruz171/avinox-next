import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { chat_id, text, photo, parse_mode } = await req.json();

    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json({ error: 'BOT_TOKEN is not configured' }, { status: 500 });
    }

    if (photo) {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          photo,
          caption: text,
          parse_mode: parse_mode || 'HTML',
        }),
      });
      const data = await response.json();
      return NextResponse.json(data);
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: parse_mode || 'HTML',
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
