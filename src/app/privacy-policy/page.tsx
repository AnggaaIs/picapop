"use client";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      <motion.div 
        className="py-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl p-5 md:p-12"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#34364a]"
            variants={itemVariants}
          >
            Kebijakan Privasi
          </motion.h1>

          <motion.p 
            className="mb-8 text-lg text-[#34364a]/80 leading-relaxed"
            variants={itemVariants}
          >
            Selamat datang di PicaPop! Privasi Anda sangat penting bagi kami. Kebijakan
            privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
            melindungi informasi pribadi Anda saat menggunakan aplikasi kami.
          </motion.p>

          {sections.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h2 className="text-2xl font-bold text-[#34364a] mt-12 mb-4 flex items-center">
                <span className="mr-3">{index + 1}.</span>
                {section.title}
              </h2>
              <p className="text-[#34364a]/80 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}

          <motion.p 
            className="mt-6 text-sm text-[#34364a]/60 pt-8"
            variants={itemVariants}
          >
            Terakhir diperbarui: April 2025
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const sections = [
  {
    title: "Informasi yang Kami Kumpulkan",
    content: "Kami dapat mengumpulkan informasi seperti foto yang Anda unggah, preferensi template, serta data teknis seperti jenis perangkat dan browser yang digunakan. Kami tidak mengumpulkan informasi pribadi yang sensitif seperti nama lengkap atau alamat kecuali secara eksplisit diberikan oleh pengguna."
  },
  {
    title: "Penggunaan Informasi",
    content: "Informasi yang dikumpulkan digunakan untuk meningkatkan layanan, menyediakan pengalaman pengguna yang lebih personal, serta untuk keperluan analitik internal. Kami tidak menjual atau membagikan informasi pribadi Anda kepada pihak ketiga."
  },
  {
    title: "Keamanan Data",
    content: "Kami menggunakan langkah-langkah keamanan teknis dan organisasi untuk melindungi data Anda dari akses yang tidak sah, kehilangan, atau pengubahan."
  },
  {
    title: "Hak Pengguna",
    content: "Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda yang disimpan oleh kami. Jika Anda memiliki pertanyaan atau permintaan terkait data pribadi, silakan hubungi kami."
  },
  {
    title: "Perubahan Kebijakan",
    content: "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan akan diinformasikan melalui aplikasi atau website kami."
  }
];

export default PrivacyPolicy;