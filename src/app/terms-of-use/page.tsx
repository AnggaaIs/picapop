import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan Penggunaan",
  description:
    "Baca syarat dan ketentuan penggunaan layanan PicaPop sebelum menggunakan platform kami.",
  openGraph: {
    title: "Syarat dan Ketentuan - PicaPop",
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

const TermsOfUse = () => {
  return (
    <div className="min-h-screen px-6 py-12 text-base-content">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-[#34364a]">Syarat dan Ketentuan Penggunaan - PicaPop</h1>

        <p className="mb-4 text-[#34364a]">
          Dengan mengakses dan menggunakan PicaPop, Anda menyetujui untuk terikat pada syarat
          dan ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak
          menggunakan layanan kami.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-[#34364a]">1. Penggunaan Layanan</h2>
        <p className="mb-4 text-[#34364a]">
          Layanan PicaPop hanya boleh digunakan untuk keperluan pribadi dan non-komersial.
          Penggunaan layanan secara ilegal atau yang melanggar hukum berlaku tidak diperbolehkan.
        </p>

        <h2 className="text-2xl text-[#34364a] font-semibold mt-8 mb-2">2. Hak Kekayaan Intelektual</h2>
        <p className="mb-4 text-[#34364a]">
          Seluruh konten, termasuk namun tidak terbatas pada teks, gambar, desain, dan kode
          milik PicaPop dilindungi oleh hak cipta dan tidak boleh disalin atau digunakan tanpa
          izin tertulis dari kami.
        </p>

        <h2 className="text-2xl text-[#34364a] font-semibold mt-8 mb-2">3. Konten yang Dihasilkan Pengguna</h2>
        <p className="mb-4 text-[#34364a]">
          Anda bertanggung jawab penuh atas konten (seperti foto) yang Anda unggah atau hasilkan
          melalui layanan ini. Dilarang mengunggah konten yang mengandung unsur kekerasan,
          kebencian, pornografi, atau melanggar hukum.
        </p>

        <h2 className="text-2xl text-[#34364a] font-semibold mt-8 mb-2">4. Batasan Tanggung Jawab</h2>
        <p className="mb-4 text-[#34364a]">
          Kami tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang
          diakibatkan oleh penggunaan layanan ini. PicaPop disediakan &quot;apa adanya&quot; tanpa
          jaminan apapun.
        </p>

        <h2 className="text-2xl text-[#34364a] font-semibold mt-8 mb-2">5. Perubahan Ketentuan</h2>
        <p className="mb-4 text-[#34364a]">
          Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diumumkan
          melalui situs web dan berlaku segera setelah dipublikasikan.
        </p>

        <h2 className="text-2xl text-[#34364a] font-semibold mt-8 mb-2">6. Hukum yang Berlaku</h2>
        <p className="mb-4 text-[#34364a]">
          Ketentuan ini tunduk dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Terakhir diperbarui: April 2025
        </p>
      </div>
    </div>
  );
};
export default TermsOfUse;
