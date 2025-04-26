/* eslint-disable @next/next/no-img-element */
"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { replaceBlackWithImages } from "@/utils/image";
import { HashLoader } from "react-spinners";
import {
  applyGrayscale,
  applyInvert,
  applySaturate,
  applySepia,
} from "@/utils/filter";
import dynamic from "next/dynamic";

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
  const [processedImages, setProcessedImages] = useState<string[] | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  //const [template, setTemplate] = useState("Autumn Memories (07-03-2025)");
  const [templates, setTemplates] =
    useState<{ filename: string; label: string }[]>();
  const [filter, setFilter] = useState("");
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [capturedImageFilters, setCapturedImageFilters] = useState<string[]>(
    []
  );

  const DynamicCanvasComponent = dynamic(
    () => Promise.resolve(() => <canvas ref={canvasRef} className="hidden" />),
    { ssr: false }
  );

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data.data);
      })
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

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
      } catch (err) {
        console.log(err);
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
      } catch (err) {
        console.log(err);
        setError("Failed to switch camera. Please try again.");
      }
    };

    switchCamera();
  }, [selectedDeviceId, isInitialized]);

  useEffect(() => {
    if (!selectedDeviceId || error || isCapturing) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (isCapturing) return;
        startAutoCapture();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, selectedDeviceId, isCapturing]);

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
      setCapturedImageFilters((prevFilters) => [...prevFilters, filter]);
    }
  };

  const applyFilterToAllImages = (newFilter: string) => {
    if (capturedImages.length === 0) {
      setFilter(newFilter);
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Proses setiap gambar dengan filter baru
    const updatedImages = capturedImages.map((imageData) => {
      const img = new Image();
      img.src = imageData;

      // Memasang ukuran canvas sesuai gambar
      canvas.width = img.width || 800;
      canvas.height = img.height || 600;

      // Membersihkan canvas
      context?.clearRect(0, 0, canvas.width, canvas.height);

      // Menggambar gambar ke canvas
      context?.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Menerapkan filter yang dipilih
      switch (newFilter) {
        case "grayscale":
          applyGrayscale(context!, canvas);
          break;
        case "sepia":
          applySepia(context!, canvas);
          break;
        case "saturate-200":
          applySaturate(context!, canvas, 2);
          break;
        case "invert":
          applyInvert(context!, canvas);
          break;
        default:
          // Jika tidak ada filter/reset filter
          break;
      }

      // Mengembalikan data URL dari canvas
      return canvas.toDataURL("image/png");
    });

    // Update state dengan gambar yang sudah difilter
    setCapturedImages(updatedImages);
    setCapturedImageFilters(new Array(updatedImages.length).fill(newFilter));
    setFilter(newFilter);
  };

  const startAutoCapture = async () => {
    if (isCapturing) return;
    setCapturedImages([]);
    setProcessedImages(null);
    setIsCapturing(true);

    const phrases = [
      "Bilang Mangga",
      "Cheese!",
      "Smile :)",
      "Bilang Tempe!",
      "Bilang Ubi!",
      "Senyum Dulu!",
      "Klik Klik!",
      "Pose Dulu!",
      "Say Happy!",
      "Ciluk Baa!",
      "Wefie Time!",
      "Jangan Kedip!",
      "Say Kopi!",
      "Senyum Manis!",
      "Bilang Durian!",
      "Bilang Coklat!",
      "Say Mochi!",
      "Bilang Bakso!",
      "Jangan Gerak!",
      "Pose Kece!",
      "Bilang Pisang!",
      "Smile Like a Star!",
      "Senyum Kayak Artis!",
      "Flash On!",
      "Bilang WiLa!",
    ];

    for (let i = 0; i < 3; i++) {
      for (let count = 3; count > 0; count--) {
        setCountdown(count);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setCountdown(phrases[Math.floor(Math.random() * phrases.length)]);

      setTimeout(() => captureImage(), 1000);
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

  // const handleProcessImage = () => {
  //   setPreviewLoading(true);
  //   replaceBlackWithImages(
  //     `/template/${template}`,
  //     capturedImages,
  //     setProcessedImage
  //   ).finally(() => setPreviewLoading(false));
  // };

  const handleProcessImage2 = async () => {
    setPreviewLoading(true);
    setProcessedImages([]); // clear sebelumnya

    try {
      const placeholders = new Array(templates!.length).fill(null);
      setProcessedImages(placeholders);

      for (let i = 0; i < templates!.length; i++) {
        const image = await replaceBlackWithImages(
          `/template/${templates![i].filename}`,
          capturedImages
        );

        setProcessedImages((prev) => {
          const updated = [...prev!];
          updated[i] = image;
          return updated;
        });
      }
    } catch (error) {
      console.error("Error processing images:", error);
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <Suspense>
      <div className="flex items-center justify-center flex-col mb-25 p-5">
        <div className="max-w-3xl">
          {countdown == null ? (
            <div className="pb-5">
              <h2 className="text-3xl font-semibold text-center">
                Photo Session
              </h2>
            </div>
          ) : (
            <div
              className="
            bg-black/50 fixed inset-0 w-full left-0 z-[9999] h-full flex items-center justify-center top-0            
            "
            >
              <p className="text-5xl text-white font-semibold">{countdown}</p>
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
                  {devices.find((d) => d.deviceId === selectedDeviceId)
                    ?.label || "Pilih Kamera"}
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
                    <li className="text-gray-500 px-4 py-2">
                      Tidak ada kamera
                    </li>
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
              <DynamicCanvasComponent />
              {capturedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-5 mt-4">
                  {capturedImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Captured ${index + 1}`}
                      className="rounded-xl aspect-[4/3] object-cover w-full"
                    />
                  ))}
                </div>
              )}

              <div className="flex w-full gap-2 mt-4 ">
                <div className={`dropdown w-full dropdown-end`}>
                  <div
                    tabIndex={0}
                    role="button"
                    className={`w-full btn m-1 ${
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
                    className="dropdown-content bg-base-300 rounded-box -z-1 w-full p-2 shadow-2xl"
                  >
                    <li>
                      <input
                        type="radio"
                        name="filter"
                        className="btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="No Filter"
                        value="nofilter"
                        onClick={() => applyFilterToAllImages("")}
                      />
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="filter"
                        className="btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="GrayScale"
                        value="GrayScale"
                        onClick={() => applyFilterToAllImages("grayscale")}
                      />
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="filter"
                        className="btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Saturate"
                        value="saurate-200"
                        onClick={() => applyFilterToAllImages("saturate-200")}
                      />
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="filter"
                        className="btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Sepia"
                        onClick={() => applyFilterToAllImages("sepia")}
                        value="Sepia"
                      />
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="filter"
                        className="btn btn-sm btn-block btn-ghost justify-start"
                        aria-label="Invert"
                        onClick={() => applyFilterToAllImages("invert")}
                        value="Invert"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              {capturedImages.length === 3 && (
                <div className="flex mt-4 justify-between">
                  <button
                    onClick={handleProcessImage2}
                    className="btn btn-dash w-full"
                  >
                    {previewLoading ? (
                      <HashLoader
                        color={
                          getComputedStyle(document.documentElement)
                            .getPropertyValue("--color-base-content")
                            .trim() || "#000"
                        }
                        size={20}
                      />
                    ) : (
                      "Preview"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <button
              disabled={isCapturing || error != null || !selectedDeviceId}
              onClick={startAutoCapture}
              className="w-full px-4 py-2 mt-2 btn btn-outline shadow-xs"
            >
              {isCapturing ? "Capturing..." : "Capture"}
            </button>
          </div>
          {processedImages && (
            <div className="mt-10 p-6 rounded-xl flex flex-col items-center justify-center">
              <p className="mb-6 text-3xl font-semibold text-center">
                Hasil Foto Kamu
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {processedImages.map((image, index) => (
                  <div
                    key={index}
                    className="group rounded-xl overflow-hidden border border-base-200 shadow-sm transition-all hover:ring-2 hover:ring-primary/30"
                  >
                    <div className="relative aspect-[4/5] w-full">
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
                    </div>
                    <div className="p-3 bg-base-100">
                      <a
                        href={image}
                        download={`PicaPop-${index + 1}.png`}
                        className="btn btn-outline w-full"
                      >
                        Download Image
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
