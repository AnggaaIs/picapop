'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

      <Footer />
    </>
  );
}
