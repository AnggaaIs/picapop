"use client";
import Button from "@/components/button";
import FeaturesLayout from "@/components/features.layout";
import PartnersItems from "@/components/partner.items";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Add this import

export default function Home() {
  const router = useRouter();
  const [templates, setTemplates] =
    useState<{ label: string; filename: string }[]>();

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-100/50 overflow-x-hidden pt-14">
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="">Satu Klik,</span>
                  <br />
                  <span className="text-gray-900">Foto Makin Aesthetic!</span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Transformasi foto biasa jadi karya seni dalam sekejap! Pilih
                  template, ambil foto, dan bagikan hasilnya dengan mudah.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="group relative tracking-wide overflow-hidden text-white px-8 py-4 rounded-xl shadow-md transform hover:scale-100 transition-all duration-300"
                  onClick={() => router.push("/getstarted")}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Gas jepret
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2  text-gray-700 hover:border-emerald-500 hover:text-emerald-600 px-8 py-4 rounded-xl transition-all duration-300"
                  onClick={() => router.push("/templates")}
                >
                  List Template
                </Button>
              </motion.div>
            </motion.div>

            {/* Image Showcase */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full max-w-lg h-[500px] lg:h-[600px] mx-4 overflow-hidden">
                {/* Template Cards with Modern Design */}
                <motion.div
                  className="absolute top-8 left-4 sm:left-8 w-28 h-36 sm:w-32 sm:h-40 lg:w-40 lg:h-48 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform -rotate-12 hover:rotate-0 transition-all duration-500"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -12, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Image
                    src="/example/template1.png"
                    alt="Template 1"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                </motion.div>

                <motion.div
                  className="absolute top-16 right-4 sm:right-8 w-28 h-36 sm:w-32 sm:h-40 lg:w-40 lg:h-48 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform rotate-12 hover:rotate-0 transition-all duration-500"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  initial={{ opacity: 0, rotate: 12, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 12, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Image
                    src="/example/template2.png"
                    alt="Template 2"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                </motion.div>

                <motion.div
                  className="absolute bottom-32 left-8 sm:left-16 w-28 h-36 sm:w-32 sm:h-40 lg:w-40 lg:h-48 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform rotate-6 hover:rotate-0 transition-all duration-500"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  initial={{ opacity: 0, rotate: 6, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 6, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Image
                    src="/example/template3.png"
                    alt="Template 3"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                </motion.div>

                <motion.div
                  className="absolute bottom-16 right-8 sm:right-16 w-28 h-36 sm:w-32 sm:h-40 lg:w-40 lg:h-48 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform -rotate-6 hover:rotate-0 transition-all duration-500"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -6, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <Image
                    src="/example/template4.png"
                    alt="Template 4"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section
        className="relative py-20 lg:py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-gray-300 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-emerald-500">Kolaborasi</span> yang
              Menginspirasi
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Bersama mitra terpercaya, kami menghadirkan pengalaman kreatif
              yang tak terlupakan untuk setiap moment berharga Anda
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Partners Container with Modern Card Design */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 lg:p-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
                <PartnersItems />
              </div>
            </div>

            {/* Decorative Elements - Adjusted for mobile */}
            <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-cyan-100 rounded-full opacity-30 blur-xl"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm tracking-wide font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Kenapa harus PicaPop?
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-gray-900">Pose Ngawur,</span>
              <br />
              <span className="text-emerald-600">Hasil Tetap Keren!</span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Kamu yang kaku depan kamera? Nggak masalah! Di PicaPop, asal
              jepret aja. Sisanya biar template lucu kami yang bantu kamu tampil
              memukau
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FeaturesLayout />
          </motion.div>
        </div>
      </motion.section>

      {/* Templates Showcase Section */}
      <motion.section
        className="relative py-20 lg:py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex tracking-wide items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Koleksi Eksklusif
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-emerald-600">Template Foto</span> Terbaik
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Pilihan template berkualitas tinggi yang siap membuat foto Anda
              tampil lebih menarik dan berkesan
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Templates Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {templates?.slice(0, 4).map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative bg-white rounded-2xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={`/template/${template.filename}`}
                      alt={template.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 mb-4 mx-4">
                        <p className="text-sm font-semibold text-gray-800 text-center">
                          Preview
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4 lg:p-6">
                    <h3 className="font-bold text-gray-900 text-sm lg:text-base mb-2 text-center line-clamp-2">
                      {template.label}
                    </h3>
                    <div className="flex items-center justify-center">
                      <span className="tracking-wider inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Premium
                      </span>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  {/* <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-200 transition-colors duration-300"></div> */}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative inline-block">
              <Button
                size="lg"
                className="group text-white px-12 py-4 rounded-xl transition-all duration-300"
                onClick={() => router.push("/templates")}
              >
                <span className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Liat semua template yuk
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
