import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-100/50 overflow-hidden pt-10">
      <Navbar />
      <div className="relative flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
            Pilih layout foto dulu
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-emerald-600">Pilih</span> Layout Foto
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Jelajahi berbagai pilihan layout foto yang menarik dan sesuai dengan
            gaya Anda.
          </p>
        </div>

        <div className="flex justify-center mt-15 mb-8 sm:mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            <Link
              href={"/getstarted/strip"}
              className="bg-white/70 backdrop-blur-sm rounded-2xl cursor-pointer hover:bg-emerald-100 p-4 border border-gray-100 transition-all duration-300 group"
            >
              <div className="grid grid-rows-3 gap-2 mx-auto justify-items-center">
                <div className="w-18 h-10 bg-gray-300 rounded-sm"></div>
                <div className="w-18 h-10 bg-gray-300 rounded-sm"></div>
                <div className="w-18 h-10 bg-gray-300 rounded-sm"></div>
              </div>
              <div className="mt-5">
                <span className="text-center text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
                  Picapop Foto Strip
                </span>
              </div>
            </Link>
            <Link
              href={"/getstarted/instastory"}
              className="bg-white/70 backdrop-blur-sm rounded-2xl cursor-pointer hover:bg-emerald-100 p-4 border border-gray-100 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-2 mx-auto items-center justify-center h-32">
                <div className="w-18 h-10 bg-gray-300 rounded-sm"></div>
                <div className="w-18 h-10 bg-gray-300 rounded-sm"></div>
              </div>
              <div className="mt-5 text-center">
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
                  Instagram Story
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
