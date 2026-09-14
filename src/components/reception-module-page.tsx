"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, CreditCard, FileText, Plus, UserRound, Users, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HmsShell, SectionCard, StatCard } from "@/components/hms-shell";
import { ReceptionPatientRegistrationDialog } from "@/components/reception-patient-registration-dialog";

const frontDeskQueue = [
  { id: "P-401", name: "Rahul Menon", detail: "New registration · OPD 01", time: "08:45 AM", status: "Waiting", tone: "amber" as const },
  { id: "P-402", name: "Sana Sheikh", detail: "Checked in · Dr. Mehta", time: "09:00 AM", status: "Checked in", tone: "green" as const },
  { id: "P-403", name: "Vikram Joshi", detail: "Payment pending · OPD 03", time: "09:15 AM", status: "Payment due", tone: "rose" as const },
  { id: "P-404", name: "Anita Rao", detail: "Follow-up · General Medicine", time: "09:30 AM", status: "Confirmed", tone: "blue" as const },
];

const todaySchedule = [
  { time: "09:00", patient: "Sana Sheikh", doctor: "Dr. Rohan Mehta", department: "Dermatology", status: "Checked in" },
  { time: "09:30", patient: "Meera Iyer", doctor: "Dr. Dev Nair", department: "General Medicine", status: "Confirmed" },
  { time: "10:15", patient: "Arjun Nair", doctor: "Dr. Asha Sharma", department: "Cardiology", status: "Arriving" },
  { time: "11:00", patient: "Rohan Deshmukh", doctor: "Dr. Kavita Rao", department: "Orthopedics", status: "Confirmed" },
];

export function ReceptionModulePage() {
  const [registrationOpen, setRegistrationOpen] = useState(false);

  return <><HmsShell role="RECEPTIONIST" title="Front desk overview" description="Keep arrivals moving, records accurate, and every patient welcomed." breadcrumbs={["Reception", "Dashboard"]} actions={<Button onClick={() => setRegistrationOpen(true)}><Plus size={15} /> Register patient</Button>}>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Arrivals today" value="38" note="11 awaiting check-in" icon={Users} tone="blue" /><StatCard label="Appointments" value="64" note="18 still to arrive" icon={CalendarDays} tone="green" /><StatCard label="Registration queue" value="07" note="Average wait 8 min" icon={Clock3} tone="amber" /><StatCard label="Outstanding payments" value="₹86K" note="14 invoices open" icon={CreditCard} tone="rose" /></div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
      <SectionCard title="Front desk queue" subtitle="Live arrivals" action={<Button variant="ghost">View all</Button>}>
        <div className="space-y-1">{frontDeskQueue.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-2xl px-2 py-3 transition hover:bg-slate-50"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e3f2ef] text-xs font-bold text-[#176c73]">{item.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-slate-800">{item.name}</div><div className="mt-1 truncate text-xs text-slate-500">{item.detail}</div></div><div className="hidden text-right sm:block"><div className="text-xs font-semibold text-slate-700">{item.time}</div><Badge tone={item.tone}>{item.status}</Badge></div><Clock3 size={15} className="text-slate-300 sm:hidden" /></div>)}</div>
      </SectionCard>

      <SectionCard title="Quick actions" subtitle="Common front desk tasks">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"><QuickAction onClick={() => setRegistrationOpen(true)} icon={UserRound} title="Register patient" detail="Create a new patient record" /><QuickAction href="/reception/appointments" icon={CalendarDays} title="Book appointment" detail="Schedule a patient visit" /><QuickAction href="/reception/billing" icon={WalletCards} title="Collect payment" detail="Record a cash or digital payment" /><QuickAction href="/reception/admissions" icon={FileText} title="Start admission" detail="Begin an inpatient workflow" /></div>
      </SectionCard>
    </div>

    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]"><SectionCard title="Today&apos;s schedule" subtitle="Next appointments" action={<Button variant="ghost">Open calendar</Button>}><div className="overflow-x-auto"><div className="min-w-[620px]"><div className="grid grid-cols-[80px_minmax(160px,1fr)_minmax(180px,1fr)_120px] gap-4 border-b border-slate-200 px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span>Time</span><span>Patient</span><span>Care team</span><span>Status</span></div>{todaySchedule.map((item) => <div key={`${item.time}-${item.patient}`} className="grid grid-cols-[80px_minmax(160px,1fr)_minmax(180px,1fr)_120px] items-center gap-4 border-b border-slate-100 px-3 py-3 last:border-0"><span className="text-sm font-semibold text-[#176c73]">{item.time}</span><span><strong className="block text-sm text-slate-800">{item.patient}</strong><small className="mt-1 block text-xs text-slate-500">{item.department}</small></span><span className="text-sm text-slate-600">{item.doctor}</span><Badge tone={item.status === "Checked in" ? "green" : item.status === "Arriving" ? "amber" : "blue"}>{item.status}</Badge></div>)}</div></div></SectionCard><SectionCard title="Desk activity" subtitle="Latest updates"><div className="space-y-4"><ActivityItem icon={CheckCircle2} title="Patient checked in" detail="Sana Sheikh · 2 minutes ago" tone="green" /><ActivityItem icon={CreditCard} title="Payment received" detail="₹2,400 · Meera Iyer" tone="blue" /><ActivityItem icon={CalendarDays} title="Appointment rescheduled" detail="OPD 03 · 15 minutes ago" tone="amber" /><ActivityItem icon={Users} title="Insurance card scanned" detail="Rahul Menon · 20 minutes ago" tone="rose" /></div></SectionCard></div>
  </HmsShell>{registrationOpen && <ReceptionPatientRegistrationDialog onClose={() => setRegistrationOpen(false)} />}</>;
}

function QuickAction({ href, onClick, icon: Icon, title, detail }: { href?: string; onClick?: () => void; icon: typeof UserRound; title: string; detail: string }) { const content = <><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#176c73] shadow-sm"><Icon size={16} /></span><span className="min-w-0"><strong className="block text-sm text-slate-800">{title}</strong><small className="mt-1 block truncate text-xs text-slate-500">{detail}</small></span></>; return href ? <Link href={href} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-[#b9dcd6] hover:bg-[#f3faf8]">{content}</Link> : <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-left transition hover:border-[#b9dcd6] hover:bg-[#f3faf8]">{content}</button>; }
function ActivityItem({ icon: Icon, title, detail, tone }: { icon: typeof CheckCircle2; title: string; detail: string; tone: "blue" | "green" | "amber" | "rose" }) { const tones = { blue: "bg-blue-50 text-blue-700", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", rose: "bg-rose-50 text-rose-700" }; return <div className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={16} /></span><span><strong className="block text-sm text-slate-800">{title}</strong><small className="mt-1 block text-xs text-slate-500">{detail}</small></span></div>; }
