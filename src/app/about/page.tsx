 "use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {t("about.title")}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {t("about.heroBody")}
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/60 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("about.expectTitle")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(["professional", "safeDelivery", "trainedStaff", "transparentPricing", "reliableSupport", "clearSimple"] as const).map(
              (key) => (
                <Card key={key} className="h-full">
                  <CardTitle>{t(`about.features.${key}.title`)}</CardTitle>
                  <p className="mt-2 text-slate-600">
                    {t(`about.features.${key}.description`)}
                  </p>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {t("about.commitmentTitle")}
          </h2>
          <p className="mt-4 text-slate-600">
            {t("about.commitmentBody")}
          </p>
        </div>
      </section>
    </>
  );
}
