/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function StripPageClient() {
  const { linkId } = useParams<{ linkId: string }>();
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getImageData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/get-image/${linkId}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          // router.replace("/404");
          return;
        }

        const data = await res.json();
        setImageBase64(data?.data?.imageBase64 || null);
        setCreatedAt(data?.data?.createdAt || null);
      } catch (error) {
        console.error("[FETCH_IMAGE_ERROR]", error);
        // router.replace("/404");
      } finally {
        setLoading(false);
      }
    }

    if (linkId) {
      getImageData();
    }
  }, [linkId, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 pb-20 bg-base-200 pt-32">
      <Navbar />
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-sm mt-6">
        <h1 className="text-xl font-bold mb-4 text-center">Shared Image</h1>

        {loading ? (
          <div className="space-y-4">
            <div className="skeleton w-full h-44 rounded-md" />
            <div className="skeleton w-full h-44 rounded-md" />
            <div className="skeleton w-full h-44 rounded-md" />
          </div>
        ) : imageBase64 ? (
          <>
            <img
              src={imageBase64}
              alt="Shared"
              className="w-full max-w-3xl max-h-[80vh] object-contain rounded-lg border shadow"
            />
            {createdAt && (
              <div className="mt-3 text-center text-sm text-gray-500">
                <p>📅 Diambil pada:</p>
                <p className="font-medium text-gray-700">
                  {new Date(createdAt).toLocaleString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
            <div className="mt-4 text-center">
              <a
                href={imageBase64}
                download={`SharedImage-${linkId}.png`}
                className="btn btn-primary w-full"
              >
                Download
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-red-500">
              Image not found or has been removed.
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              The image you are looking for does not exist or has been removed.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
