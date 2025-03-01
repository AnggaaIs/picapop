import Image from "next/image";

export default function Home() {
  return (
    <div className="flex p-10 justify-center h-screen">
      <div className="flex flex-col items-center max-w-6xl md:p-5 rounded-xl w-full">
        <h2 className="text-center text-4xl font-semibold">PhotoBox</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
        <div className="mt-14 w-[300px] flex items-center justify-center bg-blue-300 relative">
          {/* <p>ok</p> */}
          <Image className="absolute left-0 top-0 -rotate-12" src="/example/template1.png" alt="contoh" width={100} height={100} />
          <Image className="absolute left-16 top-14 -rotate-6" src="/example/template2.png" alt="contoh" width={100} height={100} />
          <Image className="absolute left-34 top-0 rotate-6" src="/example/template3.png" alt="contoh" width={100} height={100} />
          <Image className="absolute left-50 top-18 rotate-16" src="/example/template4.png" alt="contoh" width={100} height={100} />
        </div>
        <div className="mt-106 pb-20 w-full flex items-center justify-center">
        <button className="btn btn-success btn-wide">Lets Start</button>
        </div>
      </div>
    </div>
  );
}
