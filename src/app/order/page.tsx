"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import type { Coordinates } from "@/components/order/MapPicker";
import { useI18n, type Lang } from "@/lib/i18n";

const MapPicker = dynamic(
  () => import("@/components/order/MapPicker").then((m) => m.MapPicker),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full rounded-2xl border border-slate-200 bg-slate-100 animate-pulse" />
    ),
  }
);

const STEP_KEYS = [
  "location",
  "fuel",
  "vehicle",
  "delivery",
  "payment",
  "confirm",
] as const;

const CITIES = [
  {
    value: "tashkent",
    label: { ru: "Ташкент", uz: "Toshkent" },
    center: { lat: 41.2995, lng: 69.2401 },
  },
  {
    value: "samarkand",
    label: { ru: "Самарканд", uz: "Samarqand" },
    center: { lat: 39.6542, lng: 66.9597 },
  },
  {
    value: "bukhara",
    label: { ru: "Бухара", uz: "Buxoro" },
    center: { lat: 39.767, lng: 64.423 },
  },
  {
    value: "andijan",
    label: { ru: "Андижан", uz: "Andijon" },
    center: { lat: 40.7821, lng: 72.3442 },
  },
  {
    value: "namangan",
    label: { ru: "Наманган", uz: "Namangan" },
    center: { lat: 41.0058, lng: 71.6436 },
  },
  {
    value: "fergana",
    label: { ru: "Фергана", uz: "Fargʻona" },
    center: { lat: 40.3864, lng: 71.7864 },
  },
  {
    value: "nukus",
    label: { ru: "Нукус", uz: "Nukus" },
    center: { lat: 42.46, lng: 59.6166 },
  },
  {
    value: "qarshi",
    label: { ru: "Карши", uz: "Qarshi" },
    center: { lat: 38.861, lng: 65.7847 },
  },
  {
    value: "termez",
    label: { ru: "Термез", uz: "Termiz" },
    center: { lat: 37.2242, lng: 67.2783 },
  },
  {
    value: "urgench",
    label: { ru: "Ургенч", uz: "Urganch" },
    center: { lat: 41.55, lng: 60.6333 },
  },
  {
    value: "jizzakh",
    label: { ru: "Джизак", uz: "Jizzax" },
    center: { lat: 40.1158, lng: 67.8422 },
  },
  {
    value: "navoi",
    label: { ru: "Навои", uz: "Navoiy" },
    center: { lat: 40.1039, lng: 65.3688 },
  },
  {
    value: "gulistan",
    label: { ru: "Гулистан", uz: "Guliston" },
    center: { lat: 40.4897, lng: 68.7846 },
  },
] as const;

type CityValue = (typeof CITIES)[number]["value"];

const FUEL_TYPES = [
  { value: "petrol", label: { ru: "Бензин", uz: "Benzin" } },
  { value: "diesel", label: { ru: "Дизель", uz: "Dizel" } },
  { value: "premium", label: { ru: "Премиум бензин", uz: "Premium benzin" } },
] as const;

type FuelValue = (typeof FUEL_TYPES)[number]["value"];

const QUANTITY_OPTIONS = [
  { value: "10", label: { ru: "Около 10 литров", uz: "Taxminan 10 litr" } },
  { value: "20", label: { ru: "Около 20 литров", uz: "Taxminan 20 litr" } },
  { value: "30", label: { ru: "Около 30 литров", uz: "Taxminan 30 litr" } },
  { value: "40", label: { ru: "Около 40 литров", uz: "Taxminan 40 litr" } },
  { value: "50", label: { ru: "Около 50 литров", uz: "Taxminan 50 litr" } },
  { value: "full", label: { ru: "Полный бак", uz: "To‘liq bak" } },
] as const;

type QuantityValue = (typeof QUANTITY_OPTIONS)[number]["value"];

const TIME_SLOTS = [
  {
    value: "09-12",
    label: { ru: "Утро (9:00 – 12:00)", uz: "Ertalab (9:00 – 12:00)" },
  },
  {
    value: "12-15",
    label: { ru: "День (12:00 – 15:00)", uz: "Kunduz (12:00 – 15:00)" },
  },
  {
    value: "15-18",
    label: {
      ru: "После обеда (15:00 – 18:00)",
      uz: "Kechga yaqin (15:00 – 18:00)",
    },
  },
  { value: "asap", label: { ru: "Как можно скорее", uz: "Imkon qadar tez" } },
] as const;

