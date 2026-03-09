 "use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-sky-600 px-4 py-16 sm:py-24 lg:py-28 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#38bdf8_0,_transparent_55%),radial-gradient(circle_at_bottom,_#0f172a_0,_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-sky-100 ring-1 ring-white/20">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{t("common.service24_7")}</span>
            <span>•</span>
            <span>{t("common.availableUzbekistan")}</span>
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-lg text-sky-100 sm:text-xl max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-sky-100">
            <span className="rounded-full bg-white/10 px-3 py-1">
              {t("hero.badge1")}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              {t("hero.badge2")}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              {t("hero.badge3")}
            </span>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as="link" href="/order" variant="inverse" size="lg">
              {t("hero.primaryCta")}
            </Button>
            <Button as="link" href="/for-companies" variant="outline" size="lg">
              {t("hero.secondaryCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* Value prop strip */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-600 sm:text-base">
            {t("hero.valueLine")}
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {t("home.whyTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("home.whyBody")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "No trip to the gas station",
                description: "We come to you. Park anywhere — home, office, or roadside — and we’ll refuel your car.",
                icon: "📍",
              },
              {
                title: "Fast and simple",
                description: "Order in a few taps. Choose fuel type, amount, and time. We handle the rest.",
                icon: "⚡",
              },
              {
                title: "Transparent pricing",
                description: "See the price before you confirm. No hidden fees. Pay only for the fuel you get.",
                icon: "💰",
              },
              {
                title: "Safe and professional",
                description: "Trained staff, safe handling, and insured service. Your car and safety come first.",
                icon: "🛡️",
              },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <span className="text-2xl" aria-hidden>{item.icon}</span>
                <CardTitle className="mt-3">{item.title}</CardTitle>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-100/60 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {t("home.howTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("home.howBody")}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, title: "Enter your location", text: "Tell us where your car is. We’ll confirm we can reach you." },
              { step: 2, title: "Choose fuel & amount", text: "Select fuel type and how much you need. See the price instantly." },
              { step: 3, title: "Confirm & pay", text: "Add vehicle and contact details. Pay securely when we arrive." },
              { step: 4, title: "We deliver", text: "Our technician arrives at your chosen time and refuels your car." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.text}</p>
                {item.step < 4 && (
                  <span className="absolute left-6 top-6 hidden h-0.5 w-8 bg-slate-300 lg:block" style={{ left: "3rem" }} aria-hidden />
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button as="link" href="/order" variant="primary" size="md">
              Start your order
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & safety */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {t("home.trustTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("home.trustBody")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Trained technicians", text: "Every delivery is done by certified, background-checked staff." },
              { title: "Transparent pricing", text: "You see the total before we start. No surprises." },
              { title: "Reliable support", text: "Need help? Our support team is here when you need us." },
            ].map((item) => (
              <Card key={item.title} padding="lg">
                <CardTitle>{item.title}</CardTitle>
                <p className="mt-2 text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/about" className="font-medium text-sky-600 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded">
              Learn more about our service →
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials / credibility */}
      <section className="bg-sky-600 px-4 py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            {t("home.testimonialsTitle")}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { quote: "I ran out of fuel on the highway. FuelDrop came within 45 minutes. Simple and life-saving.", author: "Sarah M.", role: "Driver" },
              { quote: "We switched from cash allowances to FuelDrop. Fuel misuse dropped and reporting is clear.", author: "James T.", role: "Fleet Manager" },
              { quote: "Ordering is so easy. My parents use it too — no confusion, just fuel when you need it.", author: "Alex K.", role: "Driver" },
            ].map((item) => (
              <blockquote key={item.author} className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-lg">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-4 font-medium">{item.author}</footer>
                <p className="text-sm text-sky-100">{item.role}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mt-4 text-slate-600">
            {t("home.ctaBody")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button as="link" href="/order" variant="primary" size="lg">
              {t("hero.primaryCta")}
            </Button>
            <Button as="link" href="/for-companies" variant="outline" size="lg">
              {t("hero.secondaryCta")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
