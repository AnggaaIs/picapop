"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Developer = [
  {
    name: "Angga Islami Pasya",
    role: "Backend Developer",
    image: "/dev/angga.jpeg",
    github: "https://github.com/AnggaaIs",
  },
  {
    name: "Wahyu Pamungkas",
    role: "UI / UX Designer",
    image: "/dev/wahyu.jpeg",
    github: "https://github.com/Devstore120",
  },
  {
    name: "Christian Jeremy",
    role: "Frontend Developer",
    image: "/dev/jeremy.jpeg",
    github: "https://github.com/jeremy776",
  },
];

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
      <div className="flex flex-col items-center px-10 pt-10 min-h-screen">
        <div className="flex flex-col items-center max-w-6xl md:p-5 rounded-xl w-full">
          <h1 className="text-center text-4xl font-semibold">PicaPop</h1>
          <p className="text-center text-base">
            berikan gaya terbaikmu dalam 3 detik
          </p>
          <div className="mt-14 w-[300px] flex items-center justify-center bg-blue-300 relative">
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
          <div className="mt-106 pb-20 w-full flex items-center justify-center">
            <button
              onClick={() => {
                router.push("/templates");
              }}
              className="btn btn-success w-[350px]"
            >
              Pilih bingkai
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-10 mt-5 bg-base-200 rounded-3xl">
        <div className="flex flex-col items-center max-w-2xl md:p-5 rounded-xl w-full">
          <h1 className="text-center text-4xl font-semibold">Template Foto</h1>
          <p className="text-center text-base">
            Kami menyediakan beberapa template foto yang bisa kamu gunakan
          </p>
          <div className="mt-10 place-content-around w-[100%] grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates?.slice(0, 4).map((template, index) => (
              <div
                key={index}
                className="items-center p-2 flex-col justify-center flex w-full hover:bg-primary/40 transition-all ease hover:py-4 rounded-xl"
              >
                <p className="mb-2 text-center">{template.label}</p>
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
      <div className="relative w-full mb-20">
        <div className="left-0 h-[350px] -top-45 w-full items-center justify-center flex from-base-100 via-base-100 bg-gradient-to-t to-transparent absolute">
          <button
            className="btn btn-success btn-wide"
            onClick={() => {
              router.push("/templates");
            }}
          >
            Lihat semua template
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center px-2 mt-20">
        <div className="flex flex-col items-center max-w-7xl md:p-5 rounded-xl w-full">
          <section className="body-font w-full">
            <div className="container py-25">
              <div className="flex flex-col text-center w-full mb-10">
                <h3 className="text-center text-4xl font-semibold">Tim Kami</h3>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Kerja bareng, bikin solusi, selesai bersama
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                {Developer.map((dev) => (
                  <div key={dev.name} className="p-2 w-full">
                    <div className="shadow-sm h-full flex items-center border-secondary/90 border p-4 rounded-2xl">
                      <Image
                        alt="team"
                        width={50}
                        height={50}
                        className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                        src={dev.image}
                      />
                      <div className="flex-grow">
                        <h2 className="title-font font-medium text-bold">
                          {dev.name}
                        </h2>
                        <p className="text-sm text-accent">{dev.role}</p>
                        <a
                          href={dev.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
