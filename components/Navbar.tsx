"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlan, getSaved } from "../lib/workoutStorage";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    };

    updateCounts();

    window.addEventListener("fitlog-update", updateCounts);

    return () => {
      window.removeEventListener("fitlog-update", updateCounts);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-[9999] border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="h-9 w-9 object-contain"
          />

          <span className="text-lg font-black tracking-[0.15em] text-[#ccff00]">
            FITLOG
          </span>
        </Link>

        {/* CENTER MENU */}
        <div className="hidden items-center gap-2 md:flex">

          {/* WORKOUT */}
          <Link
            href="/?from=page"
            className="cursor-pointer rounded-full px-5 py-2 text-sm font-black uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            Workout
          </Link>

          {/* MY PLAN */}
          <Link
            href="/my-plan?tab=myplan"
            className="cursor-pointer rounded-full px-5 py-2 text-sm font-black uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            My Plan
          </Link>

        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-2">

          {/* PLAN */}
          <Link
            href="/my-plan?tab=plan"
            className="cursor-pointer rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black transition hover:scale-105"
          >
            Plan {planCount}
          </Link>

          {/* SAVED */}
          <Link
            href="/my-plan?tab=saved"
            className="cursor-pointer rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            Saved {savedCount}
          </Link>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="flex border-t border-zinc-900 md:hidden">

        {/* MOBILE WORKOUT */}
        <Link
          href="/?from=page"
          className="flex-1 cursor-pointer py-3 text-center text-xs font-black uppercase text-zinc-400 hover:bg-zinc-900 hover:text-[#ccff00]"
        >
          Workout
        </Link>

        {/* MOBILE MY PLAN */}
        <Link
          href="/my-plan?tab=plan"
          className="flex-1 cursor-pointer border-l border-zinc-900 py-3 text-center text-xs font-black uppercase text-zinc-400 hover:bg-zinc-900 hover:text-[#ccff00]"
        >
          My Plan
        </Link>

      </div>
    </nav>
  );
}