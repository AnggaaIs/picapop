'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { templates } from "@/utils/config";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-10 mb-20 h-screen">
        <div className="flex flex-col items-center max-w-6xl md:p-5 rounded-xl w-full">
          <h2 className="text-center text-4xl font-semibold">PhotoBox</h2>
          <p className="text-center">
            berikan gaya terbaikmu dalam 3 detik
          </p>
          <div className="mt-14 w-[300px] flex items-center justify-center bg-blue-300 relative">
            {/* <p>ok</p> */}
            <Image className="absolute left-0 top-0 -rotate-12" src="/example/template1.png" alt="contoh" width={100} height={100} />
            <Image className="absolute left-16 top-14 -rotate-6" src="/example/template2.png" alt="contoh" width={100} height={100} />
            <Image className="absolute left-34 top-0 rotate-6" src="/example/template3.png" alt="contoh" width={100} height={100} />
            <Image className="absolute left-50 top-18 rotate-16" src="/example/template4.png" alt="contoh" width={100} height={100} />
          </div>
          <div className="mt-106 pb-20 w-full flex items-center justify-center">
            <button onClick={() => {
              router.push("/getstarted");
            }} className="btn btn-success w-[350px]">Lets Start</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-10 mt-30">
        <div className="flex flex-col items-center max-w-2xl md:p-5 rounded-xl w-full">
          <h2 className="text-center text-4xl font-semibold">Template Foto</h2>
          <p className="text-center">
            Kami menyediakan beberapa template foto yang bisa kamu gunakan
          </p>
          <div className="mt-10 place-content-around w-[100%] grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.slice(0, 4).map((template, index) => (
              <div key={index} className="items-center flex-col justify-center flex w-full hover:bg-primary/40 transition-all ease hover:py-4 rounded-xl">
                <p className="mb-2">{template.label}</p>
                <Image className="rounded-md" src={`/template/template${template.value}.png`} alt={`${template.label}`} width={100} height={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full mb-55">
        <div className="left-0 h-[350px] -top-45 w-full items-center justify-center flex from-base-100 via-base-100 bg-gradient-to-t to-transparent absolute">
          <button className="btn btn-success btn-wide" onClick={() => {
            router.push("/templates");
          }}>Lihat semua template</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
