'use client';

import Link from "next/link";

export default function Navbar() {
  // const { setTheme } = useTheme()
  return (
    <div className="navbar bg-white">
      <div className="flex-1">
        <Link href={'/'} className="btn btn-ghost bg-transparent rounded-xl shadow-none text-xl">PicaPop</Link>
      </div>
      <div className="flex-none">
        <ul className="flex gap-2 *:transition-all *:py-2.5 *:px-5 *:hover:shadow-none *:hover:cursor-pointer *:hover:bg-[#34364a] *:hover:text-white *:rounded-xl *:bg-tranparent text-sm px-2">
          <li className=""><Link href={'/templates'}>Templates</Link></li>
          <li><Link href={'/about'}>About</Link></li>
        </ul>
      </div>
    </div>
  )
}