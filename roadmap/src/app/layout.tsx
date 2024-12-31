import Navigation from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { Home } from "lucide-react";

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Roadmap | Alex Go',
  description: 'Путь в IT разработку',
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
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div>
              <h1 className="text-2xl font-bold mb-2">Roadmap</h1>
              <p className="text-sm opacity-90">Путь к становлению разработчиком</p>
          </div>
          <Link href="/" className="text-white hover:text-blue-200 transition-colors flex items-center gap-2">
              <Home size={20} />
          </Link>
        </div>
        <PageTransition>
          <main className="min-h-screen bg-gray-100">
            {children}
          </main>
        </PageTransition>
        <Navigation />
      </body>
    </html>
  );
}
