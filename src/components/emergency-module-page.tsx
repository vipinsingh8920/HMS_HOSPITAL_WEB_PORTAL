"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, BedDouble, CheckCircle2, Eye, Search, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HmsShell, StatCard } from "@/components/hms-shell";

const emergencyRows = [
  { patientId: "P-303", arrival: "09:18 AM", triage: "Critical", bay: "ER-04", complaint: "Chest pain", status: "Under observation", doctor: "Dr. Dev Nair", department: "Emergency" },
  { patientId: "P-302", arrival: "09:42 AM", triage: "High priority", bay: "ER-02", complaint: "Cardiac review", status: "Admitted", doctor: "Dr. Asha Sharma", department: "Cardiology" },
  { patientId: "P-301", arrival: "10:05 AM", triage: "Priority", bay: "ER-07", complaint: "Severe headache", status: "Waiting", doctor: "Dr. Dev Nair", department: "General Medicine" },
];

const patients = {
  "P-301": { name: "Meera Iyer", age: 34, gender: "Female" },
  "P-302": { name: "Arjun Nair", age: 57, gender: "Male" },
  "P-303": { name: "Fatima Khan", age: 42, gender: "Female" },
};

export function EmergencyModulePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const visibleRows = emergencyRows.filter((row) => {
    const patient = patients[row.patientId as keyof typeof patients];
    const matchesSearch = `${patient.name} ${row.patientId} ${row.bay} ${row.complaint} ${row.doctor}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || row.triage === filter || row.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Emergency management" description="Coordinate triage, emergency bays, and rapid clinical response." breadcrumbs={["Hospital", "Emergency"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Active cases" value="12" note="3 critical" icon={AlertTriangle} tone="rose" /><StatCard label="Critical" value="03" note="Immediate attention" icon={Activity} tone="rose" /><StatCard label="Available bays" value="08" note="Across emergency unit" icon={BedDouble} tone="green" /><StatCard label="Avg response" value="06 min" note="2 min faster today" icon={CheckCircle2} tone="blue" /></div>

      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#d98a68] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3c5ae]">Emergency department</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Live triage queue</h3><p className="mt-1 text-sm text-white/60">Prioritize urgent patients and monitor bay allocation.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">24/7</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f3c5ae]/70">Response coverage</div></div></div>

        <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"><Search size={15} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient, bay, complaint, or doctor" className="min-w-0 w-full bg-transparent text-xs outline-none placeholder:text-slate-400" /></div><div className="flex gap-1 overflow-x-auto">{["All", "Critical", "High priority", "Under observation", "Waiting"].map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === item ? "bg-[#173f4a] text-white" : "text-slate-500 hover:bg-[#f9e9e4] hover:text-[#a55f5a]"}`}>{item}</button>)}</div></div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]">
          <div className="hidden overflow-x-auto md:block"><div className="w-full min-w-[1040px]"><div className="flex w-full items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient</span><span className="w-32 shrink-0">Triage & bay</span><span className="min-w-0 flex-1">Presenting complaint</span><span className="w-28 shrink-0">Arrival</span><span className="w-32 shrink-0">Status</span><span className="w-36 shrink-0 text-center">Action</span></div>{visibleRows.map((row) => { const patient = patients[row.patientId as keyof typeof patients]; return <div key={row.patientId} className="group flex w-full items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4ded5] via-[#faeee8] to-white text-sm font-bold text-[#a55f5a] shadow-sm ring-1 ring-[#eed1c8]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold text-slate-900">{patient.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{row.patientId} · {patient.age} yrs · {patient.gender}</div></div><div className="w-32 shrink-0"><Badge tone={row.triage === "Critical" ? "rose" : row.triage === "High priority" ? "amber" : "blue"}>{row.triage}</Badge><div className="mt-2 text-xs font-medium text-[#a55f5a]">Bay {row.bay}</div></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-slate-800">{row.complaint}</div><div className="mt-1 truncate text-xs text-slate-500">Assigned: {row.doctor} · {row.department}</div></div><div className="w-28 shrink-0 text-xs font-medium text-slate-500">{row.arrival}</div><div className="w-32 shrink-0"><Badge tone={row.status === "Under observation" ? "amber" : row.status === "Admitted" ? "blue" : "slate"}>{row.status}</Badge></div><div className="w-36 shrink-0"><Link href={`/hospital/emergency/patients/${row.patientId}`} className="inline-flex h-9 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#173f4a] px-2 text-[11px] font-semibold !text-white shadow-[0_6px_14px_rgba(23,63,74,0.16)] transition hover:bg-[#a55f5a]" title={`Open ${patient.name} profile`}><Eye size={14} /> Open profile</Link></div></div>; })}</div></div>
          <div className="divide-y divide-slate-200 md:hidden">{visibleRows.map((row) => { const patient = patients[row.patientId as keyof typeof patients]; return <article key={row.patientId} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f7e6e3] text-sm font-bold text-[#a55f5a]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient.name}</div><div className="mt-1 text-xs text-slate-500">{row.patientId} · {patient.age} yrs · {patient.gender}</div></div></div><Badge tone={row.triage === "Critical" ? "rose" : row.triage === "High priority" ? "amber" : "blue"}>{row.triage}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Bay</div><div className="mt-1 font-semibold text-slate-800">{row.bay}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Arrival</div><div className="mt-1 text-slate-600">{row.arrival}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Complaint</div><div className="mt-1 font-semibold text-slate-800">{row.complaint}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Status</div><div className="mt-1"><Badge tone={row.status === "Under observation" ? "amber" : row.status === "Admitted" ? "blue" : "slate"}>{row.status}</Badge></div></div></div><Link href={`/hospital/emergency/patients/${row.patientId}`} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#173f4a] px-3 py-2.5 text-xs font-semibold !text-white shadow-[0_8px_18px_rgba(23,63,74,0.14)] transition hover:bg-[#a55f5a]"><Eye size={15} /> Open patient profile</Link></article>; })}</div>
        </div>
      </section>
    </HmsShell>
  );
}
