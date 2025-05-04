"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { replaceBlackWithImages } from "@/utils/image";
import {
  applyGrayscale,
  applyInvert,
  applySaturate,
  applySepia,
} from "@/utils/filter";
import PreviewCard from "@/components/photosession/preview-card";
import { phrases } from "@/utils/config";
import MainLayout from "@/components/photosession/main-layout";
import HeaderLayout from "@/components/photosession/header-layout";

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
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [processedImages, setProcessedImages] = useState<string[] | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [templates, setTemplates] =
    useState<{ filename: string; label: string }[]>();
  const [filter, setFilter] = useState("");
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [capturedImageFilters, setCapturedImageFilters] = useState<string[]>(
    []
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

    const updatedImages = capturedImages.map((imageData) => {
      const img = new Image();
      img.src = imageData;

      canvas.width = img.width || 800;
      canvas.height = img.height || 600;

      context?.clearRect(0, 0, canvas.width, canvas.height);

      context?.drawImage(img, 0, 0, canvas.width, canvas.height);

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
          break;
      }

      return canvas.toDataURL("image/png");
    });

    setCapturedImages(updatedImages);
    setCapturedImageFilters(new Array(updatedImages.length).fill(newFilter));
    setFilter(newFilter);
  };

  const startAutoCapture = async () => {
    if (isCapturing) return;
    setCapturedImages([]);
    setProcessedImages(null);
    setIsCapturing(true);

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

  const handleProcessImage = async () => {
    setPreviewLoading(true);
    setProcessingIndex(0);
    setProcessedImages(null);

    try {
      const processed: (string | null)[] = new Array(templates!.length).fill(
        null
      );

      for (let i = 0; i < templates!.length; i++) {
        setProcessingIndex(i + 1);

        const template = templates![i];
        const result = await replaceBlackWithImages(
          `/template/${template.filename}`,
          capturedImages
        );
        processed[i] = result;

        setProcessedImages((prevImages) => [
          ...(prevImages ? prevImages.filter((image) => image !== null) : []),
          result,
        ]);
      }
    } catch (error) {
      console.error("Error processing images:", error);
    } finally {
      setPreviewLoading(false);
      setProcessingIndex(null);
    }
  };

  return (
    <Suspense>
      <div className="flex items-center justify-center flex-col mb-25 p-5">
        <div className="max-w-3xl">
          <HeaderLayout
            error={error}
            countdown={countdown}
            devices={devices}
            selectedDeviceId={selectedDeviceId}
            handleCameraSelect={handleCameraSelect}
          />

          {/* component camera */}
          <MainLayout
            videoRef={videoRef}
            filter={filter}
            isFrontCamera={isFrontCamera}
            canvasRef={canvasRef}
            capturedImages={capturedImages}
            isCapturing={isCapturing}
            error={error}
            handleProcessImage={handleProcessImage}
            selectedDeviceId={selectedDeviceId}
            previewLoading={previewLoading}
            processingIndex={processingIndex}
            templatesLength={templates!.length}
            applyFilterToAllImages={applyFilterToAllImages}
          />

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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {processedImages.map((image, index) => (
                  <PreviewCard image={image} index={index} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
