import { HashLoader } from "react-spinners";
import { useState } from "react";
import { ClipboardCopy, Download } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
export default function PreviewCard({
  image,
  index,
  onApply,
  isApplied,
}: {
  image: string;
  index: number;
  onApply?: () => void;
  isApplied?: boolean;
}) {
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetLink = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_SAVE_IMAGE_TOKEN;

      const response = await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageBase64: image }),
      });

      const data = await response.json();

      if (data.success) {
        setLink(data.data.linkId);
      } else {
        console.error("Failed to save image");
      }
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLinkUrl = () => `${window.location.origin}/strip/${link}`;

  return (
    <div className="group rounded-xl overflow-hidden border border-base-200 shadow-sm transition-all hover:ring-2 hover:ring-primary/30">
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
      <div className="p-3 bg-base-100 space-y-2">
        {isApplied && link && (
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={getLinkUrl()}
              readOnly
              className="w-full p-2 bg-base-200 border rounded-md"
            />
            <button
              onClick={() => navigator.clipboard.writeText(getLinkUrl())}
              className="btn btn-ghost p-2"
              title="Copy to clipboard"
            >
              <ClipboardCopy size={18} />
            </button>
          </div>
        )}

        {!isApplied && onApply && (
          <button onClick={onApply} className="btn btn-primary w-full">
            Apply
          </button>
        )}

        {isApplied && !link && (
          <button
            onClick={handleGetLink}
            className={`btn w-full ${loading ? "btn-disabled" : "btn-primary"}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Get Link"}
          </button>
        )}

        {isApplied && (
          <a
            href={image}
            download={`PicaPop-${index + 1}.png`}
            className="btn btn-outline w-full"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
}
