"use client";
import Button from "@/components/button";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, Clock, Sparkles, ArrowRight, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function Strip() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("t");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (template) {
      setSelectedTemplate(template);
    }
  }, [template]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-100/50 overflow-hidden pt-28">
      <Navbar />
      <div className="relative flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <motion.div
          className="w-full max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
              Siap Memulai Sesi Foto?
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-emerald-600">Panduan</span> Sesi Foto
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ikuti petunjuk sederhana ini untuk mendapatkan hasil foto terbaik
              dengan template pilihan kamu
            </p>
          </motion.div>

          {/* Instructions Cards */}
          <motion.div
            variants={itemVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {/* Rule 1 */}
            <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3 Detik</h3>
              <p className="text-gray-600">
                Kamu memiliki{" "}
                <span className="font-semibold text-emerald-600">3 detik</span>{" "}
                untuk setiap pose. Bersiaplah dengan gaya terbaik!
              </p>
            </motion.div>

            {/* Rule 2 */}
            <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2 Foto</h3>
              <p className="text-gray-600">
                Satu sesi mengambil{" "}
                <span className="font-semibold text-teal-600">2 foto</span>{" "}
                terbaik. Pastikan pose berbeda setiap capture!
              </p>
            </motion.div>

            {/* Rule 3 */}
            <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Gaya Terbaik
              </h3>
              <p className="text-gray-600">
                Siapkan{" "}
                <span className="font-semibold text-cyan-600">
                  pose dan ekspresi
                </span>{" "}
                terbaik kamu. Lighting yang baik akan membantu!
              </p>
            </motion.div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            variants={itemVariants}
            className="bg-emerald-200 rounded-2xl p-6 mb-8 border border-emerald-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-emerald-800">
                Tips untuk Hasil Maksimal
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-emerald-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Pastikan pencahayaan cukup terang</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Posisikan wajah di tengah frame</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Hindari gerakan berlebihan saat countdown</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Siapkan 2 pose berbeda sebelum mulai</span>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => {
                router.push("/photosession/instastory");
              }}
              // disabled={isStarting}
              className={`bg--600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group`}
              size="lg"
            >
              <>
                Mulai Sesi Foto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            </Button>

            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Kembali
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Pastikan browser mendapat izin akses kamera sebelum memulai sesi
              foto
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
