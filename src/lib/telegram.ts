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

/** Get the public base URL for webhook (e.g. https://fueldropuz.vercel.app) */
export function getWebhookBaseUrl(requestUrl?: string | null): string | null {
  if (typeof process.env.TELEGRAM_WEBHOOK_URL === "string" && process.env.TELEGRAM_WEBHOOK_URL) {
    return process.env.TELEGRAM_WEBHOOK_URL.replace(/\/$/, "");
  }
  if (typeof process.env.VERCEL_URL === "string" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (requestUrl) {
    try {
      const u = new URL(requestUrl);
      return `${u.protocol}//${u.host}`;
    } catch {
      // ignore
    }
  }
  return null;
}

export async function setTelegramWebhook(token: string, webhookUrl: string): Promise<{ ok: boolean; description?: string }> {
  const res = await fetch(`${TELEGRAM_API}${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });
  const data = (await res.json()) as { ok?: boolean; description?: string };
  return { ok: !!data.ok, description: data.description };
}
