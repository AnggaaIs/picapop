'use client';

import Link from "next/link";
import { motion, useTransform, useViewportScroll } from "framer-motion";

export default function Navbar() {
  // const { setTheme } = useTheme()
  const { scrollY } = useViewportScroll();
  const height = useTransform(scrollY, [0, 100], [100, 60]);

  const bg = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']);
  const shadow = useTransform(scrollY, [0, 100], ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 0px 20px rgba(0, 0, 0, 0.1)']);
  return (
    <motion.div style={{
      background: bg,
      height,
      boxShadow: shadow,
    }} className="navbar fixed z-15">
      <div className="flex-1">
        <Link href={'/'} className="btn btn-ghost bg-transparent rounded-xl shadow-none text-xl">PicaPop</Link>
      </div>
      <div className="flex-none">
        <ul className="flex gap-2 *:transition-all *:py-2.5 *:px-5 *:hover:shadow-none *:hover:cursor-pointer *:hover:bg-[#34364a] *:hover:text-white *:rounded-xl *:bg-tranparent text-sm px-2">
          <li className=""><Link href={'/templates'}>Templates</Link></li>
          <li><Link href={'/about'}>About</Link></li>
        </ul>
      </div>
    </motion.div>
  )
}