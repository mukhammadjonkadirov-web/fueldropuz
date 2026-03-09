import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FuelDrop — Fuel delivered to your car. Smarter budgets for companies.",
  description:
    "Order fuel delivered directly to your car. Companies get controlled employee fuel budgets, transparency, and no misuse. Simple, fast, trustworthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <I18nProvider>
          <a
            href="#main"
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:block focus:h-auto focus:w-auto focus:overflow-visible focus:p-4 focus:bg-sky-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600 focus:[clip:auto]"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
