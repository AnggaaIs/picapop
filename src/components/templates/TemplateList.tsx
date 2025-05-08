"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../button";

export default function TemplateList() {
  const [templates, setTemplates] =
    useState<{
      label: string; filename: string; isNew: boolean; date: Date; isPartner: {
        status: boolean; partner_name: string;
      } | null
    }[]>([]);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="w-full mt-10 p-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.length > 0 ? templates?.map((template, index) => (
          <div
            key={index}
            className={`w-full cursor-pointer hover:border-2 hover:border-blue-700 border-2 transition-all ease-in rounded-xl p-4 
                 ${'' === template.filename
                ? "bg-white border-blue-700 border-2"
                : "bg-white border-transparent"
              }`}
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="text-center ">
                <p className="text-md text-center font-semibold text-[#34364a]">{template.label}</p>
                {template.isPartner?.status ? (
                  <div className="w-full justify-center flex mt-2">
                    <div className="bg-[#dee3ff] px-3 rounded-xl w-fit text-[#677ffb] font-semibold text-[10px]">Special Partner</div>
                  </div>
                ) : template.isNew ? (
                  <div className="bg-green-200 px-3 text-[10px] font-semibold text-green-600 mt-2 w-fit rounded-xl">Baru ditambahkan</div>
                ) : null}
              </div>
              <div>
                <input
                  type="radio"
                  name={'template'}
                  className='radio hidden'
                />
                <Image
                  className="rounded-md"
                  src={`/template/${template.filename}`}
                  alt={template.label}
                  loading="lazy"
                  width={100}
                  height={0}
                />
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-xs text-center font-semibold text-[#34364a]">{template.isPartner?.partner_name || 'PicaPop'}</p>
              <p className="text-xs text-center text-[#34364a]/60">{new Date(template.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
        )) : (
          <>
            {[1, 2, 3, 4,5,6,7,8,9,10].map((_, index) => (
              <div
                key={index}
                className={`w-full cursor-pointer hover:border-2 hover:border-blue-700 border-2 transition-all ease-in rounded-xl p-4 border-transparent`}
              >
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="">
                    <div className="h-3.5 w-24 animate-pulse bg-blue-200 rounded-full"></div>
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-center h-80 bg-blue-200 rounded-xl w-full animate-pulse">
                      <svg className="w-10 h-10 text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-6 space-y-2 gap-50 ">
                    <div className="h-2.5 w-19 animate-pulse bg-blue-200 rounded-full"></div>
                    <div className="h-2.5 w-35 animate-pulse bg-blue-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="bg-gradient-to-t mb-2 via-white h-[100px] rounded-2xl from-white sticky bottom-0 w-full p-5">
        <div className="relative w-full h-full flex items-center justify-center max-w-xl mx-auto">
          <Button
            onClick={() => {
              router.push("/getstarted");
            }}
            className="absolute w-full left-0 bottom-0"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </>
  )
}