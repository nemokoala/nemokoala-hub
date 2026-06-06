import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AppHeader } from "@/components/AppHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/Pretendard.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nemokoala — 만든 서비스들",
  description:
    "ImageGen, TossMe, NemoDrop, Social Jukebox 등 nemokoala 서비스 안내. 서비스 소개 / 개발자 보기 전환 가능",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${geistMono.variable} min-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <Suspense fallback={null}>
            <AppHeader />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
