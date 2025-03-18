import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "📸 PicaPop - Fun & Creative Photo Booth for Unique Selfies",
  description:
    "✨ Capture stunning selfies instantly with PicaPop! Choose from stylish photostrip templates, add filters, and save your perfect shots. No app download needed – just snap, style, and share! 🚀",
  authors: [{ name: "LazyPeople" }],
  keywords: [
    "photo booth online",
    "selfie photo booth",
    "free online photobooth",
    "selfie camera web",
    "fun selfie maker",
    "photostrip template",
    "photo booth filter",
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
  openGraph: {
    title: "📸 PicaPop - Fun & Creative Photo Booth for Unique Selfies",
    description:
      "✨ Capture stunning selfies instantly with PicaPop! Choose from stylish photostrip templates, add filters, and save your perfect shots. No app download needed – just snap, style, and share! 🚀",
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
    title: "📸 PicaPop - Fun & Creative Photo Booth for Unique Selfies",
    description:
      "✨ Capture stunning selfies instantly with PicaPop! Choose from stylish photostrip templates, add filters, and save your perfect shots. No app download needed – just snap, style, and share! 🚀",
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
    </html>
  );
}
