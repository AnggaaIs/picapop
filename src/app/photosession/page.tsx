'use client'
import { useEffect, useRef, useState } from "react"
// import Image from "next/image";
import Navbar from "../components/Navbar";

export default function PhotoSession() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | string | null>(null);

  // filter
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setError("Error accessing camera");
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      switch (filter) {
        case 'grayscale':
            applyGrayscale(context, canvas);
          break;
        case 'sepia':
            applySepia(context, canvas);
          break;
        case 'saturate-200':
            applySaturate(context, canvas, 2);
          break
        case 'invert':
            applyInvert(context, canvas);
          break;
        default:
          break;
      }

      setCapturedImages((prevImages) => [...prevImages, canvas.toDataURL("image/png")]);
    }
  };

  const startAutoCapture = async () => {
    if (isCapturing) return;
    setCapturedImages([]);
    setIsCapturing(true);
    for (let i = 0; i < 3; i++) {
      for (let count = 3; count > 0; count--) {
        setCountdown(count);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setCountdown('0');
      captureImage();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setCountdown(null);
      if (i < 2) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    setIsCapturing(false);
    setCountdown(null);
  };
  return (
    <>
      <Navbar />
      <div className="p-5">
        {countdown == null ? (
          <div className="pb-5">
            <h2 className="text-3xl font-semibold text-center">Photo Session</h2>
          </div>
        ) : (
          <div className="flex items-center text-success justify-center text-6xl font-bold">
            {countdown}
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error! Tidak mendapatkan akses ke kamera.</span>
          </div>
        )}

        <div className="grid sm:grid-cols-4 gap-5 mt-5">
          <div className="aspect-4/3 relative col-span-2">
            <video ref={videoRef} autoPlay className={`${filter} w-full h-full rounded-xl shadow-xl object-cover`} />
          </div>
          <div className="col-span-2 scale-100">
            <canvas ref={canvasRef} className="hidden" />
            {capturedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-5 mt-4">
                {capturedImages.map((image, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={index} src={image} alt={`Captured ${index + 1}`} className="rounded-xl aspect-4/3" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <div className={`dropdown`}>
            <div tabIndex={0} role="button" className={`btn m-1 ${isCapturing ? 'hidden' : ''}`}>
              {filter || "No Filter"}
              <svg
                width="12px"
                height="12px"
                className="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="No Filter"
                  value="nofilter"
                  onClick={() => setFilter('')} />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="GrayScale"
                  value="GrayScale"
                  onClick={() => setFilter('grayscale')} />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Saturate"
                  value="saurate-200"
                  onClick={() => setFilter('saturate-200')} />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Sepia"
                  onClick={() => setFilter('sepia')}
                  value="Sepia" />
              </li>
              <li>
                <input
                  type="radio"
                  name="filter"
                  className="btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Invert"
                  onClick={() => setFilter('invert')}
                  value="Invert" />
              </li>
            </ul>
          </div>
          <button disabled={isCapturing} onClick={startAutoCapture} className="w-full px-4 py-2 mt-2 bg-green-500 text-white rounded-xl">
            {isCapturing ? "Capturing..." : "Capture"}
          </button>
        </div>

      </div>
    </>
  )
}

const applyGrayscale = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
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

const applySepia = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
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

const applyInvert = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  context.putImageData(imageData, 0, 0);
};


const applySaturate = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, level = 2): void => {
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
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h, s, v };
};

// Fungsi bantu untuk mengubah HSV kembali ke RGB
const hsvToRgb = (h: number, s: number, v: number) => {
  let r = 0, g = 0, b = 0;
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
    b: Math.round(b * 255)
  };
};
