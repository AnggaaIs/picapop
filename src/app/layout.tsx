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
  title: "PicaPop: A Fun & Creative Web App for Capturing and Customizing Selfies",
  description:
    " Capture selfies instantly with PicaPop, the ultimate free online photo booth! Choose from aesthetic photostrip templates, add filters, and save your creative selfies in seconds. No app download needed – start now!",
  authors: [{ name: "Lazypeople" }],
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
    "digital photobooth"
  ],
  openGraph: {
    title: "PicaPop: A Fun & Creative Web App for Capturing and Customizing Selfies",
    description:
      " Capture selfies instantly with PicaPop, the ultimate free online photo booth! Choose from aesthetic photostrip templates, add filters, and save your creative selfies in seconds. No app download needed – start now!",
  },
  twitter: {
    card: "summary_large_image",
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
