"use client";

import { HashLoader } from "react-spinners";
import { useState, useRef } from "react";
import { ClipboardCopy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import QRCodeStyling from "qr-code-styling";

/* eslint-disable @next/next/no-img-element */
export default function PreviewCard({
  image,
  index,
  onApply,
  isApplied,
}: {
  image: string;
  index: number;
  onApply?: () => void;
  isApplied?: boolean;
}) {
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLDivElement | null>(null);

  const handleGetLink = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_SAVE_IMAGE_TOKEN;

      const response = await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageBase64: image }),
      });

      const data = await response.json();

      if (data.success) {
        setLink(data.data.linkId);
      } else {
        console.error("Failed to save image");
      }
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLinkUrl = () => `${window.location.origin}/strip/${link}`;

  const generateQrCode = (url: string, container: HTMLDivElement) => {
    container.innerHTML = "";

    const qrCodeInstance = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: url,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#000000",
      },
      dotsOptions: {
        type: "classy",
        color: "#000000",
      },
      backgroundOptions: {
        round: 0.1,
        color: "#ffffff",
      },
    });

    qrCodeInstance.append(container);
    return qrCodeInstance;
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: 'easeOut'            // transisi lembut (ease-out):contentReference[oaicite:4]{index=4}
          }
        }
      }}

      className="group rounded-xl overflow-hidden border border-base-200 shadow-sm transition-all hover:ring-2 hover:ring-primary/30" >
      <div className="relative aspect-[4/5] w-full">
        <AnimatePresence mode="wait">
          {showQR && link ? (
            <motion.div
              key="qr"
              className="flex items-center justify-center w-full h-full bg-base-200"
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -180 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                if (qrRef.current && link) {
                  const url = getLinkUrl();
                  generateQrCode(url, qrRef.current);
                }
              }}
            >
              <div
                ref={qrRef}
                className="max-w-xs w-[90%] aspect-square rounded-md flex items-center justify-center mx-auto"
              />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              className="w-full h-full"
              // initial={{ opacity: 0, rotateY: 180 }}
              // animate={{ opacity: 1, rotateY: 0 }}
              // exit={{ opacity: 0, rotateY: -180 }}
              transition={{ duration: 0.5 }}
            >
              {image ? (
                <img
                  src={image}
                  alt={`Processed ${index}`}
                  className="object-contain w-full h-full bg-base-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-base-200">
                  <HashLoader
                    size={20}
                    color={
                      getComputedStyle(document.documentElement)
                        .getPropertyValue("--color-base-content")
                        .trim() || "#000"
                    }
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 bg-base-100 space-y-2">
        {isApplied && link && (
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={getLinkUrl()}
              readOnly
              className="w-full p-2 bg-base-200 border rounded-md"
            />
            <button
              onClick={() => navigator.clipboard.writeText(getLinkUrl())}
              className="btn btn-ghost p-2"
              title="Copy to clipboard"
            >
              <ClipboardCopy size={18} />
            </button>
          </div>
        )}

        {!isApplied && onApply && (
          <button onClick={onApply} className="btn btn-primary w-full">
            Apply
          </button>
        )}

        {isApplied && !link && (
          <button
            onClick={handleGetLink}
            className={`btn w-full ${loading ? "btn-disabled" : "btn-primary"}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Get Link"}
          </button>
        )}

        {isApplied && (
          <>
            <a
              href={image}
              download={`PicaPop-${index + 1}.png`}
              className="btn btn-outline w-full"
            >
              Download
            </a>

            {link && (
              <button
                onClick={() => setShowQR((prev) => !prev)}
                className="btn btn-accent w-full"
              >
                {showQR ? "Hide QR" : "See QR"}
              </button>
            )}
          </>
        )}
      </div>
    </motion.div >
  );
}