type TimeValue = (typeof TIME_SLOTS)[number]["value"];

type Copy = {
  title: string;
  subtitle: string;
  langLabel: string;
  onlyUzbekistan: string;
  steps: Record<(typeof STEP_KEYS)[number], string>;
  locationTitle: string;
  cityLabel: string;
  cityPlaceholder: string;
  mapTap: string;
  mapUseMyLocation: string;
  mapClear: string;
  mapSelected: (lat: number, lng: number) => string;
  mapGetting: string;
  mapUnavailable: string;
  addressDetailsLabel: string;
  addressDetailsPlaceholder: string;
  addressHint: string;
  fuelTitle: string;
  fuelTypeLabel: string;
  fuelTypePlaceholder: string;
  quantityLabel: string;
  quantityPlaceholder: string;
  priceHint: string;
  vehicleTitle: string;
  vehicleMake: string;
  vehicleMakePh: string;
  vehicleModel: string;
  vehicleModelPh: string;
  registration: string;
  registrationPh: string;
  contactName: string;
  contactNamePh: string;
  contactPhone: string;
  contactPhonePh: string;
  contactEmail: string;
  contactEmailPh: string;
  deliveryTitle: string;
  preferredDate: string;
  preferredTime: string;
  preferredTimePlaceholder: string;
  notes: string;
  notesPh: string;
  paymentTitle: string;
  paymentIntro: string;
  paymentMethod: string;
  paymentCard: string;
  paymentLink: string;
  paymentHint: string;
  reviewTitle: string;
  reviewLocation: string;
  reviewFuel: string;
  reviewVehicle: string;
  reviewContact: string;
  reviewDelivery: string;
  reviewPayment: string;
  reviewTerms: string;
  back: string;
  continue: string;
  confirmOrder: string;
  sending: string;
  sendFailed: string;
  confirmedTitle: string;
  confirmedBody: string;
  orderRef: string;
  updatesTo: (v: string) => string;
  backHome: string;
  newOrder: string;
};

