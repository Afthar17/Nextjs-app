"use client";

import Image from "next/image";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/auth-actions";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <Image
        src={heroBg}
        alt="Mountains"
        fill
        priority
        className="object-cover brightness-[0.75]"
      />

      <div className="relative z-10 text-center text-white px-4">
        <p className="text-sm font-semibold mb-2">The call of the</p>
        <h1 className="text-7xl font-extrabold leading-tight">Mountains</h1>

        {session ? (
          <>
            <button className="mt-6 border  text-sm font-semibold py-3 px-5 rounded-full bg-white text-black  hover:border-white hover:bg-transparent hover:text-white transition duration-300">
              <Link href="/trips">
                View Trips <ArrowRight className="inline ml-2" />
              </Link>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={login}
              className="mt-6 border  text-sm font-semibold py-3 px-5 rounded-full bg-white text-black  hover:border-white hover:bg-transparent hover:text-white transition duration-300    "
            >
              Sign In <Github className="inline ml-2" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
