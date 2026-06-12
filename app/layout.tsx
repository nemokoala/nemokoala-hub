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

const siteTitle = "nemokoala — 서비스 소개 & 개발 포트폴리오";
const siteDescription =
  "nemokoala가 직접 만든 서비스 모음. 사용자라면 서비스를 바로 사용해보고, 개발자라면 기술 스택·GitHub·배포 URL을 한눈에 확인하세요.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL("https://nemokoala.com"),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://nemokoala.com",
    siteName: "nemokoala",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  verification: {
    google: "_KZv4u6U8TUignzgqAH9gG-mlCA9gTPv0L8doPOQ59I",
  },
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
