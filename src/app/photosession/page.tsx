"use client";
import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import Navbar from "../components/Navbar";
import { ChevronDown } from "lucide-react";
import { replaceBlackWithImages } from "@/utils/image";
import { HashLoader } from "react-spinners";

const templates = [
  {
    value: 1,
    label: "Template 1",
  },
  {
    value: 2,
    label: "Template 2",
  },
  {
    value: 3,
    label: "Template 3",
  },
  {
    value: 4,
    label: "Template 4",
  },
  {
    value: 5,
    label: "Template 5",
  },
];

export default function PhotoSession() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(
    undefined
  );
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [template, setTemplate] = useState(0);

  // filter
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initializeCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (navigator.mediaDevices?.enumerateDevices) {
          const allDevices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = allDevices.filter(
            (device) => device.kind === "videoinput"
          );

          setDevices(videoDevices);

          if (videoDevices.length > 0 && !selectedDeviceId) {
            setSelectedDeviceId(videoDevices[0].deviceId);
          }

          setIsInitialized(true);
        } else {
          setError("Device enumeration is not supported on this browser.");
        }
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error accessing camera. Make sure permissions are allowed.");
      }
    };

    initializeCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedDeviceId]);

  useEffect(() => {
    if (!isInitialized || !selectedDeviceId) return;

    const switchCamera = async () => {
      try {
        const currentStream = videoRef.current?.srcObject as MediaStream;

        if (currentStream) {
          currentStream.getTracks().forEach((track) => track.stop());
        }

        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: selectedDeviceId },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to switch camera. Please try again.");
      }
    };

    switchCamera();
  }, [selectedDeviceId, isInitialized]);

  useEffect(() => {
    if (!selectedDeviceId || error) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        startAutoCapture();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, selectedDeviceId]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && video && context) {
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const canvasWidth = video.videoWidth;
      const canvasHeight = canvasWidth / videoAspectRatio;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      if (isFrontCamera) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      switch (filter) {
        case "grayscale":
          applyGrayscale(context, canvas);
          break;
        case "sepia":
          applySepia(context, canvas);
          break;
        case "saturate-200":
          applySaturate(context, canvas, 2);
          break;
        case "invert":
          applyInvert(context, canvas);
          break;
        default:
          break;
      }

      setCapturedImages((prevImages) => [
        ...prevImages,
        canvas.toDataURL("image/png"),
      ]);
    }
  };

  const startAutoCapture = async () => {
    if (isCapturing) return;
    setCapturedImages([]);
    setProcessedImage(null);
    setIsCapturing(true);
    for (let i = 0; i < 3; i++) {
      for (let count = 3; count > 0; count--) {
        setCountdown(count);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setCountdown("Smile :)");
      setTimeout(() => captureImage(), 500);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setCountdown(null);
      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    setIsCapturing(false);
    setCountdown(null);
  };

  const handleCameraSelect = (deviceId: string) => {
    const selectedDevice = devices.find((d) => d.deviceId === deviceId);
    const isFront =
      selectedDevice?.label?.toLowerCase().includes("front") ||
      selectedDevice?.label?.toLowerCase().includes("user") ||
      false;
    setIsFrontCamera(isFront);
    setSelectedDeviceId(deviceId);
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleProcessImage = () => {
    setPreviewLoading(true);
    replaceBlackWithImages(
      `/template/template${template === 0 ? 1 : template}.png`,
      capturedImages,
      setProcessedImage
    ).finally(() => setPreviewLoading(false));
  };

  const handleTemplateSelect = (template: number) => {
    setTemplate(template);
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <>
      <Navbar />
      <div className="p-5">
        {countdown == null ? (
          <div className="pb-5">
            <h2 className="text-3xl font-semibold text-center">
              Photo Session
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-center text-6xl font-bold">
            {countdown}
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Tidak mendapatkan akses ke kamera.</span>
          </div>
        )}
        {!error && (
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-xs dropdown dropdown-click">
              <div
                tabIndex={0}
                role="button"
                className="btn flex items-center justify-between gap-2"
              >
                {devices.find((d) => d.deviceId === selectedDeviceId)?.label ||
                  "Pilih Kamera"}
                <ChevronDown
                  size={18}
                  className="opacity-70 transition-transform duration-200"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content w-full menu p-2 shadow-lg bg-base-200 rounded-box max-w-xs transition-all duration-200"
              >
                {devices.length > 0 ? (
                  devices.map((device) => (
                    <li key={device.deviceId}>
                      <button
                        disabled={device.deviceId === selectedDeviceId}
                        className="btn btn-block btn-ghost justify-start"
                        onClick={() => handleCameraSelect(device.deviceId)}
                      >
                        {device.label || `Camera ${device.deviceId}`}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 px-4 py-2">Tidak ada kamera</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-4 gap-5 mt-5">
          <div className="aspect-4/3 relative col-span-2">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`${filter} w-full h-full rounded-xl border-1 object-cover`}
              style={{ transform: isFrontCamera ? "scaleX(-1)" : "none" }}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.width = videoRef.current.videoWidth;
                  videoRef.current.height = videoRef.current.videoHeight;
                }
              }}
            />
          </div>
          <div className="col-span-2 scale-100">
            <canvas ref={canvasRef} className="hidden" />
            {capturedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-5 mt-4">
                {capturedImages.map((image, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={image}
                    alt={`Captured ${index + 1}`}
                    className="rounded-xl aspect-[4/3] object-cover w-full"
                  />
                ))}
              </div>
            )}
            {capturedImages.length === 3 && (
              <div className="flex justify-center mt-5">
                <div className="w-full dropdown dropdown-click z-20">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn flex items-center justify-between gap-2"
                  >
                    {template === 0 ? "Pilih Template" : `Template ${template}`}
                    <ChevronDown
                      size={18}
                      className="opacity-70 transition-transform duration-200"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content w-full absolute menu p-2 shadow-lg bg-base-200 rounded-box transition-all duration-200"
                  >
                    {templates.map((item) => (
                      <li key={item.value}>
                        <button
                          className="btn btn-block btn-ghost justify-start"
                          onClick={() => handleTemplateSelect(item.value)}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {capturedImages.length === 3 && (
              <div className="flex mt-4 justify-between">
                <button
                  onClick={handleProcessImage}
                  className="btn btn-outline w-full"
                >
                  {previewLoading ? (
                    <HashLoader color="#000" size={20} />
                  ) : (
                    "Preview"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <div className={`dropdown`}>
            <div
              tabIndex={0}
              role="button"
              className={`btn m-1 ${
                isCapturing || error !== null || !selectedDeviceId
                  ? "hidden"
                  : ""
              }`}
            >
              {filter || "No Filter"}
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
            >
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="No Filter"
                  value="nofilter"
                  onClick={() => setFilter("")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="GrayScale"
                  value="GrayScale"
                  onClick={() => setFilter("grayscale")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Saturate"
                  value="saurate-200"
                  onClick={() => setFilter("saturate-200")}
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Sepia"
                  onClick={() => setFilter("sepia")}
                  value="Sepia"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Invert"
                  onClick={() => setFilter("invert")}
                  value="Invert"
                />
              </li>
            </ul>
          </div>
          <button
            disabled={isCapturing || error != null || !selectedDeviceId}
            onClick={startAutoCapture}
            className="w-full px-4 py-2 mt-2 btn bg-base-300 shadow-xs rounded-xl"
          >
            {isCapturing ? "Capturing..." : "Capture"}
          </button>
        </div>
        {processedImage && (
          <div className="mt-5 flex flex-col items-center justify-center">
            <img
              src={processedImage}
              alt="Processed"
              className="rounded-xl w-[20rem]"
            />
            <a
              href={processedImage}
              download="PhotoBox.png"
              className="btn btn-outline mt-4"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </>
  );
}

const applyGrayscale = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  context.putImageData(imageData, 0, 0);
};

const applySepia = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
    data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
    data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
  }

  context.putImageData(imageData, 0, 0);
};

const applyInvert = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  context.putImageData(imageData, 0, 0);
};

const applySaturate = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  level = 2
): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const { h, s, v } = rgbToHsv(r, g, b);
    const newS = Math.min(s * level, 1);

    const { r: newR, g: newG, b: newB } = hsvToRgb(h, newS, v);

    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }

  context.putImageData(imageData, 0, 0);
};

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
};

// Fungsi bantu untuk mengubah HSV kembali ke RGB
const hsvToRgb = (h: number, s: number, v: number) => {
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};
