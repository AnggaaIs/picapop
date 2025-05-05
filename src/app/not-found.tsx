import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[100vh] h-full">
      <div className="flex items-center justify-center px-4 py-8 mx-auto sm:py-16 lg:py-24 lg:px-6 h-full">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#34364a]">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-[#34364a]">Something&#39;s missing.</p>
          <p className="mb-4 text-lg font-light text-[#34364a]">Sorry, we can&rsquo;t find that page. You&#39;ll find lots to explore on the home page. </p>
          <Link href="/" className="inline-flex text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
        </div>
      </div>
    </section>
  )
}