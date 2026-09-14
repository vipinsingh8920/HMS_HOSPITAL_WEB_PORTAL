"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, CheckCircle2, Eye, FlaskConical, Pill, Search, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HmsShell, StatCard } from "@/components/hms-shell";

export type ClinicalOrder = {
  id: string;
  type: "Laboratory" | "Medicine";
  patientId: string;
  patient: string;
  age: number;
  gender: string;
  item: string;
  department: string;
  doctor: string;
  priority: "Routine" | "Urgent" | "Critical";
  status: "Pending" | "Processing" | "Completed" | "Rejected" | "Dispensed";
  orderedAt: string;
  reason: string;
  instructions: string;
  quantity: string;
};

const orders: ClinicalOrder[] = [
  { id: "LAB-204", type: "Laboratory", patientId: "P-302", patient: "Arjun Nair", age: 57, gender: "Male", item: "Complete Blood Count", department: "Cardiology", doctor: "Dr. Asha Sharma", priority: "Urgent", status: "Pending", orderedAt: "14 Sep 2026 · 10:14 AM", reason: "Cardiac observation and medication review", instructions: "Collect EDTA blood sample and flag abnormal haemoglobin values.", quantity: "1 test" },
  { id: "LAB-205", type: "Laboratory", patientId: "P-301", patient: "Meera Iyer", age: 34, gender: "Female", item: "Liver Function Test", department: "General Medicine", doctor: "Dr. Dev Nair", priority: "Routine", status: "Processing", orderedAt: "14 Sep 2026 · 09:48 AM", reason: "Baseline review before medication plan", instructions: "Fast for 8 hours. Release verified results to the ordering clinician.", quantity: "1 panel" },
  { id: "LAB-206", type: "Laboratory", patientId: "P-303", patient: "Fatima Khan", age: 42, gender: "Female", item: "Troponin I", department: "Emergency", doctor: "Dr. Dev Nair", priority: "Critical", status: "Completed", orderedAt: "14 Sep 2026 · 08:56 AM", reason: "Acute chest pain and emergency triage", instructions: "Immediate processing. Notify the emergency consultant for critical values.", quantity: "1 test" },
];

export function LaboratoryModulePage() {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const visibleOrders = orders.filter((order) => `${order.patient} ${order.patientId} ${order.item} ${order.doctor} ${order.department}`.toLowerCase().includes(search.toLowerCase()) && (status === "All" || order.status === status));

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Laboratory management" description="Review doctor-raised investigations, monitor processing, and track verified results." breadcrumbs={["Hospital", "Laboratory"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Total orders" value="104" note="This month" icon={FlaskConical} tone="blue" /><StatCard label="Active orders" value="40" note="12 urgent" icon={Activity} tone="amber" /><StatCard label="Completed" value="64" note="Today" icon={CheckCircle2} tone="green" /><StatCard label="Needs review" value="03" note="Requires correction" icon={AlertTriangle} tone="rose" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#6b9eb1] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bfdeea]">Clinical diagnostics</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Laboratory order worklist</h3><p className="mt-1 text-sm text-white/60">Doctor-raised investigations across every department.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visibleOrders.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bfdeea]/70">Visible orders</div></div></div>
        <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm"><div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"><Search size={15} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient, order, doctor, or department" className="min-w-0 w-full bg-transparent text-xs outline-none placeholder:text-slate-400" /></div><div className="flex gap-1 overflow-x-auto">{["All", "Pending", "Processing", "Completed"].map((item) => <button key={item} type="button" onClick={() => setStatus(item)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${status === item ? "bg-[#e5f1f4] text-[#356a87]" : "text-slate-500 hover:bg-slate-50"}`}>{item}</button>)}</div></div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]"><div className="hidden overflow-x-auto lg:block"><div className="w-full min-w-[1120px]"><div className="flex w-full items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-11 shrink-0" /><span className="w-44 shrink-0">Patient / order</span><span className="min-w-52 flex-1">Order details</span><span className="w-36 shrink-0">Ordered by</span><span className="w-24 shrink-0">Priority</span><span className="w-28 shrink-0">Status</span><span className="w-36 shrink-0 text-center">Action</span></div>{visibleOrders.map((order) => <OrderRow key={order.id} order={order} />)}</div></div><div className="divide-y divide-slate-200 lg:hidden">{visibleOrders.map((order) => <OrderCard key={order.id} order={order} />)}</div></div>
      </section>
    </HmsShell>
  );
}

function OrderRow({ order }: { order: ClinicalOrder }) { return <div className="group flex w-full items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${order.type === "Medicine" ? "bg-[#e4f4ed] text-[#2d7562] ring-1 ring-[#c6e5d8]" : "bg-[#e6eff5] text-[#356a87] ring-1 ring-[#cbdde7]"}`}>{order.type === "Medicine" ? <Pill size={18} /> : <FlaskConical size={18} />}</div><div className="w-44 shrink-0"><div className="font-semibold text-slate-900">{order.patient}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{order.id} · {order.orderedAt}</div></div><div className="min-w-52 flex-1"><div className="text-sm font-semibold text-slate-800">{order.item}</div><div className="mt-1 text-xs text-slate-500">{order.type} · {order.department}</div></div><div className="w-36 shrink-0"><div className="text-sm font-semibold text-slate-800">{order.doctor}</div><div className="mt-1 text-xs text-slate-500">Ordering clinician</div></div><div className="w-24 shrink-0"><Badge tone={order.priority === "Critical" ? "rose" : order.priority === "Urgent" ? "amber" : "slate"}>{order.priority}</Badge></div><div className="w-28 shrink-0"><Badge tone={order.status === "Completed" || order.status === "Dispensed" ? "green" : order.status === "Processing" ? "blue" : order.status === "Rejected" ? "rose" : "amber"}>{order.status}</Badge></div><div className="w-36 shrink-0"><Link href={`/hospital/laboratory/orders/${order.id}`} className="inline-flex h-9 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#173f4a] px-2 text-[11px] font-semibold !text-white shadow-[0_6px_14px_rgba(23,63,74,0.16)] transition hover:bg-[#356a87]" title={`Open ${order.id} details`}><Eye size={14} /> Open details</Link></div></div>; }

function OrderCard({ order }: { order: ClinicalOrder }) { return <article className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${order.type === "Medicine" ? "bg-[#e4f4ed] text-[#2d7562]" : "bg-[#e6eff5] text-[#356a87]"}`}>{order.type === "Medicine" ? <Pill size={17} /> : <FlaskConical size={17} />}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{order.patient}</div><div className="mt-1 text-xs text-slate-500">{order.id} · {order.type}</div></div></div><Badge tone={order.status === "Completed" || order.status === "Dispensed" ? "green" : order.status === "Processing" ? "blue" : order.priority === "Critical" ? "rose" : "amber"}>{order.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><OrderDetail label="Order" value={order.item} /><OrderDetail label="Ordered by" value={order.doctor} /><OrderDetail label="Date & time" value={order.orderedAt} /><OrderDetail label="Priority" value={order.priority} /><OrderDetail label="Department" value={order.department} /><OrderDetail label="Quantity" value={order.quantity} /></div><Link href={`/hospital/laboratory/orders/${order.id}`} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#173f4a] px-3 py-2.5 text-xs font-semibold !text-white shadow-[0_8px_18px_rgba(23,63,74,0.14)] transition hover:bg-[#356a87]"><Eye size={15} /> Open order details</Link></article>; }

function OrderDetail({ label, value }: { label: string; value: string }) { return <div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</div><div className="mt-1 font-semibold text-slate-800">{value}</div></div>; }
