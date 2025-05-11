import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const onest = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PicaPop - Fun & Creative Photo Booth for Unique Selfies",
    default: "PicaPop - Fun & Creative Photo Booth for Unique Selfies"
  },
  description:
    "Capture stunning selfies instantly with PicaPop! Choose from stylish photostrip templates, add filters, and save your perfect shots. No app download needed – just snap, style, and share!",
  authors: [{ name: "LazyPeople" }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    },
  },
  keywords: [
    "online photo booth free",
    "selfie photo booth web",
    "free webcam photo booth",
    "aesthetic photo booth online",
    "fun selfie camera app",
    "instant photobooth editor",
    "free digital photobooth",
    "photobooth filter online",
    "retro photostrip maker",
    "selfie with template online",
    "picapop.my.id photo booth",
    "best online photobooth 2025",
    "free selfie camera website",
    "create photostrip online",
    "webcam photo booth app",
    "easy selfie editor online",
    "cute photostrip templates",
    "professional selfie booth",
    "online photobooth generator",
    "free online selfie editor",
    "web-based photo booth",
    "instant selfie camera app",
    "photo strip maker free",
    "editable photo strip online",
    "photobooth with effects",
    "custom photostrip generator",
    "retro selfie booth online",
    "modern digital photobooth",
    "aesthetic photo strip editor",
    "best free photo booth website",
    "selfie booth app for PC",
    "fun camera effects online",
    "take selfie with filter online",
    "photobooth software free",
    "vintage photo strip creator",
    "stylish selfie booth",
    "cute selfie maker online",
    "cool photobooth effects",
    "free instant selfie editor",
    "picapop free photo booth",
    "snap selfie online free",
    "trendy photobooth editor",
    "cartoon effect photo booth",
    "HD photobooth camera",
    "animated selfie photo booth",
    "PicaPop selfie editor",
    "online camera app for selfies",
    "photo booth collage maker",
    "top selfie booth 2025"
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  category: 'Community',
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  openGraph: {
    title: {
      template: "%s | PicaPop - Fun & Creative Photo Booth for Unique Selfies",
      default: "PicaPop - Fun & Creative Photo Booth for Unique Selfies"
    },
    locale: "id_ID",
    type: 'website',
    siteName: 'PicaPop',
    url: 'https://picapop.my.id/',
    description:
      "Capture stunning selfies instantly with PicaPop! Choose from stylish photostrip templates, add filters, and save your perfect shots. No app download needed – just snap, style, and share!",
    // images: [
    //   {
    //     url: "/picapop.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "PicaPop - Fun & Creative Photo Booth",
    //   },
    // ],
  },
  appleWebApp: {
    title: "PicaPop",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | PicaPop",
      default: "PicaPop - Fun & Creative Photo Booth for Unique Selfies"
    },
    description:
      "Capture stunning selfies instantly with PicaPop! Choose from stylish photostrip templates, add filters, and save your perfect shots. No app download needed – just snap, style, and share!",
    images: ["/twitter-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="light" suppressHydrationWarning>
      <body className={`${onest.className} antialiased bg-[#f6f8fd]`}>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <Suspense fallback={null}>
            <Navbar />
            <br />
            <br />
            {children}
            <Footer />
          </Suspense>
        </ThemeProvider>
        <Analytics />
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="0ace1615-3fde-428e-9244-2e1f7ed9e8ac" async strategy="lazyOnload" data-domains="picapop.my.id" />
      </body>
      <GoogleTagManager gtmId="GTM-TP8W9HZ4" />
      <GoogleAnalytics gaId="G-ZDCX80L3G0" />
    </html>
  );
}
