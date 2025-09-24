'use client';
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import { Camera, Clock, Sparkles, ArrowRight, Info } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GetStarted() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("t");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

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
        delayChildren: 0.2
      }
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

  const handleStart = () => {
    setIsStarting(true);
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          router.push("/photosession" + (template ? `?t=${template}` : ""));
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-100/50 overflow-hidden">

      <div className="relative flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <motion.div
          className="w-full max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Siap Memulai Sesi Foto?
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Panduan
              </span>{" "}
              Sesi Foto
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ikuti petunjuk sederhana ini untuk mendapatkan hasil foto terbaik dengan template pilihan kamu
            </p>
          </motion.div>

          {/* Selected Template Preview */}
          {selectedTemplate && (
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 max-w-md mx-auto">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden relative">
                    <Image 
                      src={`/template/${selectedTemplate}`}
                      alt="Selected Template"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-1">Template Terpilih:</p>
                    <p className="font-semibold text-gray-900">{selectedTemplate.replace(/\.(png|jpg|jpeg)$/i, '')}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-emerald-600">Siap digunakan</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Instructions Cards */}
          <motion.div
            variants={itemVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {/* Rule 1 */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3 Detik</h3>
              <p className="text-gray-600">
                Kamu memiliki <span className="font-semibold text-emerald-600">3 detik</span> untuk setiap pose. 
                Bersiaplah dengan gaya terbaik!
              </p>
            </motion.div>

            {/* Rule 2 */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3 Foto</h3>
              <p className="text-gray-600">
                Satu sesi mengambil <span className="font-semibold text-teal-600">3 foto</span> terbaik. 
                Pastikan pose berbeda setiap capture!
              </p>
            </motion.div>

            {/* Rule 3 */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gaya Terbaik</h3>
              <p className="text-gray-600">
                Siapkan <span className="font-semibold text-cyan-600">pose dan ekspresi</span> terbaik kamu. 
                Lighting yang baik akan membantu!
              </p>
            </motion.div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6 mb-8 border border-emerald-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-emerald-800">Tips untuk Hasil Maksimal</h3>
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
                <span>Siapkan 3 pose berbeda sebelum mulai</span>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={handleStart}
              disabled={isStarting}
              className={`bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group ${isStarting ? 'opacity-75 cursor-not-allowed' : ''}`}
              size="lg"
            >
              {isStarting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Mempersiapkan...
                </>
              ) : (
                <>
                  Mulai Sesi Foto
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>
            
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Kembali
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              Pastikan browser mendapat izin akses kamera sebelum memulai sesi foto
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-8xl sm:text-9xl font-bold text-white mb-4"
              key={countdown}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {countdown}
            </motion.div>
            <motion.p
              className="text-white text-xl sm:text-2xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Bersiap memulai sesi foto...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}