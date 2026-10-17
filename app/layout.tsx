import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AppHeader } from "@/components/AppHeader";
import { SiteFooter } from "@/components/SiteFooter";
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

const siteTitle = "박재연 — Frontend Developer";
const siteDescription =
  "Next.js와 React 기반 AI 영상 생성 서비스에서 웹 비디오 에디터, WebCodecs Export, 대용량 리소스 최적화와 React Native WebView 연동을 개발한 프론트엔드 개발자 박재연입니다.";

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
          <AppHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
