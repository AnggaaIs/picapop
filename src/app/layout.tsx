import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Suspense } from "react";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photobox - Photostrip Kreatif",
  description: "Buat photostrip unik dan penuh kenangan dengan berbagai template menarik!",
  authors: [{ name: "Lazypeople" }],
  keywords: ["photostrip", "editor foto", "kenangan", "template foto", "photobox"],
  openGraph: {
    title: "Photobox - Photostrip Kreatif",
    description: "Abadikan momen spesial dengan photostrip yang aesthetic dan stylish.",
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
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="retro"
          enableSystem
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
