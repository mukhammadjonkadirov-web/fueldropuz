 "use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

const MOCK_EMPLOYEES = [
  { id: "1", name: "Sarah Chen", assigned: 120, used: 87, remaining: 33, status: "ok" },
  { id: "2", name: "James Wilson", assigned: 120, used: 118, remaining: 2, status: "warning" },
  { id: "3", name: "Maria Garcia", assigned: 100, used: 45, remaining: 55, status: "ok" },
  { id: "4", name: "David Brown", assigned: 120, used: 120, remaining: 0, status: "limit" },
];

export default function DashboardPage() {
  const totalBudget = 5000;
  const totalUsed = 2340;
  const totalRemaining = totalBudget - totalUsed;

  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {t("dashboard.title")}
        </h1>
        <p className="mt-1 text-slate-600">{t("dashboard.intro")}</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card padding="lg">
          <p className="text-sm font-medium text-slate-500">
            {t("dashboard.totalBudget")}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">£{totalBudget.toLocaleString()}</p>
        </Card>
        <Card padding="lg">
          <p className="text-sm font-medium text-slate-500">
            {t("dashboard.amountUsed")}
          </p>
          <p className="mt-1 text-2xl font-bold text-sky-600">£{totalUsed.toLocaleString()}</p>
        </Card>
        <Card padding="lg">
          <p className="text-sm font-medium text-slate-500">
            {t("dashboard.remaining")}
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">£{totalRemaining.toLocaleString()}</p>
        </Card>
      </div>

      {/* Limit alerts */}
      <Card className="mb-8" padding="md">
        <CardTitle className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-amber-500" aria-hidden />
          {t("dashboard.alertsTitle")}
        </CardTitle>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>James Wilson is close to his monthly limit (£2 remaining).</li>
          <li>David Brown has reached his monthly limit. No further orders until next month.</li>
        </ul>
      </Card>

      {/* Employees table */}
      <Card padding="none">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <CardTitle>{t("dashboard.employeesTitle")}</CardTitle>
          <p className="mt-1 text-sm text-slate-600">
            {t("dashboard.employeesIntro")}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-4 py-3 font-semibold text-slate-900 sm:px-6">
                  {t("dashboard.colEmployee")}
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 sm:px-6">
                  {t("dashboard.colAssigned")}
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 sm:px-6">
                  {t("dashboard.colUsed")}
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 sm:px-6">
                  {t("dashboard.colRemaining")}
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 sm:px-6">
                  {t("dashboard.colStatus")}
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_EMPLOYEES.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600 sm:px-6">£{row.assigned}</td>
                  <td className="px-4 py-3 text-slate-600 sm:px-6">£{row.used}</td>
                  <td className="px-4 py-3 text-slate-600 sm:px-6">£{row.remaining}</td>
                  <td className="px-4 py-3 sm:px-6">
                    {row.status === "limit" && (
                      <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        {t("dashboard.statusLimit")}
                      </span>
                    )}
                    {row.status === "warning" && (
                      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        {t("dashboard.statusLow")}
                      </span>
                    )}
                    {row.status === "ok" && (
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                        {t("dashboard.statusOk")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order history */}
      <Card className="mt-8" padding="md">
        <CardTitle>{t("dashboard.recentOrders")}</CardTitle>
        <p className="mt-1 text-sm text-slate-600">
          {t("dashboard.recentIntro")}
        </p>
        <div className="mt-4 rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {t("dashboard.colDate")}
                </th>
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {t("dashboard.colEmployee")}
                </th>
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {t("dashboard.colAmount")}
                </th>
                <th className="px-4 py-2 font-semibold text-slate-900">
                  {t("dashboard.colOrderStatus")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100"><td className="px-4 py-2 text-slate-600">8 Mar 2025</td><td className="px-4 py-2">Sarah Chen</td><td className="px-4 py-2">£42</td><td className="px-4 py-2 text-emerald-600">Delivered</td></tr>
              <tr className="border-t border-slate-100"><td className="px-4 py-2 text-slate-600">7 Mar 2025</td><td className="px-4 py-2">James Wilson</td><td className="px-4 py-2">£58</td><td className="px-4 py-2 text-emerald-600">Delivered</td></tr>
              <tr className="border-t border-slate-100"><td className="px-4 py-2 text-slate-600">6 Mar 2025</td><td className="px-4 py-2">Maria Garcia</td><td className="px-4 py-2">£45</td><td className="px-4 py-2 text-emerald-600">Delivered</td></tr>
              <tr className="border-t border-slate-100"><td className="px-4 py-2 text-slate-600">5 Mar 2025</td><td className="px-4 py-2">David Brown</td><td className="px-4 py-2">£60</td><td className="px-4 py-2 text-emerald-600">Delivered</td></tr>
              <tr className="border-t border-slate-100"><td className="px-4 py-2 text-slate-600">4 Mar 2025</td><td className="px-4 py-2">Sarah Chen</td><td className="px-4 py-2">£38</td><td className="px-4 py-2 text-emerald-600">Delivered</td></tr>
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-8 text-center text-sm text-slate-500">
        {t("dashboard.demoNote")}
      </p>
    </div>
  );
}
