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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f6f8fd]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-[#34364a]/[0.02] -z-1" />

        <motion.div
          className="container mx-auto px-4 py-16 sm:py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold text-[#34364a] mb-6"
            >
              Template Foto
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-[#34364a]/80 mb-8"
            >
              Pilih template yang sesuai dengan gayamu dan buat momen spesialmu
              lebih berkesan
            </motion.p>


          </div>
        </motion.div>
      </div>

      {/* Templates Grid Section */}
      <motion.div
        className="container mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <TemplateList />
        </div>
      </motion.div>
    </div>
  );
}