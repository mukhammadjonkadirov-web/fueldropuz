import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type PaymentMethod = "cash" | "card" | "payment_link";
type OrderStatus = "new" | "accepted" | "on_the_way" | "delivered";
type PaymentStatus = "pending" | "paid" | "failed";

type Coordinates = { lat: number; lng: number };

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function normalizeCoordinates(input: unknown): Coordinates | null {
  if (!input || typeof input !== "object") return null;
  const maybe = input as { lat?: unknown; lng?: unknown };
  if (!isFiniteNumber(maybe.lat) || !isFiniteNumber(maybe.lng)) return null;
  return { lat: maybe.lat, lng: maybe.lng };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, address, fuelType, liters } = body as {
      name?: string;
      phone?: string;
      address?: string;
      fuelType?: string;
      liters?: string;
      city?: string;
      addressDetails?: string;
      coordinates?: Coordinates | null;
      paymentMethod?: PaymentMethod;
    };

    const city = typeof (body as any)?.city === "string" ? (body as any).city : "";
    const addressDetails =
      typeof (body as any)?.addressDetails === "string" ? (body as any).addressDetails : "";
    const coordinates = normalizeCoordinates((body as any)?.coordinates);
    const paymentMethod: PaymentMethod =
      (body as any)?.paymentMethod === "card" ||
      (body as any)?.paymentMethod === "payment_link" ||
      (body as any)?.paymentMethod === "cash"
        ? (body as any).paymentMethod
        : "cash";

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { success: false, error: "Telegram config missing" },
        { status: 500 }
      );
    }

    const orderId = "FD-" + Date.now().toString(36).toUpperCase();

    const status: OrderStatus = "new";
    const paymentStatus: PaymentStatus = "pending";

    await prisma.order.create({
      data: {
        orderId,
        name: name || "",
        phone: phone || "",
        city: city || null,
        address: addressDetails || address || null,
        coordinates: coordinates ? JSON.stringify(coordinates) : null,
        fuelType: fuelType || null,
        liters: liters || null,
        paymentMethod,
        paymentStatus,
        status,
      },
    });

    const addressBlock =
      city || addressDetails || address
        ? [
            city ? `Город: ${city}` : null,
            addressDetails ? `Адрес/ориентир: ${addressDetails}` : null,
            !city && !addressDetails && address ? `Адрес: ${address}` : null,
          ]
            .filter(Boolean)
            .join("\n")
        : "—";

    const coordsBlock = coordinates ? `${coordinates.lat}, ${coordinates.lng}` : "";
    const mapsQuery = [
      city ? `${city}, Uzbekistan` : "Uzbekistan",
      addressDetails,
      !city && !addressDetails ? address : "",
    ]
      .filter(Boolean)
      .join(", ");
    const googleMapsLink = coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

    const text = `
🚗 Новый заказ топлива (Узбекистан)

🧾 Заказ: ${orderId}
📦 Статус: ${status}

👤 Имя: ${name || "—"}

📞 Телефон:
tel:${phone || "—"}

📍 Локация:
${addressBlock}
${coordinates ? `\n📌 Координаты:\n${coordsBlock}` : ""}
🗺 Google Maps:
${googleMapsLink}

⛽ Топливо: ${fuelType || "—"}
🛢 Количество: ${liters || "—"}

💳 Оплата: ${paymentMethod}
`.trim();

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      return NextResponse.json(
        { success: false, error: "Telegram send failed", details: telegramData },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
