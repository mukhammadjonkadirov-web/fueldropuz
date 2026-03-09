"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    product: [
      { href: "/order", label: t("footer.order") },
      { href: "/for-companies", label: t("footer.companies") },
      { href: "/about", label: t("footer.howItWorks") },
    ],
    company: [
      { href: "/about", label: t("footer.about") },
      { href: "/contact", label: t("footer.contact") },
      { href: "/contact#business", label: t("footer.business") },
    ],
    legal: [
      { href: "#", label: t("footer.privacy") },
      { href: "#", label: t("footer.terms") },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-3">
            <Logo className="text-white" />
            <p className="max-w-sm text-sm text-slate-300">
              {t("footer.tagLine")}
            </p>
            <div className="mt-4 space-y-1 text-sm text-slate-300">
              <p>{t("footer.available24_7")}</p>
              <p>
                <span className="font-semibold">{t("common.email")}:</span>{" "}
                <a
                  href="mailto:fueldropuz@gmail.com"
                  className="underline decoration-slate-500 hover:decoration-sky-400"
                >
                  fueldropuz@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">{t("common.phone")}:</span>{" "}
                <a
                  href="tel:+99877041466"
                  className="underline decoration-slate-500 hover:decoration-sky-400"
                >
                  +998 77 041 466
                </a>
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">
              {t("footer.product")}
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">
              {t("footer.company")}
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">
              {t("footer.legal")}
            </h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} FuelDrop. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
