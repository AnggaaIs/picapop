"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../button";

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

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const router = useRouter();

  return (
    <>
      <motion.div
        className="w-full mt-10 p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {templates.length > 0 ? (
          templates?.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative w-full cursor-pointer bg-white rounded-xl p-4
                hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                transition-all duration-300 ease-in-out
                border-2 border-transparent
                hover:border-[#34364a]/10
                flex flex-col
              `}
            >
              <div className="flex flex-col items-center justify-between h-full gap-4">
                <div className="text-center space-y-2 w-full">
                  <p className="text-sm md:text-md font-semibold text-[#34364a] group-hover:text-[#34364a] truncate">
                    {template.label}
                  </p>
                  {template.isPartner?.status ? (
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#dee3ff] px-3 py-1 rounded-xl text-[#677ffb] font-semibold text-[10px]"
                      >
                        Special Partner
                      </motion.div>
                    </div>
                  ) : template.isNew ? (
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-600 rounded-xl"
                      >
                        Baru ditambahkan
                      </motion.div>
                    </div>
                  ) : null}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    src={`/template/${template.filename}`}
                    alt={template.label}
                    width={300}
                    height={400}
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR8WFh4bHRseHR0eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    loading={index < 4 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 25vw"
                  />
                </motion.div>

                <div className="pt-2 space-y-1 w-full mt-auto">
                  <p className="text-xs font-semibold text-[#34364a] text-center truncate">
                    {template.isPartner?.partner_name || 'PicaPop'}
                  </p>
                  <p className="text-xs text-[#34364a]/60 text-center">
                    {new Date(template.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          // Update skeleton to match new dimensions
          [...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 flex flex-col"
            >
              <div className="space-y-3 flex-1">
                <div className="h-4 w-24 mx-auto animate-pulse bg-[#34364a]/5 rounded-full" />
                <div className="w-full pt-[133%] relative">
                  <div className="absolute inset-0 animate-pulse bg-[#34364a]/5 rounded-lg" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-2 w-20 mx-auto animate-pulse bg-[#34364a]/5 rounded-full" />
                  <div className="h-2 w-32 mx-auto animate-pulse bg-[#34364a]/5 rounded-full" />
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
        <div className="bg-gradient-to-t from-white via-white to-transparent h-24 p-5">
          <div className="max-w-xl mx-auto">
            <Button
              size='sm'
              onClick={() => router.push("/getstarted")}
              className="w-full shadow-lg"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}