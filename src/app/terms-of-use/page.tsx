"use client";
import { motion } from "framer-motion";

const TermsOfUse = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const terms = [
    {
      title: "Penggunaan Layanan",
      content: "Layanan PicaPop hanya boleh digunakan untuk keperluan pribadi dan non-komersial. Penggunaan layanan secara ilegal atau yang melanggar hukum berlaku tidak diperbolehkan."
    },
    {
      title: "Hak Kekayaan Intelektual",
      content: "Seluruh konten, termasuk namun tidak terbatas pada teks, gambar, desain, dan kode milik PicaPop dilindungi oleh hak cipta dan tidak boleh disalin atau digunakan tanpa izin tertulis dari kami."
    },
    {
      title: "Konten yang Dihasilkan Pengguna",
      content: "Anda bertanggung jawab penuh atas konten (seperti foto) yang Anda unggah atau hasilkan melalui layanan ini. Dilarang mengunggah konten yang mengandung unsur kekerasan, kebencian, pornografi, atau melanggar hukum."
    },
    {
      title: "Batasan Tanggung Jawab",
      content: "Kami tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang diakibatkan oleh penggunaan layanan ini. PicaPop disediakan \"apa adanya\" tanpa jaminan apapun."
    },
    {
      title: "Perubahan Ketentuan",
      content: "Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diumumkan melalui situs web dan berlaku segera setelah dipublikasikan."
    },
    {
      title: "Hukum yang Berlaku",
      content: "Ketentuan ini tunduk dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f6f8fd] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[#34364a]/[0.02] -z-1" />
      <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
      <div className="absolute top-40 -right-64 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />

      <motion.div 
        className="py-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-sm"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#34364a] to-blue-600"
            variants={itemVariants}
          >
            Syarat dan Ketentuan
          </motion.h1>

          <motion.p 
            className="mb-8 text-lg text-[#34364a]/80 leading-relaxed"
            variants={itemVariants}
          >
            Dengan mengakses dan menggunakan PicaPop, Anda menyetujui untuk terikat pada syarat
            dan ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak
            menggunakan layanan kami.
          </motion.p>

          {terms.map((term, index) => (
            <motion.div 
              key={term.title}
              variants={itemVariants}
              className="mb-8 last:mb-0"
            >
              <h2 className="text-2xl font-semibold mb-3 text-[#34364a] flex items-center">
                <span className="text-blue-600 mr-3">{index + 1}.</span>
                {term.title}
              </h2>
              <p className="text-[#34364a]/80 leading-relaxed pl-7">
                {term.content}
              </p>
            </motion.div>
          ))}

          <motion.p 
            className="mt-12 text-sm text-[#34364a]/60 border-t pt-8"
            variants={itemVariants}
          >
            Terakhir diperbarui: April 2025
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfUse;
