"use client";

import Link from "next/link";
import { motion, useTransform, useViewportScroll } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useViewportScroll();

  const opacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const scale = useTransform(scrollY, [0, 100], [0.95, 1]);
  const borderRadius = useTransform(scrollY, [0, 100], [24, 16]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.div
        style={{
          opacity,
          scale,
          borderRadius,
        }}
        className="navbar bg-white/10 backdrop-blur-md shadow-sm border border-white/20 rounded-2xl max-w-7xl mx-auto"
      >
        <div className="flex-1">
          <Link
            href={"/"}
            className="btn btn-ghost bg-transparent rounded-xl shadow-none text-xl font-bold text-gray-800 hover:text-emerald-600"
          >
            PicaPop
          </Link>
        </div>
        <div className="flex-none">
          <ul className="flex gap-2 text-sm px-2">
            <li className="transition-all py-2.5 px-5 hover:cursor-pointer hover:bg-emerald-600 hover:text-white rounded-xl bg-transparent text-gray-700 font-medium">
              <Link href={"/templates"}>Templates</Link>
            </li>
            <li className="transition-all py-2.5 px-5 hover:cursor-pointer hover:bg-emerald-600 hover:text-white rounded-xl bg-transparent text-gray-700 font-medium">
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
