import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang PicaPop - Platform Foto Instan yang Bikin Momen Makin Seru!",
  description:
    "PicaPop menghadirkan pengalaman berfoto yang unik dan menyenangkan. Dengan template keren dan teknologi mutakhir, kami membantu mengabadikan setiap momen spesialmu.",
  keywords:
    "PicaPop, foto instan, template foto, kreatif, momen spesial, photostrip, selfie keren",
  openGraph: {
    title: "Tentang PicaPop - Platform Foto Instan yang Bikin Momen Makin Seru!",
    description:
      "PicaPop menghadirkan pengalaman berfoto yang unik dan menyenangkan. Dengan template keren dan teknologi mutakhir, kami membantu mengabadikan setiap momen spesialmu.",
    url: "https://picapop.my.id/about",
    images: [{ url: "/og-about.png", width: 1200, height: 630 }],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#34364a]/[0.02] -z-1" />
      {children}
    </main>
  );
}