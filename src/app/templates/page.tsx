"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Template() {
  const [selected, setSelected] = useState<string | null>(null);
  const [templates, setTemplates] =
    useState<{ label: string; filename: string; isNew: boolean; date: Date; isSpecial: boolean; }[]>();
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

  return <>
    <div className="flex flex-col items-center py-10 mb-20 min-h-screen">
      <div className="flex flex-col items-center max-w-6xl md:py-5 rounded-xl w-full">
        <h1 className="text-center text-4xl font-semibold">Template Foto</h1>
        <p className="text-center">
          Kami menyediakan beberapa template foto yang bisa kamu gunakan
        </p>

        <div className="w-full mt-10 p-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates?.map((template, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer transition-all ease-in-out rounded-xl border border-gray-200/20 p-4 
                shadow-md ${selected === template.filename
                    ? "bg-primary/40 shadow-md"
                    : "hover:bg-primary/20 shadow-sm"
                }`}
              
              onClick={() => onSelect(template.filename)}
            >
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="text-center ">
                  <p className="text-md text-center font-medium">{template.label}</p>
                  {template.isSpecial ? (
                    <div className="badge badge-warning text-white font-semibold badge-xs">Special Ramadhan</div>
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
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {selected && (
      <div className="bg-gradient-to-t mb-2 via-base-200 h-[100px] rounded-2xl from-base-200 sticky bottom-0 w-full p-5">
        <div className="relative w-full h-full flex items-center justify-center max-w-xl mx-auto">
          <button
            onClick={() => {
              router.push("/getstarted?t=" + selected);
            }}
            className="btn btn-success w-full absolute left-0 bottom-0"
          >
            Pake template ini
          </button>
        </div>
      </div>
    )}
  </>;
}