const COPY: Record<"en" | "ru" | "uz", Copy & { requiredField: string; paymentCash: string }> = {
  en: {
    title: "Order fuel",
    subtitle:
      "Fill in the details below and we’ll deliver fuel to your car at your chosen time.",
    langLabel: "Language",
    onlyUzbekistan: "Service currently available across Uzbekistan only.",
    steps: {
      location: "Location",
      fuel: "Fuel",
      vehicle: "Vehicle & contact",
      delivery: "Time",
      payment: "Payment",
      confirm: "Confirm",
    },
    locationTitle: "Where is your car?",
    cityLabel: "City",
    cityPlaceholder: "Select a city",
    mapTap:
      "Tap on the map to drop a pin. Use two fingers to zoom in or out.",
    mapUseMyLocation: "Use my location",
    mapClear: "Clear pin",
    mapSelected: (lat, lng) => `Location selected: ${lat}, ${lng}`,
    mapGetting: "Locating…",
    mapUnavailable:
      "We couldn’t get your location. Please allow access or pick a point on the map.",
    addressDetailsLabel: "Address / directions",
    addressDetailsPlaceholder:
      "For example: street, building, landmark, parking, entrance…",
    addressHint:
      "Drop a pin on the map and add details so our driver can find you easily.",
    fuelTitle: "Fuel type and amount",
    fuelTypeLabel: "Fuel type",
    fuelTypePlaceholder: "Select fuel type",
    quantityLabel: "How much fuel do you need?",
    quantityPlaceholder: "Select amount",
    priceHint:
      "An estimated price will be shown at checkout. You pay only for the fuel actually delivered.",
    vehicleTitle: "Vehicle and contact details",
    vehicleMake: "Vehicle make",
    vehicleMakePh: "e.g. Chevrolet, Toyota",
    vehicleModel: "Model",
    vehicleModelPh: "e.g. Cobalt, Corolla",
    registration: "License plate",
    registrationPh: "e.g. 01A123BC",
    contactName: "Your name",
    contactNamePh: "Full name",
    contactPhone: "Phone number",
    contactPhonePh: "e.g. +998 90 123 45 67",
    contactEmail: "Email (optional)",
    contactEmailPh: "you@example.com",
    deliveryTitle: "When should we come?",
    preferredDate: "Preferred date",
    preferredTime: "Preferred time",
    preferredTimePlaceholder: "Select time window",
    notes: "Additional notes (optional)",
    notesPh: "e.g. gate code, where you’re parked, how to enter…",
    paymentTitle: "Payment",
    paymentIntro:
      "Pay when our technician arrives. Cash or card on delivery, or a secure payment link.",
    paymentMethod: "Payment method",
    paymentCard: "Card on delivery",
    paymentLink: "Payment link (before delivery)",
    paymentHint:
      "Your payment is captured only after fuel is delivered. The total depends on the actual volume.",
    reviewTitle: "Review your order",
    reviewLocation: "Location",
    reviewFuel: "Fuel",
    reviewVehicle: "Vehicle",
    reviewContact: "Contact",
    reviewDelivery: "Delivery",
    reviewPayment: "Payment",
    reviewTerms:
      "By confirming, you agree that the information above is correct.",
    back: "Back",
    continue: "Continue",
    confirmOrder: "Confirm order",
    sending: "Sending…",
    sendFailed: "Could not send your order. Please try again.",
    confirmedTitle: "Order confirmed",
    confirmedBody:
      "We’ve received your order and will process it shortly. We’ll contact you before heading out.",
    orderRef: "Order ID",
    updatesTo: (v) => `We’ll send updates to ${v}.`,
    backHome: "Back to home",
    newOrder: "Place another order",
    requiredField: "This field is required",
    paymentCash: "Cash on delivery",
  },
  ru: {
    title: "Заказать топливо",
    subtitle:
      "Заполните данные ниже — мы доставим топливо к вашему автомобилю в выбранное время.",
    langLabel: "Язык",
    onlyUzbekistan: "Сервис доступен только в Узбекистане.",
    steps: {
      location: "Локация",
      fuel: "Топливо",
      vehicle: "Авто и контакт",
      delivery: "Время",
      payment: "Оплата",
      confirm: "Подтверждение",
    },
    locationTitle: "Где находится автомобиль?",
    cityLabel: "Город",
    cityPlaceholder: "Выберите город",
    mapTap:
      "Нажмите на карту, чтобы поставить точку. Можно приблизить/отдалить двумя пальцами.",
    mapUseMyLocation: "Моё местоположение",
    mapClear: "Убрать точку",
    mapSelected: (lat, lng) => `Точка выбрана: ${lat}, ${lng}`,
    mapGetting: "Определяем…",
    mapUnavailable:
      "Не удалось получить геолокацию. Разрешите доступ или выберите точку на карте.",
    addressDetailsLabel: "Адрес / ориентир",
    addressDetailsPlaceholder:
      "Например: улица, дом, ориентир, парковка, подъезд…",
    addressHint: "Поставьте точку на карте и добавьте детали — так мы найдем вас быстрее.",
    fuelTitle: "Тип топлива и объем",
    fuelTypeLabel: "Тип топлива",
    fuelTypePlaceholder: "Выберите тип топлива",
    quantityLabel: "Сколько топлива нужно?",
    quantityPlaceholder: "Выберите объем",
    priceHint:
      "Примерная стоимость будет показана на последнем шаге. Вы платите за фактически доставленный объем.",
    vehicleTitle: "Автомобиль и контакты",
    vehicleMake: "Марка автомобиля",
    vehicleMakePh: "Например: Chevrolet, Toyota",
    vehicleModel: "Модель",
    vehicleModelPh: "Например: Cobalt, Corolla",
    registration: "Госномер",
    registrationPh: "Например: 01A123BC",
    contactName: "Ваше имя",
    contactNamePh: "Имя и фамилия",
    contactPhone: "Телефон",
    contactPhonePh: "Например: +998 90 123 45 67",
    contactEmail: "Email (необязательно)",
    contactEmailPh: "you@example.com",
    deliveryTitle: "Когда доставить?",
    preferredDate: "Дата",
    preferredTime: "Временной слот",
    preferredTimePlaceholder: "Выберите время",
    notes: "Комментарий (необязательно)",
    notesPh: "Например: шлагбаум, где стою, как заехать…",
    paymentTitle: "Оплата",
    paymentIntro:
      "Оплатите при доставке. Можно картой на месте или через безопасную ссылку.",
    paymentMethod: "Способ оплаты",
    paymentCard: "Карта (при доставке)",
    paymentLink: "Ссылка на оплату (до доставки)",
    paymentHint:
      "Списание происходит только после доставки. Итог зависит от фактического объема.",
    reviewTitle: "Проверьте заказ",
    reviewLocation: "Локация",
    reviewFuel: "Топливо",
    reviewVehicle: "Авто",
    reviewContact: "Контакт",
    reviewDelivery: "Доставка",
    reviewPayment: "Оплата",
    reviewTerms:
      "Нажимая «Подтвердить», вы подтверждаете, что данные указаны верно.",
    back: "Назад",
    continue: "Продолжить",
    confirmOrder: "Подтвердить заказ",
    sending: "Отправляем…",
    sendFailed: "Не удалось отправить заказ. Попробуйте еще раз.",
    confirmedTitle: "Заказ подтвержден",
    confirmedBody:
      "Мы получили ваш заказ и отправили его в обработку. Мы свяжемся с вами перед выездом.",
    orderRef: "Номер заказа",
    updatesTo: (v) => `Уведомления отправим на ${v}.`,
    backHome: "На главную",
    newOrder: "Новый заказ",
    requiredField: "Это поле обязательно",
    paymentCash: "Наличными при доставке",
  },
  uz: {
    title: "Yoqilg‘i buyurtma qilish",
    subtitle:
      "Quyidagi ma’lumotlarni kiriting — yoqilg‘ini tanlagan vaqtingizda avtomobilingizga yetkazib beramiz.",
    langLabel: "Til",
    onlyUzbekistan: "Xizmat faqat O‘zbekistonda mavjud.",
    steps: {
      location: "Manzil",
      fuel: "Yoqilg‘i",
      vehicle: "Avto va aloqa",
      delivery: "Vaqt",
      payment: "To‘lov",
      confirm: "Tasdiqlash",
    },
    locationTitle: "Avtomobil qayerda?",
    cityLabel: "Shahar",
    cityPlaceholder: "Shaharni tanlang",
    mapTap:
      "Xaritani bosing — nuqta qo‘yiladi. Ikki barmoq bilan kattalashtiring/kichraytiring.",
    mapUseMyLocation: "Mening joylashuvim",
    mapClear: "Nuqtani o‘chirish",
    mapSelected: (lat, lng) => `Tanlandi: ${lat}, ${lng}`,
    mapGetting: "Aniqlanmoqda…",
    mapUnavailable:
      "Geolokatsiyani olish imkoni bo‘lmadi. Ruxsat bering yoki xaritada nuqtani tanlang.",
    addressDetailsLabel: "Manzil / mo‘ljal",
    addressDetailsPlaceholder:
      "Masalan: ko‘cha, uy, mo‘ljal, parking, kirish…",
    addressHint:
      "Xaritada nuqtani belgilang va qo‘shimcha ma’lumot qo‘shing — tezroq topamiz.",
    fuelTitle: "Yoqilg‘i turi va miqdor",
    fuelTypeLabel: "Yoqilg‘i turi",
    fuelTypePlaceholder: "Yoqilg‘i turini tanlang",
    quantityLabel: "Qancha kerak?",
    quantityPlaceholder: "Miqdorni tanlang",
    priceHint:
      "Taxminiy narx oxirgi bosqichda ko‘rsatiladi. Siz faqat yetkazib berilgan haqiqiy hajm uchun to‘laysiz.",
    vehicleTitle: "Avtomobil va aloqa",
    vehicleMake: "Avtomobil markasi",
    vehicleMakePh: "Masalan: Chevrolet, Toyota",
    vehicleModel: "Model",
    vehicleModelPh: "Masalan: Cobalt, Corolla",
    registration: "Davlat raqami",
    registrationPh: "Masalan: 01A123BC",
    contactName: "Ism",
    contactNamePh: "Ism-familiya",
    contactPhone: "Telefon",
    contactPhonePh: "Masalan: +998 90 123 45 67",
    contactEmail: "Email (ixtiyoriy)",
    contactEmailPh: "you@example.com",
    deliveryTitle: "Qachon yetkazamiz?",
    preferredDate: "Sana",
    preferredTime: "Vaqt oralig‘i",
    preferredTimePlaceholder: "Vaqtni tanlang",
    notes: "Izoh (ixtiyoriy)",
    notesPh: "Masalan: shlagbaum, qayerda turibman, kirish yo‘li…",
    paymentTitle: "To‘lov",
    paymentIntro:
      "To‘lov yetkazib berilganda amalga oshiriladi. Joyida karta yoki xavfsiz havola orqali.",
    paymentMethod: "To‘lov usuli",
    paymentCard: "Karta (yetkazib berilganda)",
    paymentLink: "To‘lov havolasi (oldindan)",
    paymentHint:
      "Pul yechish faqat yetkazilgandan keyin bo‘ladi. Yakuniy summa haqiqiy hajmga bog‘liq.",
    reviewTitle: "Buyurtmani tekshiring",
    reviewLocation: "Manzil",
    reviewFuel: "Yoqilg‘i",
    reviewVehicle: "Avto",
    reviewContact: "Aloqa",
    reviewDelivery: "Yetkazish",
    reviewPayment: "To‘lov",
    reviewTerms:
      "“Tasdiqlash”ni bosish orqali ma’lumotlar to‘g‘riligini tasdiqlaysiz.",
    back: "Orqaga",
    continue: "Davom etish",
    confirmOrder: "Buyurtmani tasdiqlash",
    sending: "Yuborilmoqda…",
    sendFailed: "Buyurtma yuborilmadi. Qayta urinib ko‘ring.",
    confirmedTitle: "Buyurtma tasdiqlandi",
    confirmedBody:
      "Buyurtmangiz qabul qilindi va qayta ishlashga yuborildi. Yo‘lga chiqishdan oldin siz bilan bog‘lanamiz.",
    orderRef: "Buyurtma raqami",
    updatesTo: (v) => `Xabarlarni ${v} ga yuboramiz.`,
    backHome: "Bosh sahifa",
    newOrder: "Yangi buyurtma",
    requiredField: "Bu maydon majburiy",
    paymentCash: "Yetkazib berishda naqd",
  },
};

