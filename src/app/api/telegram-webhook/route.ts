/**
 * Telegram Bot webhook — command handlers and Reply Keyboard.
 *
 * Commands work only after the webhook is registered. Open in a browser once:
 *   https://your-domain.com/api/telegram-webhook?action=set
 * (On Vercel, base URL is detected automatically.)
 *
 * Uses the same TELEGRAM_BOT_TOKEN as order notifications (/api/order).
 */
import { NextResponse } from "next/server";
import {
  getBotToken,
  getWebhookBaseUrl,
  sendTelegramMessage,
  setTelegramWebhook,
  type SendMessageParams,
} from "@/lib/telegram";

const MINI_APP_URL = "https://fueldropuz.vercel.app";
const ORDER_URL = `${MINI_APP_URL}/order`;

/** Тексты кнопок Reply Keyboard — проверяем по ним нажатие */
const BTN_ORDER = "⛽ Заказать топливо";
const BTN_MY_ORDERS = "📍 Мои заказы";
const BTN_CONTACT = "📞 Контакты";
const BTN_HELP = "❓ Помощь";

/** Постоянная клавиатура под полем ввода (ReplyKeyboardMarkup) */
const REPLY_KEYBOARD = {
  keyboard: [
    [{ text: BTN_ORDER }, { text: BTN_MY_ORDERS }],
    [{ text: BTN_CONTACT }, { text: BTN_HELP }],
  ],
  resize_keyboard: true,
  is_persistent: true,
};

type TelegramUpdate = {
  update_id?: number;
  message?: {
    message_id: number;
    from?: { id: number; first_name?: string; username?: string };
    chat: { id: number; type?: string };
    text?: string;
  };
};

function getCommand(text: string | undefined): string | null {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  if (!trimmed.startsWith("/")) return null;
  const parts = trimmed.split(/\s/);
  const cmd = parts[0].split("@")[0].toLowerCase();
  return cmd;
}

const COMMANDS = {
  start: `
🛢 *FuelDrop* — доставка топлива прямо к вашему автомобилю.

Мы привозим топливо в удобное для вас время: домой, в офис или на дорогу. Работаем по Узбекистану 24/7.

Используйте кнопки ниже или команды:
/order — открыть заказ топлива
/contact — контакты поддержки
/help — инструкция по заказу
`.trim(),

  order: `⛽ *Заказать топливо*

Нажмите кнопку ниже, чтобы открыть форму заказа и оформить доставку топлива к вашему автомобилю.`,
  orderButton: { text: "🚗 Открыть FuelDrop — заказать топливо", web_app: { url: MINI_APP_URL } },

  contact: `
📞 *FuelDrop — контакты*

*Поддержка:*
Telegram: @Mukhammad731
Телефон: +998 77 041 4666

По вопросам заказов, доставки и сотрудничества — напишите или позвоните. Работаем 24/7.
`.trim(),

  /** Ответ на нажатие кнопки «Заказать топливо» */
  orderLink: `Оформите заказ топлива по ссылке:\n${ORDER_URL}`,

  /** Ответ на нажатие «Мои заказы» */
  myOrders: "История заказов скоро появится.",

  /** Ответ на нажатие «Контакты» (без Markdown для простоты) */
  contactPlain: `FuelDrop Support
Telegram: @Mukhammad731
Phone: +998 77 041 4666`,

  /** Ответ на нажатие «Помощь» — список функций сервиса */
  helpPlain: `❓ *Помощь — возможности FuelDrop*

• Доставка топлива к вашему автомобилю 24/7
• Заказ через сайт или по кнопке «Заказать топливо»
• Выбор города, адреса и времени доставки
• Оплата при получении (наличные или карта)
• Поддержка: @Mukhammad731, +998 77 041 4666`.trim(),

  help: `
📋 *Как заказать топливо*

*Через бота:*
1. Нажмите /order или кнопку «Заказать топливо»
2. Откройте форму заказа по ссылке
3. Укажите адрес, тип и объём топлива, контакты
4. Подтвердите заказ — мы привезём топливо в выбранное время

*Напрямую:*
Откройте в браузере: ${MINI_APP_URL}
По любым вопросам: /contact
`.trim(),
};

/** GET ?action=set — register webhook with Telegram (call once after deploy) */
export async function GET(request: Request) {
  const token = getBotToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: "TELEGRAM_BOT_TOKEN not set" }, { status: 503 });
  }
  const { searchParams } = new URL(request.url);
  if (searchParams.get("action") !== "set") {
    return NextResponse.json({
      ok: true,
      hint: "To register webhook, open: /api/telegram-webhook?action=set",
    });
  }
  const base = getWebhookBaseUrl(request.url);
  if (!base) {
    return NextResponse.json({
      ok: false,
      error: "Could not detect base URL. Set TELEGRAM_WEBHOOK_URL or deploy on Vercel.",
    }, { status: 400 });
  }
  const webhookUrl = `${base}/api/telegram-webhook`;
  const result = await setTelegramWebhook(token, webhookUrl);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.description }, { status: 502 });
  }
  return NextResponse.json({ ok: true, webhook: webhookUrl });
}

export async function POST(request: Request) {
  try {
    const token = getBotToken();
    if (!token) {
      return NextResponse.json({ ok: false }, { status: 503 });
    }

    const body = (await request.json()) as TelegramUpdate;
    const message = body?.message;
    const chatId = message?.chat?.id;
    const text = message?.text;

    if (!message || chatId == null) {
      return NextResponse.json({ ok: true });
    }

    const command = getCommand(text);
    let replyText: string;
    let replyMarkup: SendMessageParams["reply_markup"] | undefined;
    let parseMode: "Markdown" | undefined = "Markdown";

    if (command) {
      switch (command) {
        case "/start":
          replyText = COMMANDS.start;
          replyMarkup = REPLY_KEYBOARD;
          break;
        case "/order":
          replyText = COMMANDS.order;
          replyMarkup = {
            inline_keyboard: [[COMMANDS.orderButton]],
          };
          break;
        case "/contact":
          replyText = COMMANDS.contact;
          break;
        case "/help":
          replyText = COMMANDS.help;
          break;
        default:
          return NextResponse.json({ ok: true });
      }
    } else {
      const trimmed = (text ?? "").trim();
      if (trimmed === BTN_ORDER) {
        replyText = COMMANDS.orderLink;
        parseMode = undefined;
      } else if (trimmed === BTN_MY_ORDERS) {
        replyText = COMMANDS.myOrders;
        parseMode = undefined;
      } else if (trimmed === BTN_CONTACT) {
        replyText = COMMANDS.contactPlain;
        parseMode = undefined;
      } else if (trimmed === BTN_HELP) {
        replyText = COMMANDS.helpPlain;
      } else {
        return NextResponse.json({ ok: true });
      }
    }

    const sendParams: SendMessageParams = {
      chat_id: chatId,
      text: replyText,
      ...(parseMode && { parse_mode: parseMode }),
      ...(replyMarkup && { reply_markup: replyMarkup }),
    };

    const apiResult = await sendTelegramMessage(token, sendParams);
    if (!apiResult.ok) {
      console.error("Telegram sendMessage failed:", apiResult.description);
      const fallback: SendMessageParams = {
        chat_id: chatId,
        text: replyText,
        ...(replyMarkup && { reply_markup: replyMarkup }),
      };
      await sendTelegramMessage(token, fallback);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
