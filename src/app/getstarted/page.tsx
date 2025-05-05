'use client';
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'

export default function GetStarted() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("t");
  return (
    <div className="flex flex-col justify-center items-center p-10 h-screen">
      <h2 className="text-3xl font-extrabold text-[#34364a]">Petunjuk Penggunaan!</h2>
      <div className="my-5 text-center text-[#34364a]">
        <p>Kamu hanya memiliki <b>3 detik</b> setiap cuplikan foto</p>
        <p className="mt-2">Sesi foto online ini hanya mengambil <b>3 foto</b> dalam satu sesi</p>
        <br />
        <p className="text-md font-semibold">Siapkan gaya terbaik kamu!!</p>
      </div>
      <Button onClick={() => {
        router.push("/photosession" + (template ? `?t=${template}` : ""));
      }} className=" mt-10 max-w-sm">Lets startt</Button>
    </div>
  )
}