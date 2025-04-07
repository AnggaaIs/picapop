import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Kebijakan Privasi",
    description:
        "Pelajari bagaimana PicaPop mengelola dan melindungi data pribadi Anda.",
    openGraph: {
        title: "Kebijakan Privasi - PicaPop",
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

const PrivacyPolicy = () => {
    return (
        <div className="bg-base-200 min-h-screen px-6 py-12 text-base-content">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">Kebijakan Privasi - PicaPop</h1>

                <p className="mb-4">
                    Selamat datang di PicaPop! Privasi Anda sangat penting bagi kami. Kebijakan
                    privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
                    melindungi informasi pribadi Anda saat menggunakan aplikasi kami.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">1. Informasi yang Kami Kumpulkan</h2>
                <p className="mb-4">
                    Kami dapat mengumpulkan informasi seperti foto yang Anda unggah, preferensi
                    template, serta data teknis seperti jenis perangkat dan browser yang digunakan.
                    Kami tidak mengumpulkan informasi pribadi yang sensitif seperti nama lengkap atau
                    alamat kecuali secara eksplisit diberikan oleh pengguna.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">2. Penggunaan Informasi</h2>
                <p className="mb-4">
                    Informasi yang dikumpulkan digunakan untuk meningkatkan layanan, menyediakan
                    pengalaman pengguna yang lebih personal, serta untuk keperluan analitik internal.
                    Kami tidak menjual atau membagikan informasi pribadi Anda kepada pihak ketiga.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">3. Keamanan Data</h2>
                <p className="mb-4">
                    Kami menggunakan langkah-langkah keamanan teknis dan organisasi untuk melindungi
                    data Anda dari akses yang tidak sah, kehilangan, atau pengubahan.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">4. Hak Pengguna</h2>
                <p className="mb-4">
                    Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi
                    Anda yang disimpan oleh kami. Jika Anda memiliki pertanyaan atau permintaan terkait
                    data pribadi, silakan hubungi kami.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-2">5. Perubahan Kebijakan</h2>
                <p className="mb-4">
                    Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan
                    akan diinformasikan melalui aplikasi atau website kami.
                </p>

                <p className="mt-8 text-sm text-gray-500">
                    Terakhir diperbarui: April 2025
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;