"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {t("contact.heading")}
        </h1>
        <p className="mt-3 text-slate-600">
          {t("contact.body1")} <br />
          {t("contact.body2")}
        </p>
        <p className="mt-2 text-sm text-slate-500">{t("contact.body3")}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {t("contact.supportTitle")}
          </h2>
          <p className="mt-2 text-slate-600">{t("contact.supportBody")}</p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>
              <strong>{t("common.email")}:</strong>{" "}
              <a
                href="mailto:fueldropuz@gmail.com"
                className="text-sky-700 hover:text-sky-800"
              >
                fueldropuz@gmail.com
              </a>
            </li>
            <li>
              <strong>{t("common.phone")}:</strong>{" "}
              <a
                href="tel:+99877041466"
                className="text-sky-700 hover:text-sky-800"
              >
                +998 77 041 466
              </a>
            </li>
            <li>
              <strong>24/7</strong>
            </li>
          </ul>

          <h2
            id="business"
            className="mt-10 text-lg font-semibold text-slate-900"
          >
            {t("contact.businessTitle")}
          </h2>
          <p className="mt-2 text-slate-600">{t("contact.businessBody")}</p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>
              <strong>{t("common.email")}:</strong>{" "}
              <a
                href="mailto:fueldropuz@gmail.com"
                className="text-sky-700 hover:text-sky-800"
              >
                fueldropuz@gmail.com
              </a>
            </li>
            <li>
              <strong>{t("common.phone")}:</strong>{" "}
              <a
                href="tel:+99877041466"
                className="text-sky-700 hover:text-sky-800"
              >
                +998 77 041 466
              </a>
            </li>
          </ul>
        </div>

        <Card padding="lg">
          {submitted ? (
            <div className="py-6 text-center">
              <p className="text-emerald-600 font-medium">
                {t("contact.thanks")}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {t("contact.thanksBody")}
              </p>
              <Button
                variant="ghost"
                size="md"
                className="mt-4"
                onClick={() => setSubmitted(false)}
              >
                {t("contact.sendAnother")}
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-slate-900">
                {t("contact.formTitle")}
              </h2>
              <form
                className="mt-4 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Input
                  label={t("contact.nameLabel")}
                  placeholder={t("contact.namePlaceholder")}
                  required
                />
                <Input
                  label={t("contact.emailLabel")}
                  type="email"
                  placeholder={t("contact.emailPlaceholder")}
                  required
                />
                <Input
                  label={t("contact.phoneLabel")}
                  type="tel"
                  placeholder={t("contact.phonePlaceholder")}
                />
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    {t("contact.subjectLabel")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="general">
                      {t("contact.subjectGeneral")}
                    </option>
                    <option value="order">{t("contact.subjectOrder")}</option>
                    <option value="business">
                      {t("contact.subjectBusiness")}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    {t("contact.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {t("contact.submit")}
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
