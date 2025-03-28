import TemplateList from "@/components/templates/TemplateList";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pilih Template Foto",
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
