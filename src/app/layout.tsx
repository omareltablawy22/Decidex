// src/app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "DecideX Board Portal",
  description: "Board management system for Saudi Arabian companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

// src/app/page.tsx
import { BoardCalendarTabs } from "@/components/board-calendar-tabs";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <BoardCalendarTabs />
      </div>
    </main>
  );
}

// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}