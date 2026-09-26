"use client";

import Footer from "../../components/Footer";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getPlan,
  getSaved,
  removeFromPlan,
  removeSaved,
} from "../../lib/workoutStorage";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export default function MyPlan() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [message, setMessage] = useState("");

  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get active tab directly from URL
  const activeTab =
    searchParams.get("tab") === "saved" ? "saved" : "plan";

  // Load localStorage data
  useEffect(() => {
    const handleUpdate = () => {
      setPlan(getPlan());
      setSaved(getSaved());
    };

    handleUpdate();

    window.addEventListener("fitlog-update", handleUpdate);

    return () => {
      window.removeEventListener("fitlog-update", handleUpdate);

      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  // Scroll to the selected tab when coming from Navbar
  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab !== "plan" && tab !== "saved") {
      return;
    }

    const timer = setTimeout(() => {
      document.getElementById("my-plan-tabs")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Show message
  const showMessage = useCallback((text: string) => {
    setMessage(text);

    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }

    messageTimer.current = setTimeout(() => {
      setMessage("");
    }, 2500);
  }, []);

  // Refresh data
  const refreshData = () => {
    setPlan(getPlan());
    setSaved(getSaved());

    // Update Navbar counters
    window.dispatchEvent(new Event("fitlog-update"));
  };

  // Mark as done
  const handleDone = (id: number) => {
    removeFromPlan(id);

    refreshData();

    showMessage("✓ Workout marked as done!");
  };

  // Remove from Today's Plan
  const handleRemovePlan = (id: number) => {
    removeFromPlan(id);

    refreshData();

    showMessage("Workout removed from today's plan.");
  };

  // Remove from Saved
  const handleRemoveSaved = (id: number) => {
    removeSaved(id);

    refreshData();

    showMessage("Workout removed from saved.");
  };

  // Today's Plan metrics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Show workouts according to selected tab
  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <section className="px-6 pb-8 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black tracking-[0.3em] text-[#ccff00]">
            FITLOG
          </p>

          <h1 className="mt-3 text-5xl font-black uppercase leading-none md:text-7xl">
            MY PLAN
          </h1>

          <p className="mt-5 max-w-xl text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <section className="px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3">

          {/* EXERCISES */}
          <div className="rounded-2xl border border-zinc-800 bg-[#111318] p-6">
            <p className="text-xs font-black tracking-widest text-zinc-500">
              EXERCISES
            </p>

            <p className="mt-3 text-4xl font-black text-[#ccff00]">
              {plan.length}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              of 5 planned
            </p>
          </div>

          {/* MINUTES */}
          <div className="rounded-2xl border border-zinc-800 bg-[#111318] p-6">
            <p className="text-xs font-black tracking-widest text-zinc-500">
              MINUTES
            </p>

            <p className="mt-3 text-4xl font-black text-white">
              {totalMinutes}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              total duration
            </p>
          </div>

          {/* CALORIES */}
          <div className="rounded-2xl border border-zinc-800 bg-[#111318] p-6">
            <p className="text-xs font-black tracking-widest text-zinc-500">
              CALORIES
            </p>

            <p className="mt-3 text-4xl font-black text-white">
              {totalCalories}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              estimated total
            </p>
          </div>

        </div>
      </section>

      {/* TABS */}
      <section
        id="my-plan-tabs"
        className="scroll-mt-24 px-6 pt-10"
      >
        <div className="mx-auto max-w-7xl">

          <div className="flex gap-3 border-b border-zinc-800">

            {/* TODAY'S PLAN */}
            <button
              type="button"
              onClick={() =>
                router.push("/my-plan?tab=plan")
              }
              className={`border-b-2 px-4 py-4 text-sm font-black uppercase transition ${
                activeTab === "plan"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>

            {/* SAVED */}
            <button
              type="button"
              onClick={() =>
                router.push("/my-plan?tab=saved")
              }
              className={`border-b-2 px-4 py-4 text-sm font-black uppercase transition ${
                activeTab === "saved"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>

          </div>
        </div>
      </section>

      {/* MESSAGE */}
      {message && (
        <div className="px-6 pt-6">
          <div className="mx-auto max-w-7xl rounded-xl border border-[#ccff00]/30 bg-[#ccff00]/10 px-5 py-3 text-sm font-bold text-[#ccff00]">
            {message}
          </div>
        </div>
      )}

      {/* WORKOUT LIST */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">

          {currentWorkouts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-[#111318] px-6 py-20 text-center">

              <p className="text-sm font-black tracking-[0.3em] text-[#ccff00]">
                NOTHING HERE YET
              </p>

              <h2 className="mt-4 text-3xl font-black uppercase">
                Your list is empty
              </h2>

              <p className="mx-auto mt-4 max-w-md text-zinc-500">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="mt-7 inline-flex rounded-full bg-[#ccff00] px-7 py-4 font-black uppercase text-black transition hover:scale-[1.02]"
              >
                GO TO WORKOUTS
              </Link>

            </div>
          ) : (

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {currentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#111318]"
                >

                  <div className="flex flex-col sm:flex-row">

                    {/* IMAGE */}
                    <div className="h-56 sm:h-auto sm:w-52">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={workout.image}
                        alt={workout.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-5">

                      {/* MUSCLE GROUPS */}
                      <div className="flex flex-wrap gap-2">
                        {workout.muscleGroups.map((muscle) => (
                          <span
                            key={muscle}
                            className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase text-black"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>

                      {/* NAME */}
                      <h2 className="mt-3 text-xl font-black uppercase">
                        {workout.name}
                      </h2>

                      {/* EQUIPMENT */}
                      <p className="mt-2 text-sm text-zinc-500">
                        {workout.equipment}
                      </p>

                      {/* STATS */}
                      <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-zinc-300">
                        <span>
                          {workout.duration} min
                        </span>

                        <span>
                          {workout.caloriesBurned} kcal
                        </span>

                        <span className="text-[#ccff00]">
                          ★ {workout.rating}
                        </span>
                      </div>

                      {/* BUTTONS */}
                      <div className="mt-5 flex flex-wrap gap-2">

                        {/* VIEW DETAILS */}
                        <Link
                          href={`/workouts/${workout.id}`}
                          className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-black transition hover:bg-[#ccff00]"
                        >
                          VIEW DETAILS
                        </Link>

                        {/* TODAY'S PLAN BUTTONS */}
                        {activeTab === "plan" ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleDone(workout.id)
                              }
                              className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black transition hover:scale-105"
                            >
                              ✓ MARK AS DONE
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemovePlan(workout.id)
                              }
                              className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-zinc-300 transition hover:border-red-500 hover:text-red-400"
                            >
                              ✕ REMOVE
                            </button>
                          </>
                        ) : (

                          /* SAVED REMOVE */
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSaved(workout.id)
                            }
                            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-zinc-300 transition hover:border-red-500 hover:text-red-400"
                          >
                            ✕ REMOVE
                          </button>

                        )}

                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}