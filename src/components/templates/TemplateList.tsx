"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../button";
import TemplatePreview from "./TemplatePreview";

export default function TemplateList() {
  const [templates, setTemplates] = useState<{
    label: string;
    filename: string;
    isNew: boolean;
    date: Date;
    isPartner: {
      status: boolean;
      partner_name: string;
    } | null;
  }[]>([]);
  
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const router = useRouter();

  const handleOpenPreview = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <motion.div
        className="w-full max-w-full mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {templates.length > 0 ? (
          templates?.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group relative cursor-pointer bg-white/70 backdrop-blur-sm rounded-xl p-3 hover:shadow-md transition-all duration-300 border border-gray-100 hover:bg-white/90 flex flex-col w-full max-w-full overflow-hidden"
              onClick={() => handleOpenPreview(template)}
            >
              {/* Template Image */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-3"
              >
                <Image
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  src={`/template/${template.filename}`}
                  alt={template.label}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR8WFh4bHRseHR0eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  loading={index < 8 ? "eager" : "lazy"}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                
                {/* Status Badge */}
                {template.isPartner?.status ? (
                  <div className="absolute top-2 left-2">
                    <div className="bg-emerald-100 px-2 py-1 rounded-lg text-emerald-700 font-medium text-[8px] sm:text-[9px]">
                      Partner
                    </div>
                  </div>
                ) : template.isNew ? (
                  <div className="absolute top-2 left-2">
                    <div className="bg-teal-100 px-2 py-1 rounded-lg text-teal-700 font-medium text-[8px] sm:text-[9px]">
                      Baru
                    </div>
                  </div>
                ) : null}

                {/* Preview Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-xs font-medium text-gray-800 flex items-center gap-1">
                      Preview
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Template Info - Compact */}
              <div className="flex-1 space-y-1">
                <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                  {template.label}
                </h3>
                <p className="text-[10px] text-gray-500 truncate">
                  {template.isPartner?.partner_name || 'PicaPop'}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-emerald-200 transition-colors duration-300"></div>
            </motion.div>
          ))
        ) : (
          // Compact skeleton loading
          [...Array(18)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-gray-100 flex flex-col w-full max-w-full overflow-hidden"
            >
              <div className="space-y-2 flex-1">
                {/* Image skeleton */}
                <div className="w-full aspect-[3/4] relative">
                  <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg" />
                </div>
                {/* Text skeleton */}
                <div className="space-y-1">
                  <div className="h-3 w-full animate-pulse bg-gray-200 rounded" />
                  <div className="h-2 w-2/3 animate-pulse bg-gray-200 rounded" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <motion.div
        className="sticky bottom-0 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-t from-white via-white to-transparent h-20 p-4">
          <div className="max-w-md mx-auto">
            <Button
              size='md'
              onClick={() => router.push("/getstarted")}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg rounded-xl"
            >
              <span className="flex items-center gap-2 justify-center">
                Mulai Buat Foto
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Template Preview Modal */}
      <TemplatePreview
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        template={selectedTemplate}
      />
    </>
  );
}