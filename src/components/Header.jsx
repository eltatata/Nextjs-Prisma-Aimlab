"use client";

import Link from "next/link";
import { GiBullseye } from "react-icons/gi";
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react'

function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between px-6 py-2 border-b border-gray-700">
      <div className="flex flex-col items-center">
        <GiBullseye className="w-10 h-10" />
        <h2 className="text-2xl font-semibold">Aimlab</h2>
      </div>
      <nav>
        <ul className="flex items-center gap-3">
          <li><Link className="text-lg hover:underline" href="/">Home</Link></li>
          <li><Link className="text-lg hover:underline" href="/practice/">Practice</Link></li>
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        {status === "loading" ? null : (
          session ? (
            <div className="flex gap-3">
              <span className="flex flex-col items-center">
                <p className="text-gray-300 font-bold">{session.user.name}</p>
                <p className="text-gray-700">{session.user.email}</p>
              </span>
              <button
                className="hover:underline"
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href={"/auth/signin"} className="hover:underline">Sign In</Link>
          )
        )}
        <Link href={"/auth/signup"} className="hover:underline">Sign Up</Link>
      </div>
    </header>
  )
}

export default Header