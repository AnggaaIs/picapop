"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../button";

export default function TemplateList() {
  const [selected, setSelected] = useState<string | null>(null);
  const [templates, setTemplates] =
    useState<{
      label: string; filename: string; isNew: boolean; date: Date; isPartner: {
        status: boolean; partner_name: string;
      } | null
    }[]>([]);
  const onSelect = (value: string) => {
    setSelected(value);
  };

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
        {templates?.map((template, index) => (
          <div
            key={index}
            className={`w-full cursor-pointer hover:border-2 hover:border-blue-700 border-2 transition-all ease-in rounded-xl p-4 
                 ${selected === template.filename
                ? "bg-white border-blue-700 border-2"
                : "bg-white border-transparent"
              }`}

            onClick={() => onSelect(template.filename)}
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="text-center ">
                <p className="text-md text-center font-medium">{template.label}</p>
                {template.isPartner?.status ? (
                  <div className="w-full justify-center flex mt-2">
                    <div className="bg-[#dee3ff] px-3 rounded-xl w-fit text-[#677ffb] font-semibold text-[10px]">Special Partner</div>
                  </div>
                ) : template.isNew ? (
                  <div className="badge badge-success badge-xs">Baru ditambahkan</div>
                ) : null}
              </div>
              <div>
                <input
                  type="radio"
                  name={'template'}
                  className='radio hidden'
                  checked={selected === template.filename}
                  onChange={() => onSelect(template.filename)}
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
          </div>
        ))}
      </div>

      {selected && (
        <div className="bg-gradient-to-t mb-2 via-base-200 h-[100px] rounded-2xl from-base-200 sticky bottom-0 w-full p-5">
          <div className="relative w-full h-full flex items-center justify-center max-w-xl mx-auto">
            {/* <button
              onClick={() => {
                router.push("/getstarted?t=" + selected);
              }}
              className="btn btn-success w-full absolute left-0 bottom-0"
            >
              Pake template ini
            </button> */}
            <Button
              onClick={() => {
                router.push("/getstarted?t=" + selected);
              }}
              className="absolute w-full left-0 bottom-0"
            >
              Gunakan template ini
            </Button>
          </div>
        </div>
      )}
    </>
  )
}