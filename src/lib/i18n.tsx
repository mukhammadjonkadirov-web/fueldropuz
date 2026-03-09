"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "ru" | "uz";

type Translations = typeof translationsEn;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T = string>(path: string, fallback?: T) => T | string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "fueldrop_lang";
const DEFAULT_LANG: Lang = "ru";

const translationsEn = {
  nav: {
    home: "Home",
    order: "Order fuel",
    companies: "For companies",
    dashboard: "Dashboard demo",
    about: "About",
    contact: "Contact",
    orderCta: "Order fuel now",
    companiesCta: "For companies",
  },
  common: {
    requiredField: "This field is required",
    driversAndCompanies: "For drivers and companies",
    availableUzbekistan: "Available across Uzbekistan",
    service24_7: "24/7 fuel delivery",
    fastResponse: "Fast response",
    email: "Email",
    phone: "Phone",
  },
  hero: {
    badge1: "24/7 delivery",
    badge2: "For drivers & companies",
    badge3: "Fast response",
    title: "Fuel delivered directly to your car",
    subtitle:
      "Run out of fuel? FuelDrop brings fuel to your location fast. Available across Uzbekistan, 24/7.",
    primaryCta: "Order fuel now",
    secondaryCta: "For companies",
    valueLine:
      "Fuel delivered directly to your car, and smarter fuel budget control for companies.",
  },
  home: {
    whyTitle: "Why choose FuelDrop?",
    whyBody:
      "We make refueling simple for everyone — at home, at work, or when you’re stuck.",
    howTitle: "How it works",
    howBody: "Order fuel in four simple steps. No app download required.",
    trustTitle: "Trust and safety",
    trustBody:
      "We take safety and reliability seriously. Here’s what you can expect.",
    testimonialsTitle: "What people say about FuelDrop",
    ctaTitle: "Ready to get started?",
    ctaBody:
      "Order fuel now or get in touch to set up fuel budgets for your company.",
    startOrder: "Start your order",
    learnMore: "Learn more about our service →",
    benefits: {
      noTripTitle: "No trip to the gas station",
      noTripText:
        "We come to you. Park anywhere — home, office, or roadside — and we’ll refuel your car.",
      fastTitle: "Fast and simple",
      fastText:
        "Order in a few taps. Choose fuel type, amount, and time. We handle the rest.",
      pricingTitle: "Transparent pricing",
      pricingText:
        "See the price before you confirm. No hidden fees. Pay only for the fuel you get.",
      safeTitle: "Safe and professional",
      safeText:
        "Trained staff, safe handling, and insured service. Your car and safety come first.",
    },
    testimonials: {
      firstQuote:
        "I ran out of fuel on the highway. FuelDrop came within 45 minutes. Simple and life-saving.",
      firstAuthor: "Sarah M.",
      firstRole: "Driver",
      secondQuote:
        "We switched from cash allowances to FuelDrop. Fuel misuse dropped and reporting is clear.",
      secondAuthor: "James T.",
      secondRole: "Fleet Manager",
      thirdQuote:
        "Ordering is so easy. My parents use it too — no confusion, just fuel when you need it.",
      thirdAuthor: "Alex K.",
      thirdRole: "Driver",
    },
  },
  contact: {
    heading: "Contact us",
    body1: "Have a question or need help?",
    body2: "Send us a message and we’ll respond as soon as possible.",
    body3: "We operate 24/7 across Uzbekistan.",
    supportTitle: "Support",
    supportBody: "For order support, delivery questions, or account help:",
    businessTitle: "Business inquiries",
    businessBody: "For company accounts, partnerships, or enterprise:",
    thanks: "Thank you for your message.",
    thanksBody: "We’ll get back to you as soon as possible.",
    sendAnother: "Send another message",
    formTitle: "Send a message",
    nameLabel: "Your name",
    namePlaceholder: "Full name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "+998 90 123 45 67",
    subjectLabel: "Subject",
    subjectGeneral: "General inquiry",
    subjectOrder: "Order support",
    subjectBusiness: "Business / company account",
    messageLabel: "Message",
    messagePlaceholder: "How can we help?",
    submit: "Send message",
  },
  footer: {
    tagLine:
      "Fuel delivery across Uzbekistan for drivers and companies. Simple, transparent, and reliable.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    order: "Order fuel",
    companies: "For companies",
    howItWorks: "How it works",
    about: "About us",
    contact: "Contact",
    business: "Business inquiries",
    privacy: "Privacy policy",
    terms: "Terms of service",
    contactUs: "Contact",
    available24_7: "Available 24/7 across Uzbekistan",
    rights: "All rights reserved.",
  },
  companies: {
    heroTitle: "Smarter fuel budgets for your company",
    heroBody:
      "Stop giving cash that gets spent elsewhere. Transfer your monthly fuel budget to FuelDrop — we deliver fuel directly to employee vehicles and give you full control and visibility.",
    getInTouch: "Get in touch",
    viewDashboardDemo: "View dashboard demo",
    howTitle: "How it works for companies",
    howBody: "One platform. Monthly budgets. Direct fuel delivery. No misuse.",
    controlTitle: "Better financial control",
    controlBody:
      "Know exactly how much you spend on fuel. Set limits, get alerts, and keep everything in one place.",
    demoCtaTitle: "Ready to simplify your company fuel spend?",
    demoCtaBody:
      "Contact our team for a demo or to set up your company account.",
    requestDemo: "Request a demo",
  },
  dashboard: {
    title: "Company dashboard",
    intro:
      "Manage your team’s fuel budgets and view usage. This is a demo view.",
    totalBudget: "Total company budget (this month)",
    amountUsed: "Amount used",
    remaining: "Remaining",
    alertsTitle: "Limit alerts",
    employeesTitle: "Employees",
    employeesIntro:
      "Monthly assigned amount, amount used, and remaining per employee.",
    colEmployee: "Employee",
    colAssigned: "Monthly assigned",
    colUsed: "Amount used",
    colRemaining: "Remaining",
    colStatus: "Status",
    statusOk: "OK",
    statusLow: "Low",
    statusLimit: "Limit reached",
    recentOrders: "Recent orders",
    recentIntro: "Last 5 fuel delivery orders for your company.",
    colDate: "Date",
    colAmount: "Amount",
    colOrderStatus: "Status",
    demoNote:
      "This is a demo dashboard. Real company accounts get full reporting and settings.",
    alertLine1: "James Wilson is close to his monthly limit (£2 remaining).",
    alertLine2:
      "David Brown has reached his monthly limit. No further orders until next month.",
    orderStatusDelivered: "Delivered",
  },
  about: {
    title: "About FuelDrop",
    heroBody:
      "We deliver fuel directly to your car — at home, at work, or when you’re stuck. Professional service, transparent pricing, and peace of mind.",
    expectTitle: "What you can expect",
    features: {
      professional: {
        title: "Professional service",
        description:
          "Every delivery is carried out by our trained team. We follow strict safety and quality procedures so you get fuel you can trust.",
      },
      safeDelivery: {
        title: "Safe fuel delivery",
        description:
          "We use approved equipment and follow local regulations. Your vehicle and the environment are protected at every step.",
      },
      trainedStaff: {
        title: "Trained staff",
        description:
          "Our technicians are background-checked and certified for safe fuel handling. You’ll see a clear ID and branded vehicle.",
      },
      transparentPricing: {
        title: "Transparent pricing",
        description:
          "You see the price before we start. We charge for the fuel delivered — no hidden fees or surprise charges.",
      },
      reliableSupport: {
        title: "Reliable support",
        description:
          "Questions or issues? Our support team is available to help. We’ll keep you updated on your delivery status.",
      },
      clearSimple: {
        title: "Clear and simple",
        description:
          "Ordering is designed to be easy for everyone. No complicated forms or confusing options — just fuel when you need it.",
      },
    },
    commitmentTitle: "Our commitment",
    commitmentBody:
      "We built FuelDrop to make refuelling simpler and more honest — for drivers who need fuel in a pinch, and for companies who want control over fuel spend. We’re here to deliver fuel safely, on time, and without the hassle.",
  },
};

