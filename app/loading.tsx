export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-[#ccff00] rounded-full animate-spin mx-auto mb-5"></div>

        <p className="text-[#ccff00] font-bold tracking-widest">
          LOADING WORKOUTS...
        </p>
      </div>
    </main>
  );
}