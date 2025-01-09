import Navigation from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { PageTransition } from "@/components/PageTransition";
import ProductBanner from "@/components/ProductBanner";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Roadmap | Alex Go",
  description: "Путь в IT разработку",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👨‍💻</text></svg>',
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Header />

        <PageTransition>
          <main className="min-h-screen bg-gray-100 pt-14 pb-[50px]">
            {children}
          </main>
        </PageTransition>

        <ProductBanner />
        <Navigation />
      </body>
    </html>
  );
}