function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
      {(
        [
          { value: "ru", label: "RU" },
          { value: "uz", label: "UZ" },
        ] as const
      ).map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            lang === opt.value
              ? "bg-sky-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

type OrderFormState = {
  city: CityValue | "";
  addressDetails: string;
  coordinates: Coordinates | null;
  fuelType: FuelValue | "";
  quantity: QuantityValue | "";
  vehicleMake: string;
  vehicleModel: string;
  registration: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  deliveryDate: string;
  deliveryTime: TimeValue | "";
  paymentMethod: "cash" | "card" | "payment_link";
  notes: string;
};

export default function OrderPage() {
  const [step, setStep] = useState(0);
  const { lang } = useI18n();
  const t = COPY[lang];

  const [form, setForm] = useState<OrderFormState>({
    city: "",
    addressDetails: "",
    coordinates: null,
    fuelType: "",
    quantity: "",
    vehicleMake: "",
    vehicleModel: "",
    registration: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    deliveryDate: "",
    deliveryTime: "",
    paymentMethod: "cash",
    notes: "",
  });

  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    addressDetails?: string;
    contactPhone?: string;
  }>({});

  const update = <K extends keyof OrderFormState>(key: K, value: OrderFormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const cityOption = useMemo(
    () => CITIES.find((c) => c.value === form.city) || null,
    [form.city]
  );
  const cityCenter = cityOption?.center ?? CITIES[0].center;

  // For option labels we only have RU/UZ variants; fall back to RU for EN.
  const labelLang: "ru" | "uz" = lang === "uz" ? "uz" : "ru";

  const fuelForUI =
    FUEL_TYPES.find((f) => f.value === form.fuelType)?.label[labelLang] || "";
  const qtyForUI =
    QUANTITY_OPTIONS.find((q) => q.value === form.quantity)?.label[labelLang] || "";
  const timeForUI =
    TIME_SLOTS.find((s) => s.value === form.deliveryTime)?.label[labelLang] || "";

  const next = async () => {
    if (submitting) return;

    if (step < STEP_KEYS.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    const newErrors: typeof fieldErrors = {};
    if (!form.addressDetails.trim()) {
      newErrors.addressDetails = t.requiredField;
    }
    if (!form.contactPhone.trim()) {
      newErrors.contactPhone = t.requiredField;
    }
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const fuel = FUEL_TYPES.find((f) => f.value === form.fuelType);
      const qty = QUANTITY_OPTIONS.find((q) => q.value === form.quantity);
      const cityRu = cityOption?.label.ru || "";

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.contactName,
          phone: form.contactPhone,
          // New fields (Uzbekistan-only), but keep `address` for backward compatibility.
          city: cityRu,
          addressDetails: form.addressDetails,
          coordinates: form.coordinates,
          address: [cityRu, form.addressDetails].filter(Boolean).join(", "),
          fuelType: fuel?.label.ru || String(form.fuelType || ""),
          liters: qty?.label.ru || String(form.quantity || ""),
          paymentMethod: form.paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send order");
      }

      if (data.orderId && typeof data.orderId === "string") setOrderId(data.orderId);
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      setError(t.sendFailed);
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <Card padding="lg" className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-4xl">
            ✓
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">{t.confirmedTitle}</h1>
          <p className="mt-2 text-slate-600">{t.confirmedBody}</p>
          <p className="mt-4 text-sm text-slate-500">
            {t.orderRef}:{" "}
            <strong>{orderId || "FD-" + Date.now().toString(36).toUpperCase()}</strong>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {t.updatesTo(form.contactEmail || form.contactPhone || "—")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button as="link" href="/" variant="primary" size="md">
              {t.backHome}
            </Button>
            <Button
              onClick={() => {
                setConfirmed(false);
                setStep(0);
                setOrderId(null);
              }}
              variant="outline"
              size="md"
            >
              {t.newOrder}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
        <p className="mt-2 text-slate-600">{t.subtitle}</p>
        <p className="mt-3 text-sm text-slate-500">{t.onlyUzbekistan}</p>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {STEP_KEYS.map((key, i) => (
          <button
            key={key}
            type="button"
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              i === step
                ? "bg-sky-600 text-white"
                : i < step
                  ? "bg-sky-100 text-sky-800"
                  : "bg-slate-200 text-slate-600"
            }`}
          >
            {i + 1}. {t.steps[key]}
          </button>
        ))}
      </div>

      <Card padding="lg">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{t.locationTitle}</h2>

            <Select
              label={t.cityLabel}
              placeholder={t.cityPlaceholder}
              options={CITIES.map((c) => ({
                value: c.value,
                label: c.label[labelLang as "ru" | "uz"],
              }))}
              value={form.city}
              onChange={(e) => {
                const v = e.target.value;
                update("city", v ? (v as CityValue) : "");
              }}
            />

            <MapPicker
              center={cityCenter}
              value={form.coordinates}
              onChange={(c) => update("coordinates", c)}
              labels={{
                tapToDropPin: t.mapTap,
                useMyLocation: t.mapUseMyLocation,
                clearPin: t.mapClear,
                locationSelected: t.mapSelected,
                gettingLocation: t.mapGetting,
                locationUnavailable: t.mapUnavailable,
              }}
            />

            <div>
              <label
                htmlFor="address-details"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {t.addressDetailsLabel}
              </label>
              <textarea
                id="address-details"
                rows={3}
                value={form.addressDetails}
                onChange={(e) => update("addressDetails", e.target.value)}
                placeholder={t.addressDetailsPlaceholder}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  fieldErrors.addressDetails ? "border-red-500" : "border-slate-300"
                }`}
              />
              {fieldErrors.addressDetails && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.addressDetails}</p>
              )}
              <p className="mt-1 text-sm text-slate-500">{t.addressHint}</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{t.fuelTitle}</h2>
            <Select
              label={t.fuelTypeLabel}
              placeholder={t.fuelTypePlaceholder}
              options={FUEL_TYPES.map((f) => ({
                value: f.value,
                label: f.label[labelLang as "ru" | "uz"],
              }))}
              value={form.fuelType}
              onChange={(e) => {
                const v = e.target.value;
                update("fuelType", v ? (v as FuelValue) : "");
              }}
            />
            <Select
              label={t.quantityLabel}
              placeholder={t.quantityPlaceholder}
              options={QUANTITY_OPTIONS.map((q) => ({
                value: q.value,
                label: q.label[labelLang as "ru" | "uz"],
              }))}
              value={form.quantity}
              onChange={(e) => {
                const v = e.target.value;
                update("quantity", v ? (v as QuantityValue) : "");
              }}
            />
            <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">{t.priceHint}</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{t.vehicleTitle}</h2>
            <Input
              label={t.vehicleMake}
              placeholder={t.vehicleMakePh}
              value={form.vehicleMake}
              onChange={(e) => update("vehicleMake", e.target.value)}
            />
            <Input
              label={t.vehicleModel}
              placeholder={t.vehicleModelPh}
              value={form.vehicleModel}
              onChange={(e) => update("vehicleModel", e.target.value)}
            />
            <Input
              label={t.registration}
              placeholder={t.registrationPh}
              value={form.registration}
              onChange={(e) => update("registration", e.target.value)}
            />
            <Input
              label={t.contactName}
              placeholder={t.contactNamePh}
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
            />
            <Input
              label={t.contactPhone}
              type="tel"
              placeholder={t.contactPhonePh}
              value={form.contactPhone}
              onChange={(e) => {
                update("contactPhone", e.target.value);
                if (fieldErrors.contactPhone) {
                  setFieldErrors((prev) => ({ ...prev, contactPhone: undefined }));
                }
              }}
              error={fieldErrors.contactPhone}
            />
            <Input
              label={t.contactEmail}
              type="email"
              placeholder={t.contactEmailPh}
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{t.deliveryTitle}</h2>
            <Input
              label={t.preferredDate}
              type="date"
              value={form.deliveryDate}
              onChange={(e) => update("deliveryDate", e.target.value)}
            />
            <Select
              label={t.preferredTime}
              placeholder={t.preferredTimePlaceholder}
              options={TIME_SLOTS.map((s) => ({
                value: s.value,
                label: s.label[labelLang as "ru" | "uz"],
              }))}
              value={form.deliveryTime}
              onChange={(e) => {
                const v = e.target.value;
                update("deliveryTime", v ? (v as TimeValue) : "");
              }}
            />
            <Input
              label={t.notes}
              placeholder={t.notesPh}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{t.paymentTitle}</h2>
            <p className="text-slate-600">{t.paymentIntro}</p>
            <Select
              label={t.paymentMethod}
              options={[
                { value: "cash", label: t.paymentCash },
                { value: "card", label: t.paymentCard },
                { value: "link", label: t.paymentLink },
              ]}
              value={form.paymentMethod}
              onChange={(e) =>
                update(
                  "paymentMethod",
                  e.target.value as OrderFormState["paymentMethod"]
                )
              }
            />
            <p className="text-sm text-slate-500">{t.paymentHint}</p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{t.reviewTitle}</h2>
            <dl className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
              <div>
                <dt className="font-medium text-slate-500">{t.reviewLocation}</dt>
                <dd className="text-slate-900">
                  {(cityOption?.label[labelLang] || "—") +
                    (form.addressDetails ? `, ${form.addressDetails}` : "")}
                  {form.coordinates ? (
                    <span className="block text-slate-600 mt-1">
                      {t.mapSelected(form.coordinates.lat, form.coordinates.lng)}
                    </span>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">{t.reviewFuel}</dt>
                <dd className="text-slate-900">
                  {fuelForUI || "—"} — {qtyForUI || "—"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">{t.reviewVehicle}</dt>
                <dd className="text-slate-900">
                  {form.vehicleMake} {form.vehicleModel} ({form.registration})
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">{t.reviewContact}</dt>
                <dd className="text-slate-900">
                  {form.contactName}, {form.contactPhone}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">{t.reviewDelivery}</dt>
                <dd className="text-slate-900">
                  {form.deliveryDate || "—"} {timeForUI ? `(${timeForUI})` : ""}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">{t.reviewPayment}</dt>
                <dd className="text-slate-900">
                  {form.paymentMethod === "cash"
                    ? t.paymentCash
                    : form.paymentMethod === "card"
                    ? t.paymentCard
                    : t.paymentLink}
                </dd>
              </div>
            </dl>
            <p className="text-sm text-slate-600">{t.reviewTerms}</p>
          </div>
        )}

        {error && (
          <div
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button variant="ghost" size="md" onClick={back} disabled={step === 0}>
            {t.back}
          </Button>
          <Button variant="primary" size="md" onClick={next} className="sm:ml-auto">
            {submitting
              ? t.sending
              : step === STEP_KEYS.length - 1
                ? t.confirmOrder
                : t.continue}
          </Button>
        </div>
      </Card>
    </div>
  );
}