import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">This workspace route isn’t available or may have moved. Please return to the main dashboard.</p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#176c73] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,108,115,0.25)] transition hover:bg-[#125860]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </main>
  );
}
