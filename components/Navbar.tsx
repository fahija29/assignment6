"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlan, getSaved } from "../lib/workoutStorage";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  function updateCounts() {
    setPlanCount(getPlan().length);
    setSavedCount(getSaved().length);
  }

  useEffect(() => {
    updateCounts();

    function handleUpdate() {
      updateCounts();
    }

    window.addEventListener("fitlog-update", handleUpdate);

    return () => {
      window.removeEventListener("fitlog-update", handleUpdate);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="h-9 w-9 object-contain"
          />

          <span className="text-lg font-black tracking-[0.15em] text-[#ccff00]">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-full px-5 py-2 text-sm font-black uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-5 py-2 text-sm font-black uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            My Plan
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black transition hover:scale-105"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            Saved {savedCount}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex border-t border-zinc-900 md:hidden">
        <Link
          href="/"
          className="flex-1 py-3 text-center text-xs font-black uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-[#ccff00]"
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          className="flex-1 border-l border-zinc-900 py-3 text-center text-xs font-black uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-[#ccff00]"
        >
          My Plan
        </Link>
      </div>
    </nav>
  );
}