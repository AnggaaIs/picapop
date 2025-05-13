"use client";
import Button from "@/components/button";
import FeaturesLayout from "@/components/features.layout";
import PartnersItems from "@/components/partner.items";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [templates, setTemplates] =
    useState<{ label: string; filename: string }[]>();

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  return (
    <>
      <div className="flex justify-center flex-col items-center px-10 pt-12 min-h-[80vh]">
        <div className="flex h-full flex-col gap-10 md:gap-0 md:flex-row justify-between items-center max-w-6xl md:p-5 rounded-xl w-full">
          <div className="w-full items-center md:items-start flex justify-center flex-col">
            <h1 className="md:text-5xl text-3xl text-[#34364a] text-center md:text-left font-bold">
              Satu Klik, Foto Makin Aesthetic!
            </h1>
            <p className="text-md md:text-lg text-center text-[#34364a] md:text-left mt-2">
              Pilih template, ambil foto, dan bagikan hasilnya dalam sekejap!
            </p>

            <Button className="mt-10 md:w-1/2 max-w-[250px]" onClick={() => router.push('/getstarted')}>
              Cobain Sekarang!
            </Button>
          </div>
          <div className="hidden w-full md:flex items-center justify-center md:items-end md:justify-end">
            <div className="mt-10 md:mt-1 h-[350px] w-[300px] flex items-center justify-center relative">
              <Image
                className="absolute left-0 top-0 -rotate-12"
                src="/example/template1.png"
                alt="contoh"
                width={100}
                height={100}
              />
              <Image
                className="absolute left-16 top-14 -rotate-6"
                src="/example/template2.png"
                alt="contoh"
                width={100}
                height={100}
              />
              <Image
                className="absolute left-34 top-0 rotate-6"
                src="/example/template3.png"
                alt="contoh"
                width={100}
                height={100}
              />
              <Image
                className="absolute left-50 top-18 rotate-16"
                src="/example/template4.png"
                alt="contoh"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="">
        <div className="py-20 lg:py-28 mx-auto max-w-screen-xl px-4">
          <div className="mb-10 lg:mb-16 text-center">
            <h2 className="text-2xl mb-3 font-extrabold leading-tight text-[#34364a] text-center md:text-4xl">
              Kolaborasi yang Menginspirasi!
            </h2>
            <p className="text-[#34364a]">
              Kami bekerja sama dengan berbagai mitra untuk menghadirkan
              pengalaman yang lebih seru dan kreatif bagi pengguna.
            </p>
          </div>
          <div
            className={
              "grid grid-cols-2 gap-4 sm:gap-4 md:flex md:justify-center md:items-center md:flex-wrap "
            }
          >
            <PartnersItems />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center md:p-10 px-3 mt-15 rounded-4xl">
        <div className="flex flex-col items-center max-w-6xl md:p-5 rounded-xl w-full">
          <div className="mb-16 lg:mb-16 text-center">
            <h2 className="text-2xl mb-2 text-[#34364a] md:font-extrabold font-bold leading-tight text-center md:text-3xl">
              Pose ngawur, hasil tetap keren
            </h2>
            <p className="text-[#34364a]">
              Kamu yang kaku depan kamera? Nggak masalah. Di PicaPop, asal
              jepret aja. Sisanya? Biar template lucu kami yang bantu kamu
              tampil memukau.
            </p>
          </div>
          <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:space-y-0">
            <FeaturesLayout />
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center p-10 mt-20 rounded-3xl">
        <div className="flex flex-col items-center max-w-2xl md:p-5 rounded-xl w-full">
          <h1 className="text-center text-4xl font-bold text-[#34364a]">Template Foto</h1>
          <p className="text-center text-base text-[#34364a] mt-2">
            Kami menyediakan beberapa template foto yang bisa kamu gunakan
          </p>
          <div className="mt-10 place-content-around w-[100%] grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates?.slice(0, 4).map((template, index) => (
              <div
                key={index}
                className="items-center bg-white py-5 px-2 flex-col justify-around flex w-full transition-all ease rounded-xl"
              >
                <p className="mb-4 text-center text-[#34364a] font-bold text-sm">{template.label}</p>
                <Image
                  className="rounded-md"
                  src={`/template/${template.filename}`}
                  alt={`${template.label}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full mb-2">
        <div className="left-0 z-[6] h-[350px] -top-45 w-full items-center justify-center flex from-[#f6f8fd] via-[#f6f8fd] bg-gradient-to-t to-transparent absolute">
          <Button className="md:w-1/2 max-w-[350px]" onClick={() => router.push("/templates")}>
            Lihat semua template
          </Button>
        </div>
      </div>

      <div className="mt-44"></div>
    </>
  );
}
