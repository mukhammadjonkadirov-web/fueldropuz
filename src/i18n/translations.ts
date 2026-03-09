import type { Lang } from "@/lib/i18n";

type HomeTranslations = {
  stepsTitle: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
  step4Title: string;
  step4Text: string;
  reliabilityTitle: string;
  technicians: string;
  techniciansText: string;
  pricing: string;
  pricingText: string;
  support: string;
  supportText: string;
};

export const translations: Record<Lang, HomeTranslations> = {
  en: {
    stepsTitle: "4 simple steps without extra apps or calls",
    step1Title: "Enter your location",
    step1Text: "Tell us where your car is. We'll confirm we can reach you.",
    step2Title: "Choose fuel & amount",
    step2Text: "Select fuel type and how much you need. See the price instantly.",
    step3Title: "Confirm & pay",
    step3Text: "Add vehicle and contact details. Pay securely when we arrive.",
    step4Title: "We deliver",
    step4Text: "Our technician arrives at your chosen time and refuels your car.",
    reliabilityTitle: "Reliability & Safety",
    technicians: "Trained technicians",
    techniciansText: "Every delivery is done by certified, background-checked staff.",
    pricing: "Transparent pricing",
    pricingText: "You see the total before we start. No surprises.",
    support: "Reliable support",
    supportText: "Need help? Our support team is here when you need us.",
  },
  ru: {
    stepsTitle: "4 простых шага без лишних приложений и звонков",
    step1Title: "Введите вашу локацию",
    step1Text:
      "Сообщите, где находится ваш автомобиль. Мы подтвердим, что сможем приехать.",
    step2Title: "Выберите топливо и объем",
    step2Text:
      "Выберите тип топлива и нужный объём. Сразу увидите ориентировочную стоимость.",
    step3Title: "Подтвердите и оплатите",
    step3Text:
      "Добавьте данные автомобиля и контакты. Оплатите безопасно при доставке.",
    step4Title: "Мы доставим",
    step4Text:
      "Наш специалист приедет в указанное время и заправит ваш автомобиль.",
    reliabilityTitle: "Надёжность и безопасность",
    technicians: "Обученные специалисты",
    techniciansText:
      "Каждую доставку выполняют обученные специалисты с проверенным прошлым.",
    pricing: "Прозрачные цены",
    pricingText:
      "Вы видите итоговую стоимость до начала. Никаких скрытых платежей.",
    support: "Надёжная поддержка",
    supportText:
      "Нужна помощь? Наша команда поддержки на связи, когда вам это нужно.",
  },
  uz: {
    stepsTitle: "Ortiqcha ilovalarsiz va qo‘ng‘iroqlarsiz 4 ta oddiy qadam",
    step1Title: "Joylashuvingizni kiriting",
    step1Text:
      "Avtomobilingiz qayerdaligini ayting. Yetib bora olishimizni tasdiqlaymiz.",
    step2Title: "Yoqilg‘i va miqdorni tanlang",
    step2Text:
      "Yoqilg‘i turini va kerakli hajmni tanlang. Narxni darhol ko‘rasiz.",
    step3Title: "Tasdiqlang va to‘lang",
    step3Text:
      "Avtomobil va aloqa ma’lumotlarini kiriting. To‘lovni yetkazib berishda xavfsiz tarzda amalga oshiring.",
    step4Title: "Biz yetkazib beramiz",
    step4Text:
      "Texnik xodimimiz siz tanlagan vaqtda kelib avtomobilingizni yoqilg‘i bilan to‘ldiradi.",
    reliabilityTitle: "Ishonchlilik va xavfsizlik",
    technicians: "Malakali texniklar",
    techniciansText:
      "Har bir yetkazib berish tajribali va tekshirilgan mutaxassislar tomonidan amalga oshiriladi.",
    pricing: "Shaffof narxlar",
    pricingText:
      "To‘lashdan oldin yakuniy narxni ko‘rasiz. Kutilmagan xarajatlar yo‘q.",
    support: "Ishonchli yordam",
    supportText:
      "Yordam kerakmi? Qo‘llab-quvvatlash jamoamiz sizga kerak paytda aloqada bo‘ladi.",
  },
};

