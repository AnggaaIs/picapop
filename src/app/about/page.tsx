// app/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | PicaPop",
  description: "Learn more about PicaPop, the fun & creative online photo booth for unique selfies!",
};

export default function AboutPage() {
  return (
    <main className="flex items-center justify-center relative mt-15 mb-4 md:px-10 px-5">
      <div className="max-w-5xl flex items-center justify-center flex-col">
        <div className="flex bg-white py-10 rounded-3xl px-5 w-full justify-center items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-center text-[#34384a]">About Us</h1>
          </div>
        </div>
        <div className="py-10">
          <p className="mb-4 text-[#34384a]">
            Welcome to <strong>PicaPop</strong>! We are a creative and fun online photo booth platform that helps you capture unforgettable selfies and photostrips with stylish templates.
          </p>
          <p className="mb-4 text-[#34384a]">
            Founded by a passionate team of developers and designers, our mission is to bring joy and creativity to your photo-taking experience. Whether you&apos;re celebrating with friends or capturing solo moments, PicaPop makes it easy and exciting.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#34384a]">Contact Us</h2>
          <ul className="list-disc text-[#34384a] list-inside">
            <li>Email: support@picapop.my.id</li>
            <li>Instagram: <a className="text-blue-500 underline" href="https://instagram.com/picapop.id">@picapop.id</a></li>
            <li>Address: Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
