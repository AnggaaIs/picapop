import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";

async function getImageData(linkId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/get-image/${linkId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data?.imageBase64 || null;
  } catch (error) {
    console.error("[FETCH_IMAGE_ERROR]", error);
    return null;
  }
}

export default async function StripPage({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) {
  const { linkId } = await params;

  const imageBase64 = await getImageData(linkId);

  if (!imageBase64) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-200">
      <div className="bg-base-100 shadow-xl rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4 text-center">Shared Image</h1>
        <img
          src={imageBase64}
          alt="Shared"
          className="max-w-full max-h-[80vh] object-contain rounded-md border"
        />
        <div className="mt-4 text-center">
          <a
            href={imageBase64}
            download={`SharedImage-${(await params).linkId}.png`}
            className="btn btn-primary w-full"
          >
            Download
          </a>
        </div>
      </div>
    </main>
  );
}