const translationsRu: Translations = {
  ...translationsEn,
  nav: {
    home: "Главная",
    order: "Заказать топливо",
    companies: "Для компаний",
    dashboard: "Демо‑панель",
    about: "О сервисе",
    contact: "Контакты",
    orderCta: "Заказать топливо",
    companiesCta: "Для компаний",
  },
  common: {
    requiredField: "Это поле обязательно",
    driversAndCompanies: "Для водителей и компаний",
    availableUzbekistan: "Работаем по всему Узбекистану",
    service24_7: "Доставка топлива 24/7",
    fastResponse: "Быстрая реакция",
    email: "Email",
    phone: "Телефон",
  },
  hero: {
    badge1: "Работаем 24/7",
    badge2: "Для водителей и компаний",
    badge3: "Быстрая доставка",
    title: "Доставка топлива прямо к вашему автомобилю",
    subtitle:
      "Закончился бензин? FuelDrop привезёт топливо прямо к вам. Работаем по Узбекистану 24/7.",
    primaryCta: "Заказать топливо",
    secondaryCta: "Для компаний",
    valueLine:
      "Доставка топлива прямо к вашему автомобилю и умный контроль топливных бюджетов для компаний.",
  },
  home: {
    ...translationsEn.home,
    whyTitle: "Почему FuelDrop?",
    whyBody:
      "Мы делаем заправку простой для всех — дома, в офисе или когда вы застряли в дороге.",
    howTitle: "Как это работает",
    howBody: "4 простых шага без лишних приложений и звонков.",
    trustTitle: "Надёжность и безопасность",
    trustBody:
      "Мы серьёзно относимся к безопасности и качеству. Вот, что вы получаете.",
    testimonialsTitle: "Что говорят о FuelDrop",
    ctaTitle: "Готовы попробовать?",
    ctaBody:
      "Оформите заказ на доставку топлива или настройте бюджеты для вашей компании.",
    startOrder: "Начать заказ",
    learnMore: "Узнать больше о нашем сервисе →",
    benefits: {
      noTripTitle: "Без поездки на заправку",
      noTripText:
        "Мы приедем к вам. Паркуйтесь где удобно — дома, в офисе или на дороге — и мы заправим ваш автомобиль.",
      fastTitle: "Быстро и просто",
      fastText:
        "Оформите заказ в несколько шагов. Выберите тип топлива, объём и время. Остальное мы возьмём на себя.",
      pricingTitle: "Прозрачные цены",
      pricingText:
        "Вы видите итоговую стоимость до подтверждения. Никаких скрытых платежей.",
      safeTitle: "Безопасно и профессионально",
      safeText:
        "Обученный персонал, безопасная работа с топливом и застрахованный сервис. Ваша безопасность — в приоритете.",
    },
    testimonials: {
      firstQuote:
        "У меня закончился бензин на трассе. FuelDrop приехал примерно за 45 минут. Просто и очень выручило.",
      firstAuthor: "Сара М.",
      firstRole: "Водитель",
      secondQuote:
        "Мы отказались от денежных компенсаций на топливо и перешли на FuelDrop. Злоупотреблений стало меньше, отчётность стала яснее.",
      secondAuthor: "Джеймс Т.",
      secondRole: "Менеджер автопарка",
      thirdQuote:
        "Заказывать топливо очень легко. Даже мои родители пользуются сервисом — без путаницы, просто топливо тогда, когда нужно.",
      thirdAuthor: "Алекс К.",
      thirdRole: "Водитель",
    },
  },
  contact: {
    ...translationsEn.contact,
    heading: "Свяжитесь с нами",
    body1: "Есть вопрос или нужна помощь?",
    body2: "Напишите нам, и мы ответим как можно быстрее.",
    body3: "Мы работаем 24/7 по всему Узбекистану.",
    supportTitle: "Поддержка",
    supportBody:
      "По вопросам заказов, доставки или помощи с аккаунтом обращайтесь:",
    businessTitle: "Для бизнеса",
    businessBody: "Для корпоративных аккаунтов, партнёрств и интеграций:",
    thanks: "Спасибо за ваше сообщение.",
    thanksBody: "Мы ответим как можно быстрее.",
    formTitle: "Отправить сообщение",
    nameLabel: "Ваше имя",
    namePlaceholder: "Имя и фамилия",
    emailLabel: "Email",
    phoneLabel: "Телефон (необязательно)",
    subjectLabel: "Тема",
    subjectGeneral: "Общий вопрос",
    subjectOrder: "Поддержка заказа",
    subjectBusiness: "Бизнес / корпоративный аккаунт",
    messageLabel: "Сообщение",
    messagePlaceholder: "Чем мы можем помочь?",
    submit: "Отправить",
  },
  footer: {
    ...translationsEn.footer,
    tagLine:
      "Доставка топлива по всему Узбекистану для водителей и компаний. Просто, прозрачно и надёжно.",
    product: "Продукт",
    company: "Компания",
    legal: "Юридическое",
    order: "Заказать топливо",
    companies: "Для компаний",
    howItWorks: "Как это работает",
    about: "О нас",
    contact: "Контакты",
    business: "Для бизнеса",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    contactUs: "Связаться",
    available24_7: "Работаем 24/7 по всему Узбекистану",
    rights: "Все права защищены.",
  },
  companies: {
    ...translationsEn.companies,
    heroTitle: "Умные топливные бюджеты для вашей компании",
    heroBody:
      "Перестаньте выдавать наличные на топливо. Перенесите месячные бюджеты в FuelDrop — мы доставляем топливо прямо к автомобилям сотрудников и даём полный контроль расходов.",
    getInTouch: "Связаться с нами",
    viewDashboardDemo: "Посмотреть демо‑панель",
    howTitle: "Как это работает для компаний",
    howBody:
      "Одна платформа. Месячные лимиты. Прямая доставка топлива. Никаких злоупотреблений.",
    controlTitle: "Больше контроля над расходами",
    controlBody:
      "Точно знайте, сколько вы тратите на топливо. Настраивайте лимиты, получайте уведомления и держите всё в одном месте.",
    demoCtaTitle: "Готовы упростить топливные расходы компании?",
    demoCtaBody:
      "Свяжитесь с нашей командой, чтобы получить демо или настроить аккаунт компании.",
    requestDemo: "Запросить демо",
  },
  dashboard: {
    ...translationsEn.dashboard,
    title: "Панель компании",
    intro:
      "Управляйте топливными бюджетами сотрудников и просматривайте использование. Это демо‑версия.",
    totalBudget: "Общий бюджет компании (в этом месяце)",
    amountUsed: "Израсходовано",
    remaining: "Остаток",
    alertsTitle: "Уведомления о лимитах",
    employeesTitle: "Сотрудники",
    employeesIntro:
      "Выделенный бюджет, потраченная сумма и остаток по каждому сотруднику.",
    colEmployee: "Сотрудник",
    colAssigned: "Месячный лимит",
    colUsed: "Израсходовано",
    colRemaining: "Остаток",
    colStatus: "Статус",
    statusOk: "OK",
    statusLow: "Почти исчерпан",
    statusLimit: "Лимит достигнут",
    recentOrders: "Недавние заказы",
    recentIntro: "Последние 5 заказов доставки топлива вашей компании.",
    colDate: "Дата",
    colAmount: "Сумма",
    colOrderStatus: "Статус",
    demoNote:
      "Это демо‑панель. В реальных аккаунтах доступны полная отчётность и настройки.",
    alertLine1:
      "Джеймс Уилсон почти израсходовал свой месячный лимит (осталось £2).",
    alertLine2:
      "Дэвид Браун исчерпал месячный лимит. Новые заказы будут доступны в следующем месяце.",
    orderStatusDelivered: "Доставлено",
  },
  about: {
    ...translationsEn.about,
    title: "О FuelDrop",
    heroBody:
      "Мы доставляем топливо прямо к вашему автомобилю — дома, в офисе или когда вы застряли в дороге. Профессиональный сервис, прозрачные цены и спокойствие.",
    expectTitle: "Что вы получаете",
    features: {
      professional: {
        title: "Профессиональный сервис",
        description:
          "Каждую доставку выполняет обученная команда. Мы соблюдаем строгие стандарты безопасности и качества, чтобы вы получали надёжное топливо.",
      },
      safeDelivery: {
        title: "Безопасная доставка топлива",
        description:
          "Мы используем сертифицированное оборудование и соблюдаем местные нормы. Ваш автомобиль и окружающая среда защищены на каждом этапе.",
      },
      trainedStaff: {
        title: "Обученный персонал",
        description:
          "Наши специалисты проходят проверку и обучение по безопасной работе с топливом. Вы всегда видите официальный бейдж и брендированный автомобиль.",
      },
      transparentPricing: {
        title: "Прозрачные цены",
        description:
          "Вы видите стоимость до начала работы. Мы берём оплату только за доставленное топливо — без скрытых комиссий и сюрпризов.",
      },
      reliableSupport: {
        title: "Надёжная поддержка",
        description:
          "Есть вопросы или сложности? Наша служба поддержки на связи и информирует вас о статусе доставки.",
      },
      clearSimple: {
        title: "Понятно и просто",
        description:
          "Процесс заказа сделан простым для всех. Никаких сложных форм и непонятных шагов — только топливо тогда, когда оно нужно.",
      },
    },
    commitmentTitle: "Наше обещание",
    commitmentBody:
      "Мы создали FuelDrop, чтобы сделать заправку проще и честнее — для водителей и для компаний. Мы доставляем топливо безопасно, вовремя и без лишних хлопот.",
  },
};

