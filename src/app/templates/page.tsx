'use client'
import { motion } from "framer-motion";
import TemplateList from "@/components/templates/TemplateList";

export default function Template() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-100/50">

      {/* Hero Section - More Compact */}
      <div className="relative overflow-hidden">
        <motion.div
          className="container mx-auto px-4 py-12 sm:py-16 max-w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Koleksi Template Foto Strip
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              <span className="text-emerald-500">
                Template Foto
              </span>{" "}
              Terbaik
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed"
            >
              Pilih template yang sesuai dengan gayamu dan buat momen spesialmu lebih berkesan
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Templates Grid Section */}
      <motion.div
        className="relative container mx-auto px-4 pb-16 overflow-x-hidden max-w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto overflow-x-hidden">
          <TemplateList />
        </div>
      </motion.div>
    </div>
  );
}