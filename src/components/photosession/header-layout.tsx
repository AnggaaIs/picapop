import AlertError from "./alert-error";
import CameraAvailable from "./camera-list";

export default function HeaderLayout({
  error,
  countdown,
  devices,
  selectedDeviceId,
  handleCameraSelect,
}: {
  error: string | null;
  devices: MediaDeviceInfo[];
  selectedDeviceId: string | undefined;
  handleCameraSelect: (deviceId: string) => void;
  countdown: string | number | null;
}) {
  return (
    <>
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
      {
        error && (
          <AlertError />
        )
      }
      {
        !error && (
          <CameraAvailable devices={devices} selectedDeviceId={selectedDeviceId} handleCameraSelect={handleCameraSelect} />
        )
      }
    </>
  )
}