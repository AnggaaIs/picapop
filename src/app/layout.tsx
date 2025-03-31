import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager  } from '@next/third-parties/google'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
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
      'max-snippet':-1, 
      'max-image-preview':'large', 
      'max-video-preview':-1
    },
  },
  keywords: [
    "photo booth online",
    "selfie photo booth",
    "free online photobooth",
    "selfie camera web",
    "fun selfie maker",
    "photostrip template",
    "photo booth filter",
    "picapop vercel",
    "aesthetic photostrip",
    "instant photo editor",
    "online selfie editor",
    "webcam photo booth",
    "cute photo booth",
    "retro photostrip",
    "PicaPop",
    "selfie with template",
    "fun photo editor",
    "photobooth camera app",
    "digital photobooth",
  ],
  icons: {
    icon: "/picapop.png",
    shortcut: "/picapop.png",
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
    images: [
      {
        url: "/picapop.png",
        width: 1200,
        height: 630,
        alt: "PicaPop - Fun & Creative Photo Booth",
      },
    ],
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="retro" enableSystem>
          <Suspense fallback={null}>
            <Navbar />
            {children}
            <Footer />
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleTagManager gtmId="GTM-TP8W9HZ4" />
      <GoogleAnalytics gaId="G-ZDCX80L3G0" />
    </html>
  );
}
