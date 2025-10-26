"use client";

import { HashLoader } from "react-spinners";
import { useState, useRef } from "react";
import { ClipboardCopy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import QRCodeStyling from "qr-code-styling";
import Button from "../button";
import CopyAlert from "../copy-alert";

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
  const [showCopyAlert, setShowCopyAlert] = useState(false);

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

  const handleCopyLink = () => {
    if (link) {
      navigator.clipboard.writeText(getLinkUrl());
    }

    setShowCopyAlert(true);
  };

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
            ease: "easeOut", // transisi lembut (ease-out):contentReference[oaicite:4]{index=4}
          },
        },
      }}
      className="group rounded-xl overflow-hidden bg-white transition-all hover:ring-2 hover:ring-blue-700"
    >
      <div className="relative aspect-[4/5] w-full">
        <AnimatePresence mode="wait">
          {showQR && link ? (
            <motion.div
              key="qr"
              className="flex items-center justify-center w-full h-full"
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
              transition={{ duration: 0.5 }}
            >
              {image ? (
                <img
                  src={image}
                  alt={`Processed ${index}`}
                  className="object-contain w-full h-full"
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

      <div className="p-3 bg-white space-y-2">
        {isApplied && link && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={getLinkUrl()}
              readOnly
              className="w-full p-2 bg-base-200 border rounded-md text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="btn btn-primary min-w-[100px] sm:min-w-[auto] px-4 py-2 whitespace-nowrap"
              title="Copy to clipboard"
            >
              <ClipboardCopy size={18} />
              <span className="ml-2">Copy</span>
            </button>
            <CopyAlert
              show={showCopyAlert}
              onClose={() => setShowCopyAlert(false)}
            />
          </div>
        )}

        {!isApplied && onApply && (
          <Button onClick={onApply} className="text-sm w-full">
            Pakai template
          </Button>
        )}

        {isApplied && !link && (
          <Button
            onClick={handleGetLink}
            className={`btn w-full text-sm ${loading ? "btn-disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Dapatkan link"}
          </Button>
        )}

        {isApplied && (
          <>
            <a
              href={image}
              download={`PicaPop-${index + 1}.png`}
              className="btn text-sm btn-outline border border-blue-700 hover:bg-[#34364a] hover:text-white hover:border-[#34364a] text-[#34364a] rounded-lg w-full"
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
    </motion.div>
  );
}
