/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import FilterImage from "./filer-image";
import { HashLoader } from "react-spinners";

export default function MainLayout({
  videoRef,
  filter,
  isFrontCamera,
  canvasRef,
  capturedImages,
  isCapturing,
  error,
  handleProcessImage,
  selectedDeviceId,
  previewLoading,
  applyFilterToAllImages
}: {
  
  videoRef: React.RefObject<HTMLVideoElement | null>;
  filter: string;
  isFrontCamera: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  capturedImages: string[];
  isCapturing: boolean;
  error: string | null;
  handleProcessImage: () => void;
  selectedDeviceId: string | undefined;
  previewLoading: boolean;
  applyFilterToAllImages: (filter: string) => void;
}) {
    const DynamicCanvasComponent = dynamic(
      () => Promise.resolve(() => <canvas ref={canvasRef} className="hidden" />),
      { ssr: false }
    );
    
  return (
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

        {/* filter */}
        <FilterImage isCapturing={isCapturing} error={error} selectedDeviceId={selectedDeviceId} filter={filter} applyFilterToAllImages={applyFilterToAllImages} />

        {capturedImages.length === 3 && (
          <div className="flex mt-4 justify-between">
            <button
              onClick={handleProcessImage}
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
  )
}