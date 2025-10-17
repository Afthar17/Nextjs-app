"use client";

import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

const Navbar = ({ session }: { session: Session | null }) => (
  <nav className="bg-white shadow-md px-2 border-b border-gray-200">
    <div className="container mx-auto flex justify-between items-center px-6 lg:p-8">
      <Link href="/" className="flex items-center gap-2 ">
        <Image src="/icon.png" alt="logo" width={40} height={30} />
        <span className="font-semibold">Sancharam</span>
      </Link>
      <div className="flex items-center space-x-6">
        {!session ? (
          <button
            onClick={login}
            className="bg-slate-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300"
          >
            Sign In
            <GithubIcon className="inline ml-2" />
          </button>
        ) : (
          <>
            <Link
              href={`/`}
              className="text-sm font-semibold text-slate-900 hover:text-slate-600"
            >
              Home
            </Link>
            <Link
              href={"/trips"}
              className="text-sm font-semibold text-slate-900 hover:text-slate-600"
            >
              My Trips
            </Link>
            <Link
              href={"/globe"}
              className="text-sm font-semibold text-slate-900 hover:text-slate-600"
            >
              Explored
            </Link>
            <button
              onClick={logout}
              className="bg-[#c1121f] text-[#fdf0d5] text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-[#c1121f]/90 hover:scale-105 transition duration-300"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;
