import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Pelajari bagaimana PicaPop mengelola dan melindungi data pribadi Anda.",
  openGraph: {
    title: "Kebijakan Privasi",
    description: "Privasi Anda penting bagi kami. Baca kebijakan privasi lengkap dari PicaPop.",
    type: "website",
    url: "https://picapop.my.id/privacy-policy",
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
    title: "Kebijakan Privasi - PicaPop",
    description: "Privasi Anda penting bagi kami. Baca kebijakan privasi lengkap dari PicaPop.",
    images: ["/twitter-image.png"],
    card: "summary_large_image",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}