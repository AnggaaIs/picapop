import { ChevronDown } from "lucide-react";

export default function CameraAvailable({
  devices,
  selectedDeviceId,
  handleCameraSelect
}: {
  devices: MediaDeviceInfo[];
  selectedDeviceId: string | undefined;
  handleCameraSelect: (deviceId: string) => void;
}) {
  return (
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
  )
}