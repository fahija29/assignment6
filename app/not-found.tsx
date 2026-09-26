import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <p className="mb-4 font-bold tracking-widest text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="mb-4 text-7xl font-black">
          404
        </h1>

        <h2 className="mb-3 text-2xl font-bold">
          WORKOUT NOT FOUND
        </h2>

        <p className="mb-8 text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:opacity-90"
        >
          BACK TO WORKOUTS
        </Link>
      </div>
    </div>
  );
}