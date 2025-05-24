'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#f6f8fd] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 max-w-7xl mx-auto">
        <div className="absolute left-10 top-20 w-20 h-20 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute right-10 top-40 w-20 h-20 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute left-1/2 bottom-20 w-20 h-20 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container flex items-center justify-center px-4 mx-auto min-h-screen relative z-10">
        <motion.div 
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative mx-auto mb-8 text-[150px] md:text-[200px] leading-none font-black text-[#34364a]/5"
          >
            404
          </motion.div>

          <motion.div 
            className="relative -mt-20 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-2">🤔</div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
          </motion.div>

          <motion.h1 
            className="mb-6 text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#34364a] to-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Oops!
          </motion.h1>

          <motion.p 
            className="mb-8 text-xl md:text-2xl font-medium text-[#34364a]/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Halaman yang kamu cari hilang di dunia maya
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-2 text-sm rounded-xl bg-[#34364a] text-white font-medium transition-all hover:bg-[#34364a]/90 hover:scale-105 hover:shadow-lg"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Kembali ke Beranda
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}