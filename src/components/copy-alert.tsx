"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function CopyAlert({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="alert"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="alert alert-success alert-soft fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg"
        >
          <BadgeCheck className="w-5 h-5" />
          <span>Link copied!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
