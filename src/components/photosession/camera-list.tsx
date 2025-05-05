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
      <div className="w-full shadow-none max-w-md dropdown dropdown-click">
        <div
          tabIndex={0}
          role="button"
          className="btn text-[#34364a] bg-white rounded-lg border-0 hover:bg-transparent flex items-center justify-between gap-2"
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
          className="dropdown-content w-full menu p-2 shadow-lg bg-white rounded-box max-w-md transition-all duration-200"
        >
          {devices.length > 0 ? (
            devices.map((device) => (
              <li key={device.deviceId}>
                <button
                  disabled={device.deviceId === selectedDeviceId}
                  className="focus:bg-blue-600 text-[#34364a] hover:bg-blue-600 hover:text-white disabled:hover:bg-transparent disabled:hover:text-black/60 disabled:text-black/60 justify-start"
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