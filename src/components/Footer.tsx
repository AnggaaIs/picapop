import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-base-200 rounded-t-3xl md:p-8 lg:p-10">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="/" className="flex justify-center items-center text-2xl font-semibold text-gray-900">
          PicaPop
        </Link>
        <p className="my-6 text-gray-500">Pilih template, ambil foto, dan bagikan hasilnya dalam sekejap!</p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900">
          <li>
            <a href="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-use" className="mr-4 hover:underline md:mr-6">Terms of Use</a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center">© 2025 <a href="https://lazypeople.my.id" className="hover:underline">LazyPeople org</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
