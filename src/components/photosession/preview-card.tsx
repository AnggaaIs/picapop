import { HashLoader } from "react-spinners";

/* eslint-disable @next/next/no-img-element */
export default function PreviewCard({
  image,
  index
}: {
    image: string;
    index: number;
  }) {
  return (
    <div
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
  )
}