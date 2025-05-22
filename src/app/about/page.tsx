// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | PicaPop",
  description: "Learn more about PicaPop, the fun & creative online photo booth for unique selfies!",
  keywords: "PicaPop, about us, online photo booth, creative selfies, fun photography",
  openGraph: {
    title: "About Us | PicaPop",
    description: "Learn more about PicaPop, the fun & creative online photo booth for unique selfies!",
    url: "https://picapop.vercel.app/about",
    images: [
      {
        url: "/example/template1.png",
        width: 800,
        height: 600,
      },
    ],
  },
}
const dev = [
  {
    name: "Jeremy",
    role: "Founder & Frontend Developer",
    image: "/dev/jeremy.jpeg",
  },
  {
    name: "Angga",
    role: "Backend Developer",
    image: "/dev/angga.jpeg",
  },
  {
    name: "Wahyu",
    role: "Designer & UI/UX",
    image: "/dev/wahyu.jpeg",
  },
]

export default function AboutPage() {
  return (
    <main className="flex items-center justify-center relative mt-15 mb-4 md:px-10 px-5">
      <div className="max-w-5xl w-full flex items-center justify-center flex-col">
        <div className="flex py-10 rounded-3xl px-5 w-full justify-between items-center mb-10">
          <div className="">
            <div className="bg-blue-200 mb-3 w-fit px-4 py-.5 rounded-xl">
              <p className="text-sm text-blue-600">About us</p>
            </div>
            <div>
              <h1 className="max-w-md text-3xl font-bold text-[#34364a]">Temukan Keseruan dalam Setiap Jepretan!</h1>
              <p className="max-w-xl mt-2 text-gray-600">PicaPop adalah aplikasi berbasis web yang memungkinkan kamu untuk mengambil selfie secara langsung dan mengubahnya menjadi fotostrip keren dalam hitungan detik. Dengan berbagai pilihan template yang lucu, estetik, dan kekinian, PicaPop hadir untuk mengabadikan momen berharga dengan cara yang unik dan menyenangkan.</p>
            </div>

          </div>
          <div>
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
        <div className="py-10 w-full flex flex-col items-center justify-center">
          <h2 className="text-center text-3xl text-[#34364a] font-bold">Meet Our Team</h2>
          <div className="my-15 w-full flex-col space-y-8 md:flex-row gap-4 items-center justify-between flex">
            {dev.map((item, index) => (
              <div key={index} className="w-fit flex items-center flex-col space-y-5">
                <Image src={item.image} alt={item.name} width={300} height={300} className="rounded-b-full rounded-tl-full w-30 h-30" />
                <div>
                  <h3 className="text-center text-2xl text-[#34364a] font-bold">{item.name}</h3>
                  <p className="text-center text-[#34364a] text-sm">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
