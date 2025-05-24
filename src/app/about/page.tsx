// app/about/page.tsx
'use client';
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jeremy",
    role: "Founder & Lead Developer",
    image: "/dev/jeremy.jpeg",
    social: "@cjeremyk",
  },
  {
    name: "Angga",
    role: "Backend Developer",
    image: "/dev/angga.jpeg",
    social: "@anggaxxx",
  },
  {
    name: "Wahyu",
    role: "Product Designer",
    image: "/dev/wahyu.jpeg",
    social: "@wahyuxxx",
  },
] as const;

// Mark the component as client-side rendered

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="relative py-1 pb-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[#34364a]/[0.02] -z-1" />
      <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
      <div className="absolute top-40 -right-64 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />

      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section 
          className="relative rounded-3xl bg-gradient-to-r from-white to-blue-50/50 p-8 md:p-12 mb-20 shadow-sm"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                Tentang Kami
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#34364a] leading-tight">
                Buat Setiap Momen Jadi <span className="text-blue-600">Lebih Berkesan</span>
              </h1>
              <p className="text-lg text-[#34364a]/70 leading-relaxed">
                PicaPop hadir untuk mengubah cara kamu mengabadikan momen. Dengan teknologi mutakhir 
                dan template yang selalu update, kami memastikan setiap jepretan fotomu menjadi karya 
                seni yang unik dan memukau.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#34364a]">Simple</p>
                    <p className="text-sm text-[#34364a]/70">Tanpa ribet</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xl">⚡</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#34364a]">Cepat</p>
                    <p className="text-sm text-[#34364a]/70">Proses instan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xl">✨</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#34364a]">Keren</p>
                    <p className="text-sm text-[#34364a]/70">Hasil aesthetic</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] hidden md:block">
              {/* Your existing image grid with animations */}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#34364a] mb-4">
            Tim Dibalik PicaPop
          </h2>
          <p className="text-lg text-[#34364a]/70 mb-12 max-w-2xl mx-auto">
            Kami adalah sekumpulan anak muda yang passionate dalam menciptakan 
            produk yang bermanfaat dan menyenangkan untuk digunakan.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#34364a] mb-1">{member.name}</h3>
                <p className="text-[#34364a]/70 mb-3">{member.role}</p>
                <p className="text-blue-600 text-sm">{member.social}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
