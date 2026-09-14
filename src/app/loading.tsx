import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] px-6">
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#176c73] to-[#2d9886] text-white shadow-lg shadow-[#176c73]/25">
          <Activity className="h-4 w-4 animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Veya</p>
          <p className="mt-1 text-sm font-medium text-slate-700">Loading your workspace...</p>
        </div>
      </div>
    </main>
  );
}
