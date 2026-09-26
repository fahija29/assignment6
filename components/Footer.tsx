export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 sm:justify-start">
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="h-9 w-9 object-contain"
          />

          <p className="text-lg font-black tracking-[0.15em] text-[#ccff00]">
            FITLOG
          </p>
        </div>

        {/* Copyright */}
        <p className="text-sm text-zinc-600">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}