"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useI18n, type Lang } from "@/lib/i18n";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/order", label: t("nav.order") },
    { href: "/for-companies", label: t("nav.companies") },
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const setLanguage = (value: Lang) => {
    setLang(value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden sm:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 px-1 py-0.5 text-xs font-semibold text-slate-600">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{t("common.service24_7")}</span>
          </div>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-1 py-0.5">
            {(
              [
                { value: "en", label: "EN" },
                { value: "ru", label: "RU" },
                { value: "uz", label: "UZ" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLanguage(opt.value)}
                aria-pressed={lang === opt.value}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === opt.value
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Button as="link" href="/order" variant="primary" size="sm">
            {t("nav.orderCta")}
          </Button>
          <Button as="link" href="/for-companies" variant="outline" size="sm">
            {t("nav.companiesCta")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-2">
              {(
                [
                  { value: "en", label: "EN" },
                  { value: "ru", label: "RU" },
                  { value: "uz", label: "UZ" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setLanguage(opt.value);
                  }}
                  aria-pressed={lang === opt.value}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
                    lang === opt.value
                      ? "bg-sky-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Button as="link" href="/order" variant="primary" size="md" className="w-full justify-center">
                {t("nav.orderCta")}
              </Button>
              <Button as="link" href="/for-companies" variant="outline" size="md" className="w-full justify-center">
                {t("nav.companiesCta")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
