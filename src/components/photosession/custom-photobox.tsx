"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outfit } from "next/font/google";
import { ClipboardCopy } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import CopyAlert from "../copy-alert";

interface CustomPhotoboxProps {
  capturedImages: string[];
  setStripCount: (count: number) => void;
}

const onest = Outfit({
  subsets: ["latin"],
});

export default function CustomPhotobox({
  capturedImages,
  setStripCount: setStripCountProp,
}: CustomPhotoboxProps) {
  const [stripCount, setStripCount] = useState<number>(3);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [finalPhotostrip, setFinalPhotostrip] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const stripCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const safeImages = Array.isArray(capturedImages) ? capturedImages : [];

  const isDarkColor = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  const generatePhotostrip = () => {
    if (safeImages.length < stripCount) return;

    const stripCanvas = stripCanvasRef.current;
    if (!stripCanvas) return;

    const dpr = window.devicePixelRatio || 1;
    const dpi = 300;
    const cmToPx = (cm: number) => Math.round((cm * dpi) / 2.54);

    const photoSize = cmToPx(4);
    const margin = cmToPx(0.2);
    const verticalMargin = cmToPx(0.5);
    const padding = cmToPx(0.3);
    const footerSpace = cmToPx(1);

    const columns = stripCount === 6 ? 2 : 1;
    const rows = Math.ceil(stripCount / columns);

    const logicalWidth =
      columns * photoSize + (columns - 1) * margin + padding * 2;
    const logicalHeight =
      rows * photoSize +
      (rows - 1) * verticalMargin +
      padding * 2 +
      footerSpace;

    stripCanvas.width = logicalWidth * dpr;
    stripCanvas.height = logicalHeight * dpr;

    stripCanvas.style.width = `${logicalWidth}px`;
    stripCanvas.style.height = `${logicalHeight}px`;

    const ctx = stripCanvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    const usableImages = safeImages.slice(0, stripCount);
    const imagePromises = usableImages.map((src) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = src;
      });
    });

    const darkenColor = (color: string, percent: number) => {
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
      r = Math.round(r * (1 - percent));
      g = Math.round(g * (1 - percent));
      b = Math.round(b * (1 - percent));
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    };

    const darkStrokeColor = darkenColor(backgroundColor, 0.25);

    Promise.all(imagePromises).then((images) => {
      images.forEach((img, index) => {
        const originalWidth = img.width;
        const originalHeight = img.height;

        let drawWidth = photoSize;
        let drawHeight = photoSize;
        let offsetX = 0;
        let offsetY = 0;

        const aspectRatio = originalWidth / originalHeight;

        if (aspectRatio > 1) {
          drawHeight = photoSize / aspectRatio;
          offsetY = (photoSize - drawHeight) / 2;
        } else {
          drawWidth = photoSize * aspectRatio;
          offsetX = (photoSize - drawWidth) / 2;
        }

        const col = stripCount === 6 ? index % 2 : 0;
        const row = stripCount === 6 ? Math.floor(index / 2) : index;

        const x = padding + col * (photoSize + margin) + offsetX;
        const y = padding + row * (photoSize + verticalMargin) + offsetY;

        const cornerRadius = cmToPx(0.2);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + drawWidth - cornerRadius, y);
        ctx.quadraticCurveTo(x + drawWidth, y, x + drawWidth, y + cornerRadius);
        ctx.lineTo(x + drawWidth, y + drawHeight - cornerRadius);
        ctx.quadraticCurveTo(
          x + drawWidth,
          y + drawHeight,
          x + drawWidth - cornerRadius,
          y + drawHeight
        );
        ctx.lineTo(x + cornerRadius, y + drawHeight);
        ctx.quadraticCurveTo(
          x,
          y + drawHeight,
          x,
          y + drawHeight - cornerRadius
        );
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + drawWidth - cornerRadius, y);
        ctx.quadraticCurveTo(x + drawWidth, y, x + drawWidth, y + cornerRadius);
        ctx.lineTo(x + drawWidth, y + drawHeight - cornerRadius);
        ctx.quadraticCurveTo(
          x + drawWidth,
          y + drawHeight,
          x + drawWidth - cornerRadius,
          y + drawHeight
        );
        ctx.lineTo(x + cornerRadius, y + drawHeight);
        ctx.quadraticCurveTo(
          x,
          y + drawHeight,
          x,
          y + drawHeight - cornerRadius
        );
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = darkStrokeColor;
        ctx.stroke();
        ctx.restore();
      });

      const fontSize = cmToPx(0.4);
      ctx.font = `${fontSize}px ${onest.style.fontFamily}`;
      ctx.fillStyle = isDarkColor(backgroundColor) ? "#ffffff" : "#000000";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("PicaPop", logicalWidth / 2, logicalHeight - cmToPx(0.6));

      setFinalPhotostrip(stripCanvas.toDataURL("image/png", 1.0));
    });
  };

  useEffect(() => {
    setLink(null);
    setShowQR(false);
  }, [backgroundColor]);

  useEffect(() => {
    if (safeImages.length >= stripCount) {
      generatePhotostrip();
    }
  }, [backgroundColor, stripCount, safeImages.length]);

  const handleSelectStrip = (count: number) => {
    setStripCountProp(count);
    setStripCount(count);
  };

  const downloadPhotostrip = () => {
    if (!finalPhotostrip) return;

    const link = document.createElement("a");
    link.download = `custom-photostrip-${new Date().getTime()}.png`;
    link.href = finalPhotostrip;
    link.click();
  };

  const handleGetLink = async () => {
    if (!finalPhotostrip) return;

    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_SAVE_IMAGE_TOKEN;

      const response = await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageBase64: finalPhotostrip }),
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

  const handleCopyLink = () => {
    if (link) {
      navigator.clipboard.writeText(getLinkUrl());
    }

    setShowCopyAlert(true);
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
    <div className="mt-5">
      <div className="p-4 bg-gray-100 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Custom Photostrip</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Photos
            </label>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg ${
                  stripCount === 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleSelectStrip(3)}
              >
                3 Photos
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  stripCount === 4 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleSelectStrip(4)}
              >
                4 Photos
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  stripCount === 6 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleSelectStrip(6)}
              >
                6 Photos
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-sm">{backgroundColor}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">
            Photos captured: {safeImages.length} / {stripCount}
          </p>
          {safeImages.length > 0 && (
            <motion.div
              className="flex gap-2 overflow-x-auto pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {safeImages.slice(0, stripCount).map((img, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gray-200 rounded overflow-hidden border border-gray-300"
                >
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {Array.from({
                length: Math.max(0, stripCount - safeImages.length),
              }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="w-16 h-16 bg-gray-200 rounded border border-gray-300 flex items-center justify-center"
                >
                  <span className="text-gray-400 text-xs">+</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {finalPhotostrip && safeImages.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Your Custom Photostrip</h3>
            <div className="bg-gray-100 p-4 rounded-xl flex justify-center">
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
                    className="w-full h-full flex items-center justify-center"
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={finalPhotostrip}
                      alt="Generated Photostrip"
                      className="max-h-96 w-auto shadow-lg mx-auto"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-col gap-2 mt-4 max-w-[200px]">
            {finalPhotostrip && safeImages.length > 0 && (
              <>
                <div className="flex flex-col gap-2">
                  {!link && (
                    <button
                      onClick={handleGetLink}
                      className={`px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex-1 ${
                        loading ? "opacity-50" : ""
                      }`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          Saving...
                        </span>
                      ) : (
                        "Get Link"
                      )}
                    </button>
                  )}
                  <button
                    onClick={downloadPhotostrip}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex-1"
                  >
                    Download
                  </button>
                </div>

                {link && (
                  <>
                    <div className="flex space-x-2 items-center">
                      <input
                        type="text"
                        value={getLinkUrl()}
                        readOnly
                        className="w-full p-2 bg-gray-200 border rounded-md"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="btn btn-ghost p-2 text-gray-700 hover:text-gray-900"
                        title="Copy to clipboard"
                      >
                        <ClipboardCopy size={18} />
                        <CopyAlert
                          show={showCopyAlert}
                          onClose={() => setShowCopyAlert(false)}
                        />
                      </button>
                    </div>
                    <button
                      onClick={() => setShowQR((prev) => !prev)}
                      className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                    >
                      {showQR ? "Hide QR" : "Show QR Code"}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <canvas ref={stripCanvasRef} style={{ display: "none" }} />
    </div>
  );
}
