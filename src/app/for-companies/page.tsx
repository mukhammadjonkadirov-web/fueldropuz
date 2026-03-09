 "use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function ForCompaniesPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("companies.heroTitle")}
          </h1>
          <p className="mt-4 text-lg text-slate-100 max-w-2xl mx-auto">
            {t("companies.heroBody")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button as="link" href="/contact#business" variant="inverse" size="lg">
              {t("companies.getInTouch")}
            </Button>
            <Button as="link" href="/dashboard" variant="outline" size="lg">
              {t("companies.viewDashboardDemo")}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("companies.howTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("companies.howBody")}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Monthly employee fuel budgets",
                description: "Set a fuel allowance per employee each month. Funds stay in your account until fuel is actually delivered.",
              },
              {
                title: "Controlled usage",
                description: "Employees order fuel through FuelDrop within their limit. No cash in hand means no spending on other things.",
              },
              {
                title: "Direct service, not reimbursement",
                description: "We deliver fuel to the employee’s car. No expense claims, no receipts, no chasing — just fuel when they need it.",
              },
              {
                title: "Usage transparency",
                description: "See who ordered what, when, and where. Full visibility for finance and fleet managers.",
              },
              {
                title: "Reduced misuse",
                description: "Fuel money can’t be used for groceries or other purchases. Budget goes only to fuel delivery.",
              },
              {
                title: "Monthly reporting",
                description: "Clear reports on spend, usage per employee, and remaining budget. Export for accounting and audits.",
              },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <CardTitle>{item.title}</CardTitle>
                <p className="mt-2 text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("companies.controlTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("companies.controlBody")}
          </p>
          <ul className="mx-auto mt-10 max-w-2xl space-y-4 text-slate-700">
            <li className="flex gap-3">
              <span className="text-sky-600 font-bold">✓</span>
              Set per-employee or per-department monthly limits
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600 font-bold">✓</span>
              Get alerts when an employee is close to their limit
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600 font-bold">✓</span>
              One invoice from FuelDrop instead of dozens of expense claims
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600 font-bold">✓</span>
              Optional integration with your payroll or fleet systems
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-sky-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t("companies.demoCtaTitle")}
          </h2>
          <p className="mt-4 text-sky-100">
            {t("companies.demoCtaBody")}
          </p>
          <div className="mt-8">
            <Button
              as="link"
              href="/contact#business"
              variant="inverse"
              size="lg"
            >
              {t("companies.requestDemo")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
