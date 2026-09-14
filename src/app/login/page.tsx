"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Activity, ArrowLeft, ArrowRight, Check, CheckCircle2, LockKeyhole, Mail, Stethoscope, Users, FlaskConical } from "lucide-react";
import { roleOptions } from "@/lib/permissions";

type LoginRole = "HOSPITAL_ADMIN" | "DOCTOR" | "RECEPTIONIST" | "LAB_MANAGER";

const loginRoles: LoginRole[] = ["HOSPITAL_ADMIN", "DOCTOR", "RECEPTIONIST", "LAB_MANAGER"];
const roleIcons = { HOSPITAL_ADMIN: Users, DOCTOR: Stethoscope, RECEPTIONIST: Users, LAB_MANAGER: FlaskConical };
const destinations: Record<LoginRole, string> = {
  HOSPITAL_ADMIN: "/hospital/dashboard",
  DOCTOR: "/doctor/dashboard",
  RECEPTIONIST: "/reception/dashboard",
  LAB_MANAGER: "/lab/dashboard",
};

export default function LoginPage() {
  const [selected, setSelected] = useState<LoginRole>("HOSPITAL_ADMIN");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const router = useRouter();
  const availableRoles = roleOptions.filter((option) => loginRoles.includes(option.id as LoginRole));
  const selectedRole = availableRoles.find((option) => option.id === selected);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#e7f0ee] text-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(8, 37, 43, .9) 0%, rgba(8, 37, 43, .66) 43%, rgba(235, 244, 241, .08) 74%), url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=2200&q=88')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(89,212,184,0.2),transparent_28%),linear-gradient(180deg,transparent_52%,rgba(5,32,39,0.32))]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center justify-between gap-12 px-5 py-6 sm:px-8 lg:px-14">
        <section className="hidden max-w-xl self-stretch flex-col justify-between py-5 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#4fb9aa] text-lg font-bold shadow-[0_10px_30px_rgba(79,185,170,0.35)]">A</div>
            <div><div className="text-xl font-semibold tracking-tight">appziora</div><div className="text-[9px] font-semibold tracking-[0.28em] text-teal-100/75">HMS</div></div>
          </div>
          <div className="max-w-md pb-8">
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-200"><span className="h-2 w-2 rounded-full bg-teal-300" /> Royal Care Hospital</div>
            <h1 className="text-6xl font-semibold leading-[0.93] tracking-[-0.07em] xl:text-8xl">Care that<br /><span className="font-serif font-normal italic text-teal-200">moves together.</span></h1>
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/70">A calm command center for every patient, clinician, and care team in your hospital.</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/65"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_5px_rgba(110,231,183,0.18)]" /> Secure clinical workspace <span className="h-4 w-px bg-white/20" /> All systems operational</div>
        </section>

        <section className="ml-auto w-full max-w-[500px] rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_28px_90px_rgba(7,36,43,0.24)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e4f5ef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#178576]"><LockKeyhole size={12} /> {forgotPassword ? "Account recovery" : "Secure sign in"}</div><h2 className="text-3xl font-semibold tracking-[-0.05em]">{forgotPassword ? "Reset your password" : "Welcome back"}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{forgotPassword ? "We will send a secure reset link to your work email." : "Choose your clinical workspace to continue."}</p></div>
            <Activity className="mt-2 text-[#1ba38d]" size={25} />
          </div>

          {forgotPassword ? (
            resetSent ? (
              <div className="rounded-2xl border border-[#c9eadf] bg-[#f1fbf7] p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#d9f3e9] text-[#168c78]"><CheckCircle2 size={28} /></div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">Check your inbox</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">If an account exists for <strong className="font-semibold text-slate-800">{resetEmail}</strong>, we have sent instructions to reset your password.</p>
                <p className="mt-4 text-xs text-slate-500">The link will expire in 30 minutes.</p>
                <button type="button" onClick={() => { setResetSent(false); setResetEmail(""); }} className="mt-6 text-sm font-semibold text-[#168c78] hover:text-[#125860]">Use a different email</button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setResetSent(true); }}>
                <div className="rounded-2xl bg-[#f3f8f6] p-4"><div className="flex items-start gap-3"><div className="mt-0.5 text-[#168c78]"><Mail size={18} /></div><p className="text-sm leading-6 text-slate-600">Enter the work email linked to your appziora HMS account and we&apos;ll send you a secure password reset link.</p></div></div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Work email<input required type="email" value={resetEmail} onChange={(event) => setResetEmail(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-[#2baf97] focus:ring-4 focus:ring-[#2baf9715]" placeholder="name@royalcare.in" /></label>
                <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#176c73] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,108,115,0.25)] transition hover:bg-[#125860]">Send reset link <ArrowRight size={16} /></button>
                <button type="button" onClick={() => setForgotPassword(false)} className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#168c78]"><ArrowLeft size={15} /> Back to sign in</button>
              </form>
            )
          ) : (
            <>
          <div className="mb-7 grid grid-cols-2 gap-2.5">
            {availableRoles.map((option) => {
              const role = option.id as LoginRole;
              const Icon = roleIcons[role];
              const active = role === selected;
              return <button key={role} type="button" onClick={() => setSelected(role)} className={`group rounded-2xl border p-3.5 text-left transition ${active ? "border-[#36ad98] bg-[#eaf8f3] shadow-[0_8px_20px_rgba(27,163,141,0.12)]" : "border-slate-200 bg-white hover:border-[#9bd7c8] hover:bg-[#f7fcfa]"}`}><div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? "bg-[#1b9b87] text-white" : "bg-slate-100 text-slate-500 group-hover:bg-[#e3f5ef] group-hover:text-[#188d7a]"}`}><Icon size={17} /></span><span className="min-w-0 flex-1"><strong className="block text-xs font-semibold text-slate-900">{option.label}</strong><small className="mt-1 block truncate text-[10px] text-slate-500">{option.description}</small></span>{active && <Check size={16} className="text-[#168c78]" />}</div></button>;
            })}
          </div>

          <div className="mb-6 rounded-2xl bg-[#f3f8f6] p-4"><div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Selected access</div><p className="mt-2 text-sm leading-5 text-slate-700">{selectedRole?.accessSummary}</p></div>

          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); router.push(destinations[selected]); }}>
            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Work email<input className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-[#2baf97] focus:ring-4 focus:ring-[#2baf9715]" placeholder="name@royalcare.in" /></label>
            <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Password<input type="password" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-[#2baf97] focus:ring-4 focus:ring-[#2baf9715]" placeholder="Enter your password" /></label>
            <div className="flex items-center justify-between pt-1 text-xs text-slate-500"><label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[#1b9b87]" /> Remember this device</label><button type="button" onClick={() => setForgotPassword(true)} className="font-semibold text-[#168c78] hover:text-[#125860]">Forgot password?</button></div>
            <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#176c73] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,108,115,0.25)] transition hover:bg-[#125860]">Enter {selectedRole?.label} workspace <ArrowRight size={16} /></button>
          </form>
            </>
          )}
          <p className="mt-6 text-center text-[10px] text-slate-400">Protected access for authorized Royal Care Hospital teams</p>
        </section>
      </div>
    </main>
  );
}
