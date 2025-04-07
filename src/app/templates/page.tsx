import TemplateList from "@/components/templates/TemplateList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilih Template Foto",
  description:
    "Temukan berbagai template photostrip aesthetic dan lucu di PicaPop. Pilih yang paling sesuai dengan gayamu sebelum mengambil selfie!",
  openGraph: {
    title: "Pilih Template Foto - PicaPop",
    description:
      "Jelajahi koleksi template foto unik dari PicaPop. Sempurnakan hasil selfiemu dengan pilihan desain yang keren dan stylish.",
    type: "website",
    url: "https://picapop.my.id/templates",
    images: [
      {
        url: "/picapop.png",
        width: 1200,
        height: 630,
        alt: "PicaPop Template Selection",
      },
    ],
  },
  twitter: {
    title: "Pilih Template Foto - PicaPop",
    description:
      "Jelajahi berbagai pilihan template photostrip yang fun dan menarik di PicaPop.",
    images: ["/twitter-image.png"],
    card: "summary_large_image",
  },
  keywords: [
    "template photobooth online",
    "pilih template selfie",
    "photo strip aesthetic",
    "photostrip lucu online",
    "template kamera online",
    "fotostrip gratis",
    "edit selfie dengan template",
    "pilih desain foto strip",
    "template lucu untuk selfie",
    "photobooth template editor"
  ],
};


export default function Template() {
  return <>
    <div className="flex flex-col items-center py-10 mb-20 min-h-screen">
      <div className="flex px-5 flex-col items-center max-w-6xl md:py-5 rounded-xl w-full">
        <h1 className="text-center text-4xl font-semibold">Template Foto</h1>
        <p className="text-center">
          Kami menyediakan beberapa template foto yang bisa kamu gunakan
        </p>

        <TemplateList />
      </div>
    </div>
  </>;
}
