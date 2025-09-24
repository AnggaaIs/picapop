"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Download, Share2, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Toast from "../Toast";

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    label: string;
    filename: string;
    isNew: boolean;
    date: Date;
    isPartner: {
      status: boolean;
      partner_name: string;
    } | null;
  } | null;
}

export default function TemplatePreview({ isOpen, onClose, template }: TemplatePreviewProps) {
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'info' | 'warning' }>({
    isVisible: false,
    message: '',
    type: 'success'
  });
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle ESC key and touch events to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!template) return null;



  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleDownload = () => {
    try {
      // Create download link
      const link = document.createElement('a');
      link.href = `/template/${template.filename}`;
      link.download = template.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Template berhasil didownload!', 'success');
    } catch {
      showToast('Gagal mendownload template. Silakan coba lagi.', 'warning');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Template ${template.label}`,
          text: `Check out this amazing template: ${template.label}`,
          url: window.location.href,
        });
        showToast('Template berhasil dibagikan!', 'success');
      } catch (err) {
        // User cancelled sharing or error occurred
        if (err instanceof Error && err.name !== 'AbortError') {
          showToast('Gagal membagikan template.', 'warning');
        }
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link template berhasil disalin ke clipboard!', 'success');
      } catch {
        showToast('Gagal menyalin link template.', 'warning');
      }
    }
  };

  const handleFavorite = () => {
    // This could be connected to a favorites system later
    showToast('Template ditambahkan ke favorit! (Coming Soon)', 'info');
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-6xl h-[95vh] max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 p-3 sm:p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">🎨</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm sm:text-lg font-bold text-gray-900 truncate">{template.label}</h2>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {template.isPartner?.partner_name || 'PicaPop Template'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {/* Status Badges */}
                  {template.isPartner?.status && (
                    <div className="bg-emerald-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-emerald-700 font-medium text-xs sm:text-sm">
                      Partner
                    </div>
                  )}
                  {template.isNew && (
                    <div className="bg-teal-100 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-teal-700 font-medium text-xs sm:text-sm">
                      Baru
                    </div>
                  )}
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-1 sm:ml-2"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col xl:flex-row overflow-hidden h-full">
              {/* Image Preview - Full Size */}
              <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 sm:p-4 lg:p-6 min-h-[50vh] xl:min-h-[60vh]">
                <motion.div
                  className="relative w-full h-full min-h-[40vh] max-h-[60vh] xl:max-h-[75vh] flex items-center justify-center overflow-hidden cursor-pointer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  onClick={toggleZoom}
                >
                  <motion.div 
                    className={`relative ${isZoomed ? 'w-full h-full' : 'w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl aspect-[3/4]'}`}
                    animate={{
                      scale: isZoomed ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Image
                      src={`/template/${template.filename}`}
                      alt={template.label}
                      fill
                      className="object-contain transition-all duration-300 rounded-lg"
                      priority
                      sizes="(max-width: 640px) 95vw, (max-width: 1280px) 60vw, 50vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR8WFh4bHRseHR0eHh4eHh4eHh4eHh4eHx4eHx4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  </motion.div>
                    
                  {/* Zoom Controls */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <div className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                      {isZoomed ? '🔍➖' : '🔍➕'} {isZoomed ? 'Zoom Out' : 'Zoom In'}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Details & Actions */}
              <div className="w-full xl:w-80 xl:min-w-80 p-3 sm:p-4 lg:p-6 bg-white border-t xl:border-t-0 xl:border-l border-gray-100 overflow-y-auto max-h-[40vh] xl:max-h-full">
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Template Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Detail Template</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Nama:</span>
                          <span className="font-medium">{template.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Creator:</span>
                          <span className="font-medium">{template.isPartner?.partner_name || 'PicaPop'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="font-medium">PNG/JPG</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kualitas:</span>
                          <span className="font-medium">HD</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Fitur</h3>
                      <div className="space-y-2">
                        {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Upload foto mudah</span>
                        </div> */}
                        {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Kustomisasi posisi</span>
                        </div> */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Download gratis</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Tanpa watermark</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 sm:space-y-3">
                    {/* <Button
                      onClick={handleUseTemplate}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm sm:text-base py-2.5 sm:py-3"
                      size="md"
                    >
                      Gunakan Template
                    </Button> */}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span className="text-xs sm:text-sm text-gray-700">Download</span>
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        <span className="text-xs sm:text-sm text-gray-700">Share</span>
                      </button>
                    </div>

                    <button 
                      onClick={handleFavorite}
                      className="flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      <span className="text-xs sm:text-sm text-gray-700">Simpan ke Favorit</span>
                    </button>
                  </div>

                  {/* Tips */}
                  <div className="bg-emerald-50 rounded-lg p-2.5 sm:p-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-emerald-800 mb-1">💡 Tips</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Gunakan foto dengan resolusi tinggi untuk hasil terbaik. Pastikan wajah terlihat jelas dan tidak terpotong.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Toast Notification - Outside AnimatePresence */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </AnimatePresence>
  );
}