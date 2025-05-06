export default function FilterImage({
  isCapturing,
  error,
  selectedDeviceId,
  filter,
  applyFilterToAllImages
}: {
  isCapturing: boolean;
  error: string | null;
  selectedDeviceId: string | undefined;
  filter: string;
  applyFilterToAllImages: (filter: string) => void;
}) {
  return (
    <div className="flex w-full gap-2 mt-4">
      <div className={`dropdown w-full shadow-none dropdown-end`}>
        <div
          tabIndex={0}
          role="button"
          className={`w-full border-0 flex justify-between text-[#34364a] rounded-xl bg-white hover:bg-white btn m-1 ${isCapturing || error !== null || !selectedDeviceId
              ? "hidden"
              : ""
            }`}
        >
          {filter || "No Filter"}
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-white rounded-xl -z-1 w-full p-2 shadow-2xl"
        >
          <li>
            <input
              type="radio"
              name="filter"
              className="btn btn-sm btn-block bg-white outline-0 selected:bg-red-900 focus:outline-0 focus:border-2 hover:border-blue-700 rounded-xl shadow-none btn-ghost justify-start"
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
  )
}