const translationsUz: Translations = {
  ...translationsEn,
  nav: {
    home: "Bosh sahifa",
    order: "Yoqilg‘i buyurtma qilish",
    companies: "Kompaniyalar uchun",
    dashboard: "Demo panel",
    about: "Haqimizda",
    contact: "Kontaktlar",
    orderCta: "Yoqilg‘iga buyurtma berish",
    companiesCta: "Kompaniyalar uchun",
  },
  common: {
    requiredField: "Bu maydon majburiy",
    driversAndCompanies: "Haydovchilar va kompaniyalar uchun",
    availableUzbekistan: "Butun O‘zbekiston bo‘ylab",
    service24_7: "24/7 yoqilg‘i yetkazib berish",
    fastResponse: "Tezkor javob",
    email: "Email",
    phone: "Telefon",
  },
  hero: {
    badge1: "24/7 xizmat",
    badge2: "Haydovchilar va kompaniyalar uchun",
    badge3: "Tez yetkazib berish",
    title: "Yoqilg‘ini avtomobilingizga yetkazib beramiz",
    subtitle:
      "Benzin tugadimi? FuelDrop yoqilg‘ini tezda sizning joyingizga olib keladi. O‘zbekiston bo‘ylab 24/7 ishlaymiz.",
    primaryCta: "Yoqilg‘iga buyurtma berish",
    secondaryCta: "Kompaniyalar uchun",
    valueLine:
      "Yoqilg‘i bevosita avtomobilingizga yetkaziladi va kompaniyalar uchun aqlli yoqilg‘i byudjet nazorati.",
  },
  home: {
    ...translationsEn.home,
    whyTitle: "Nega aynan FuelDrop?",
    whyBody:
      "Biz yoqilg‘i quyishni hamma uchun oson qilamiz — uyda, ofisda yoki yo‘lda qolganingizda.",
    howTitle: "Qanday ishlaydi",
    howBody: "4 ta oddiy qadam. Qo‘shimcha ilovalar va murakkabliklarsiz.",
    trustTitle: "Ishonch va xavfsizlik",
    trustBody:
      "Xavfsizlik va ishonchlilik biz uchun muhim. Mana nimalarni kutishingiz mumkin.",
    testimonialsTitle: "Mijozlarimiz nima deyishadi",
    ctaTitle: "Boshlashga tayyormisiz?",
    ctaBody:
      "Avtomobilingizga yoqilg‘i buyurtma qiling yoki kompaniyangiz uchun byudjetlarni sozlang.",
    startOrder: "Buyurtmani boshlash",
    learnMore: "Servisimiz haqida batafsil →",
    benefits: {
      noTripTitle: "AYoQShga borish shart emas",
      noTripText:
        "Biz o‘zimiz sizning oldingizga kelamiz. Uy, ofis yoki yo‘lda bo‘ling — avtomobilingizni shu yerning o‘zida to‘ldiramiz.",
      fastTitle: "Tez va qulay",
      fastText:
        "Bir necha bosqichda buyurtma bering. Yoqilg‘i turi, hajmi va vaqtni tanlang. Qolgan ishni biz bajaramiz.",
      pricingTitle: "Shaffof narxlar",
      pricingText:
        "Tasdiqlashdan oldin yakuniy narxni ko‘rasiz. Yashirin to‘lovlar yo‘q.",
      safeTitle: "Xavfsiz va professional",
      safeText:
        "Tajriba orttirgan mutaxassislar, xavfsiz yoqilg‘i quyish va sug‘urtalangan servis. Siz va avtomobilingiz xavfsizligi ustuvor.",
    },
    testimonials: {
      firstQuote:
        "Yo‘lda yoqilg‘im tugab qoldi. FuelDrop taxminan 45 daqiqada yetib keldi. Juda qulay va haqiqiy najot bo‘ldi.",
      firstAuthor: "Sara M.",
      firstRole: "Haydovchi",
      secondQuote:
        "Naqd pul o‘rniga yoqilg‘i uchun FuelDrop’dan foydalanishni boshladik. Mablag‘lardan noto‘g‘ri foydalanish kamaydi, hisobotlar aniq bo‘ldi.",
      secondAuthor: "Jeyms T.",
      secondRole: "Avtopark menejeri",
      thirdQuote:
        "Buyurtma berish juda oson. Hattoki ota-onam ham foydalanadi — chalkashliksiz, kerak paytda yoqilg‘i.",
      thirdAuthor: "Aleks K.",
      thirdRole: "Haydovchi",
    },
  },
  contact: {
    ...translationsEn.contact,
    heading: "Biz bilan bog‘laning",
    body1: "Savolingiz bormi yoki yordam kerakmi?",
    body2: "Bizga yozing, imkon qadar tez javob beramiz.",
    body3: "Biz O‘zbekiston bo‘ylab 24/7 ishlaymiz.",
    supportTitle: "Qo‘llab-quvvatlash",
    supportBody:
      "Buyurtma, yetkazib berish yoki akkaunt bo‘yicha savollar uchun:",
    businessTitle: "Biznes uchun",
    businessBody:
      "Korporativ akkauntlar, hamkorlik va integratsiyalar bo‘yicha:",
    thanks: "Murojaatingiz uchun rahmat.",
    thanksBody: "Imkon qadar tez siz bilan bog‘lanamiz.",
    formTitle: "Xabar yuborish",
    nameLabel: "Ismingiz",
    namePlaceholder: "Ism-familiya",
    emailLabel: "Email",
    phoneLabel: "Telefon (ixtiyoriy)",
    subjectLabel: "Mavzu",
    subjectGeneral: "Umumiy savol",
    subjectOrder: "Buyurtma bo‘yicha yordam",
    subjectBusiness: "Biznes / korporativ akkaunt",
    messageLabel: "Xabar",
    messagePlaceholder: "Qanday yordam bera olamiz?",
    submit: "Yuborish",
  },
  footer: {
    ...translationsEn.footer,
    tagLine:
      "Yoqilg‘ini butun O‘zbekiston bo‘ylab haydovchilar va kompaniyalarga yetkazib beramiz. Oson, shaffof va ishonchli.",
    product: "Mahsulot",
    company: "Kompaniya",
    legal: "Huquqiy ma’lumot",
    order: "Yoqilg‘i buyurtma qilish",
    companies: "Kompaniyalar uchun",
    howItWorks: "Qanday ishlaydi",
    about: "Biz haqimizda",
    contact: "Kontaktlar",
    business: "Biznes uchun",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari",
    contactUs: "Bog‘lanish",
    available24_7: "O‘zbekiston bo‘ylab 24/7 ishlaymiz",
  },
  companies: {
    ...translationsEn.companies,
    heroTitle: "Kompaniyangiz uchun aqlli yoqilg‘i byudjetlari",
    heroBody:
      "Naqd pul berishni to‘xtating. Oylik yoqilg‘i byudjetini FuelDrop’ga o‘tkazing — biz yoqilg‘ini to‘g‘ridan‑to‘g‘ri xodimlaringiz avtomobillariga yetkazib beramiz va to‘liq nazorat taqdim etamiz.",
    getInTouch: "Biz bilan bog‘lanish",
    viewDashboardDemo: "Demo panelni ko‘rish",
    howTitle: "Kompaniyalar uchun qanday ishlaydi",
    howBody:
      "Bitta platforma. Oylik limitlar. To‘g‘ridan‑to‘g‘ri yoqilg‘i yetkazib berish. Suiste’mollarsiz.",
    controlTitle: "Moliya ustidan ko‘proq nazorat",
    controlBody:
      "Yoqilg‘iga qanchalik mablag‘ ketayotganini aniq biling. Limitlarni sozlang, ogohlantirishlar oling va hammasini bir joyda yuriting.",
    demoCtaTitle: "Kompaniyangiz yoqilg‘i xarajatlarini soddalashtirishga tayyormisiz?",
    demoCtaBody:
      "Demo olish yoki kompaniya akkauntini sozlash uchun jamoamiz bilan bog‘laning.",
    requestDemo: "Demo so‘rash",
  },
  dashboard: {
    ...translationsEn.dashboard,
    title: "Kompaniya paneli",
    intro:
      "Xodimlaringizning yoqilg‘i byudjetlarini boshqaring va foydalanishni ko‘ring. Bu demo ko‘rinishidir.",
    totalBudget: "Kompaniyaning umumiy byudjeti (shu oyda)",
    amountUsed: "Sarflangan summa",
    remaining: "Qolgan",
    alertsTitle: "Limit bo‘yicha ogohlantirishlar",
    employeesTitle: "Xodimlar",
    employeesIntro:
      "Har bir xodim uchun ajratilgan limit, sarflangan summa va qoldiq.",
    colEmployee: "Xodim",
    colAssigned: "Oylik limit",
    colUsed: "Sarflangan",
    colRemaining: "Qolgan",
    colStatus: "Holat",
    statusOk: "OK",
    statusLow: "Kam qoldi",
    statusLimit: "Limit tugagan",
    recentOrders: "So‘nggi buyurtmalar",
    recentIntro: "Kompaniyangiz uchun so‘nggi 5 ta yoqilg‘i buyurtmasi.",
    colDate: "Sana",
    colAmount: "Summa",
    colOrderStatus: "Holat",
    demoNote:
      "Bu demo panel. Haqiqiy akkauntlarda to‘liq hisobotlar va sozlamalar mavjud.",
  },
  about: {
    ...translationsEn.about,
    title: "FuelDrop haqida",
    heroBody:
      "Biz yoqilg‘ini bevosita avtomobilingizga yetkazib beramiz — uyda, ofisda yoki yo‘lda qolganingizda. Professional xizmat, shaffof narxlar va xotirjamlik.",
    expectTitle: "Nimalarni kutishingiz mumkin",
    commitmentTitle: "Bizning majburiyatimiz",
    commitmentBody:
      "FuelDrop yoqilg‘i quyishni soddalashtirish va halol qilish uchun yaratilgan — haydovchilar va kompaniyalar uchun. Biz yoqilg‘ini xavfsiz, o‘z vaqtida va ortiqcha tashvishlarsiz yetkazib beramiz.",
  },
};

const DICTS: Record<Lang, Translations> = {
  en: translationsEn,
  ru: translationsRu,
  uz: translationsUz,
};

function getNested(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return acc[key];
  }, obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && (saved === "en" || saved === "ru" || saved === "uz")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  };

  const t: I18nContextValue["t"] = (path, fallback) => {
    const dict = DICTS[lang] || translationsRu;
    const value = getNested(dict, path);
    if (value === undefined || value === null) {
      return fallback ?? path;
    }
    return value;
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}

