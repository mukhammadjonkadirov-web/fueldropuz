/**
 * Telegram Bot API helpers.
 * Used for order notifications (existing) and webhook command replies.
 */

const TELEGRAM_API = "https://api.telegram.org/bot";

export function getBotToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN ?? null;
}

export type ReplyMarkup =
  | {
      inline_keyboard: Array<
        Array<{
          text: string;
          url?: string;
          web_app?: { url: string };
          callback_data?: string;
        }>
      >;
    }
  | {
      keyboard: Array<Array<{ text: string }>>;
      resize_keyboard?: boolean;
      is_persistent?: boolean;
    };

export type SendMessageParams = {
  chat_id: number | string;
  text: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  reply_markup?: ReplyMarkup;
};

export async function sendTelegramMessage(
  token: string,
  params: SendMessageParams
): Promise<{ ok: boolean; result?: unknown; description?: string }> {
  const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}
