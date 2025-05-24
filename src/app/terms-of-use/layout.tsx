import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan Penggunaan",
  description:
    "Baca syarat dan ketentuan penggunaan layanan PicaPop sebelum menggunakan platform kami.",
  openGraph: {
    title: "Syarat dan Ketentuan",
    description: "Ketahui hak dan tanggung jawab Anda saat menggunakan layanan PicaPop.",
    type: "website",
    url: "https://picapop.my.id/terms-of-use",
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
    title: "Syarat dan Ketentuan - PicaPop",
    description: "Ketahui hak dan tanggung jawab Anda saat menggunakan layanan PicaPop.",
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