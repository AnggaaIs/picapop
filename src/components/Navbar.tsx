'use client';

import Link from "next/link";

export default function Navbar() {
  // const { setTheme } = useTheme()
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost bg-transparent rounded-xl shadow-none text-xl text-[#34364a]">PicaPop</Link>
      </div>
      {/* <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048">
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
            {themes.map((theme, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={theme.label}
                  onClick={() => setTheme(theme.value)}
                  value={theme.value} />
              </li>
            ))}
          </ul>
        </div>

      </div> */}
    </div>
  )
}