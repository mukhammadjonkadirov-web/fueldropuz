 "use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";
import { useLanguage } from "@/i18n/useLanguage";

export default function HomePage() {
  const { t } = useI18n();
  const { t: copy } = useLanguage();

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
                title: t("home.benefits.noTripTitle"),
                description: t("home.benefits.noTripText"),
                icon: "📍",
              },
              {
                title: t("home.benefits.fastTitle"),
                description: t("home.benefits.fastText"),
                icon: "⚡",
              },
              {
                title: t("home.benefits.pricingTitle"),
                description: t("home.benefits.pricingText"),
                icon: "💰",
              },
              {
                title: t("home.benefits.safeTitle"),
                description: t("home.benefits.safeText"),
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
            {copy.stepsTitle}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, title: copy.step1Title, text: copy.step1Text },
              { step: 2, title: copy.step2Title, text: copy.step2Text },
              { step: 3, title: copy.step3Title, text: copy.step3Text },
              { step: 4, title: copy.step4Title, text: copy.step4Text },
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
              {t("home.startOrder")}
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & safety */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            {copy.reliabilityTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("home.trustBody")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: copy.technicians, text: copy.techniciansText },
              { title: copy.pricing, text: copy.pricingText },
              { title: copy.support, text: copy.supportText },
            ].map((item) => (
              <Card key={item.title} padding="lg">
                <CardTitle>{item.title}</CardTitle>
                <p className="mt-2 text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/about"
              className="font-medium text-sky-600 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
            >
              {t("home.learnMore")}
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
              {
                quote: t("home.testimonials.firstQuote"),
                author: t("home.testimonials.firstAuthor"),
                role: t("home.testimonials.firstRole"),
              },
              {
                quote: t("home.testimonials.secondQuote"),
                author: t("home.testimonials.secondAuthor"),
                role: t("home.testimonials.secondRole"),
              },
              {
                quote: t("home.testimonials.thirdQuote"),
                author: t("home.testimonials.thirdAuthor"),
                role: t("home.testimonials.thirdRole"),
              },
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
