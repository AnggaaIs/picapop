/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useTheme } from "next-themes"

export default function Navbar() {
  const { setTheme } = useTheme()
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">PhotoBox</a>
      </div>
      <div className="flex-none">
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
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Light"
                onClick={() => setTheme("light")}
                value="default" />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                onClick={() => setTheme("retro")}
                value="retro" />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                onClick={() => setTheme("cyberpunk")}
                value="cyberpunk" />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Valentine"
                onClick={() => setTheme("valentine")}
                value="valentine" />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Aqua"
                onClick={() => setTheme("aqua")}
                value="aqua" />
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}