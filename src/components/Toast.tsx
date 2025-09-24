"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Info, AlertCircle } from "lucide-react";

interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'info' | 'warning';
  onClose: () => void;
}

export default function Toast({ isVisible, message, type = 'success', onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    info: Info,
    warning: AlertCircle,
  };

  const colors = {
    success: 'from-emerald-500 to-teal-500',
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-orange-500',
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] max-w-sm">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors[type]} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 leading-relaxed">
                  {message}
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}