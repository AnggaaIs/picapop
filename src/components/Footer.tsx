import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-10 z-[10] bg-[#34364a] md:p-8 lg:p-10">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="/" className="font-extrabold flex justify-center items-center text-2xl text-white">
          PicaPop
        </Link>
        <p className="mb-6 mt-2 text-white/70">Pilih template, ambil foto, dan bagikan hasilnya dalam sekejap!</p>
        <ul className="flex text-sm flex-wrap justify-center items-center mb-6 text-white/80">
          <li>
            <Link href="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms-of-use" className="mr-4 hover:underline md:mr-6">Terms of Use</Link>
          </li>
          <li>
            <Link href="/about" className="mr-4 hover:underline md:mr-6">About Us</Link>
          </li>
        </ul>
        <span className="text-sm text-gray-200 sm:text-center">© 2025 <a href="https://lazypeople.my.id" className="hover:underline">LazyPeople org</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
