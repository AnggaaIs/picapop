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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-100/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
      <div className="absolute top-20 -right-20 w-72 h-72 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-green-400/12 to-cyan-400/12 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.section 
            className="relative mb-24"
            variants={itemVariants}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ✨ Tentang PicaPop
                </motion.div>
                
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Wujudkan Setiap Momen Jadi 
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {" "}Lebih Berkesan
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  PicaPop hadir untuk mengubah cara kamu mengabadikan momen. Dengan teknologi mutakhir 
                  dan template yang selalu update, kami memastikan setiap jepretan fotomu menjadi karya 
                  seni yang unik dan memukau.
                </motion.p>

                <motion.div 
                  className="grid sm:grid-cols-3 gap-6 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mb-3">
                      <span className="text-emerald-600 text-xl">🎯</span>
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Simple</p>
                    <p className="text-sm text-gray-600">Tanpa ribet</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mb-3">
                      <span className="text-teal-600 text-xl">⚡</span>
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Cepat</p>
                    <p className="text-sm text-gray-600">Proses instan</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center mb-3">
                      <span className="text-cyan-600 text-xl">✨</span>
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">Keren</p>
                    <p className="text-sm text-gray-600">Hasil aesthetic</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="relative hidden lg:block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative w-full h-[500px]">
                  {/* Banner Image */}
                  <motion.div
                    className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/banner-about-us.png"
                      alt="About PicaPop"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-60"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full opacity-40"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section 
            className="relative"
            variants={itemVariants}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                👥 Tim Kreatif
              </motion.div>

              <motion.h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Tim Dibalik
                </span>{" "}
                PicaPop
              </motion.h2>
              
              <motion.p 
                className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Kami adalah sekumpulan anak muda yang passionate dalam menciptakan 
                produk yang bermanfaat dan menyenangkan untuk digunakan.
              </motion.p>
            </div>

            {/* Team Grid */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-md hover:bg-white/90"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Profile Image */}
                  <div className="relative w-40 h-40 lg:w-48 lg:h-48 mx-auto mb-6">
                    <div className="relative w-full h-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">
                      {member.role}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">
                      {member.social}
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-200 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Decoration */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30"></div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
