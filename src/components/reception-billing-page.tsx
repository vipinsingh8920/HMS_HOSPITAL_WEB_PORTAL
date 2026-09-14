"use client";

import { useState } from "react";
import { AlertCircle, CreditCard, Eye, FileText, IndianRupee, Search, WalletCards, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HmsShell, StatCard } from "@/components/hms-shell";

type Invoice = {
  id: string;
  patientId: string;
  patient: string;
  age: number;
  service: string;
  department: string;
  payer: string;
  total: string;
  paid: string;
  due: string;
  status: "Paid" | "Pending" | "Partial" | "Overdue";
  issued: string;
  items: string[];
};

const invoices: Invoice[] = [
  { id: "INV-2012", patientId: "P-301", patient: "Meera Iyer", age: 34, service: "General consultation & tests", department: "OPD · General Medicine", payer: "Self-pay", total: "₹2,400", paid: "₹2,400", due: "₹0", status: "Paid", issued: "Today, 09:45 AM", items: ["Consultation · ₹800", "CBC and thyroid panel · ₹1,600"] },
  { id: "INV-2013", patientId: "P-304", patient: "Rohan Deshmukh", age: 29, service: "Orthopedic consultation", department: "OPD · Orthopedics", payer: "Insurance", total: "₹5,950", paid: "₹2,000", due: "₹3,950", status: "Partial", issued: "Today, 09:18 AM", items: ["Specialist consultation · ₹1,500", "X-ray knee · ₹1,450", "Procedure deposit · ₹3,000"] },
  { id: "INV-2014", patientId: "P-305", patient: "Sana Sheikh", age: 26, service: "Follow-up consultation", department: "OPD · Dermatology", payer: "Self-pay", total: "₹1,200", paid: "₹0", due: "₹1,200", status: "Pending", issued: "Today, 08:55 AM", items: ["Follow-up consultation · ₹1,200"] },
  { id: "INV-2010", patientId: "P-302", patient: "Arjun Nair", age: 57, service: "Cardiology admission deposit", department: "IPD · Cardiology", payer: "Insurance", total: "₹18,700", paid: "₹10,800", due: "₹7,900", status: "Overdue", issued: "11 Sep 2026", items: ["Admission deposit · ₹12,000", "Cardiology review · ₹2,500", "Diagnostics deposit · ₹4,200"] },
  { id: "INV-2015", patientId: "P-303", patient: "Fatima Khan", age: 42, service: "Emergency care & observation", department: "Emergency", payer: "Self-pay", total: "₹4,240", paid: "₹2,980", due: "₹1,260", status: "Pending", issued: "Today, 10:40 AM", items: ["Emergency registration · ₹500", "Observation bed · ₹2,400", "Diagnostics · ₹1,340"] },
];

const tabs = ["All", "Pending", "Partial", "Paid", "Overdue"] as const;

type InvoiceFilter = (typeof tabs)[number];

export function ReceptionBillingPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<InvoiceFilter>("All");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const visible = invoices.filter((invoice) => {
    const searchable = `${invoice.id} ${invoice.patient} ${invoice.patientId} ${invoice.service} ${invoice.department} ${invoice.payer}`.toLowerCase();
    return searchable.includes(search.toLowerCase()) && (filter === "All" || invoice.status === filter);
  });

  return (
    <HmsShell role="RECEPTIONIST" title="Billing" description="Review invoices, collect patient payments, and keep receipts accurate at the front desk." breadcrumbs={["Reception", "Billing"]} actions={<Button><CreditCard size={15} /> Collect payment</Button>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Collected today" value="₹86K" note="14 payments received" icon={WalletCards} tone="green" />
        <StatCard label="Open invoices" value="14" note="Across OPD and IPD" icon={FileText} tone="blue" />
        <StatCard label="Outstanding" value="₹32K" note="Needs front-desk follow-up" icon={IndianRupee} tone="amber" />
        <StatCard label="Overdue" value="03" note="Requires escalation" icon={AlertCircle} tone="rose" />
      </div>

      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#c39b58] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]">
          <div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1d9a8]">Front desk billing</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Invoice worklist</h3><p className="mt-1 text-sm text-white/60">Track charges, balances, payers, and the next collection action.</p></div>
          <div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visible.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f1d9a8]/70">Visible invoices</div></div>
        </div>

        <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm">
          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"><Search size={15} className="shrink-0 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search invoice, patient, service, or payer" className="min-w-0 w-full bg-transparent text-xs outline-none placeholder:text-slate-400" /></div>
          <div className="flex gap-1 overflow-x-auto">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setFilter(tab)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === tab ? "bg-[#173f4a] text-white" : "text-slate-500 hover:bg-[#f7efdf] hover:text-[#9b6a31]"}`}>{tab}</button>)}</div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]">
          <div className="hidden overflow-x-auto lg:block"><div className="min-w-[1220px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-11 shrink-0" /><span className="w-44 shrink-0">Patient / invoice</span><span className="min-w-52 flex-1">Service</span><span className="w-32 shrink-0">Payer</span><span className="w-28 shrink-0">Total</span><span className="w-28 shrink-0">Due</span><span className="w-28 shrink-0">Status</span><span className="w-32 shrink-0 text-center">Action</span></div>{visible.map((invoice) => <InvoiceRow key={invoice.id} invoice={invoice} onOpen={setSelectedInvoice} />)}</div></div>
          <div className="divide-y divide-slate-200 lg:hidden">{visible.map((invoice) => <InvoiceCard key={invoice.id} invoice={invoice} onOpen={setSelectedInvoice} />)}</div>
          {visible.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No invoices match your search or filter.</div>}
        </div>
      </section>
      {selectedInvoice && <InvoiceDetails invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
    </HmsShell>
  );
}

function InvoiceRow({ invoice, onOpen }: { invoice: Invoice; onOpen: (invoice: Invoice) => void }) {
  return <div className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f5ead4] text-sm font-bold text-[#9b6a31] ring-1 ring-[#eddbb8]">{invoice.patient.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold text-slate-900">{invoice.patient}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{invoice.id} · {invoice.patientId} · {invoice.age} yrs</div></div><div className="min-w-52 flex-1"><div className="truncate text-sm font-semibold text-slate-800">{invoice.service}</div><div className="mt-1 truncate text-xs text-slate-500">{invoice.department} · {invoice.issued}</div></div><div className="w-32 shrink-0 text-sm font-medium text-slate-700">{invoice.payer}</div><div className="w-28 shrink-0 text-sm font-semibold text-slate-800">{invoice.total}</div><div className={`w-28 shrink-0 text-sm font-semibold ${invoice.due === "₹0" ? "text-[#2d7562]" : "text-[#9b6a31]"}`}>{invoice.due}</div><div className="w-28 shrink-0"><InvoiceStatus status={invoice.status} /></div><div className="w-32 shrink-0"><button type="button" onClick={() => onOpen(invoice)} className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-[#173f4a] px-2 text-[11px] font-semibold text-white shadow-[0_6px_14px_rgba(23,63,74,0.16)] transition hover:bg-[#28717a]"><Eye size={14} /> Open details</button></div></div>;
}

function InvoiceCard({ invoice, onOpen }: { invoice: Invoice; onOpen: (invoice: Invoice) => void }) {
  return <article className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f5ead4] text-sm font-bold text-[#9b6a31]">{invoice.patient.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{invoice.patient}</div><div className="mt-1 text-xs text-slate-500">{invoice.id} · {invoice.patientId} · {invoice.age} yrs</div></div></div><InvoiceStatus status={invoice.status} /></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><Detail label="Service" value={invoice.service} /><Detail label="Payer" value={invoice.payer} /><Detail label="Total" value={invoice.total} /><Detail label="Balance due" value={invoice.due} /><div className="col-span-2"><Detail label="Issued" value={invoice.issued} /></div></div><button type="button" onClick={() => onOpen(invoice)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#173f4a] px-3 py-2.5 text-xs font-semibold text-white shadow-[0_8px_18px_rgba(23,63,74,0.14)] transition hover:bg-[#28717a]"><Eye size={15} /> Open invoice details</button></article>;
}

function InvoiceDetails({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(23,63,74,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="reception-invoice-detail-title"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b6a31]">Invoice detail</div><h2 id="reception-invoice-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{invoice.id}</h2><p className="mt-1 text-sm text-slate-500">{invoice.patient} · {invoice.patientId}</p></div><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close invoice details"><X size={18} /></button></div><div className="mt-7 rounded-3xl bg-gradient-to-br from-[#f8edd9] to-[#fcf8ef] p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-2xl font-semibold text-slate-900">{invoice.total}</div><div className="mt-1 text-sm text-slate-600">Outstanding {invoice.due}</div></div><InvoiceStatus status={invoice.status} /></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><Detail label="Patient" value={`${invoice.patient} · ${invoice.patientId}`} /><Detail label="Service" value={invoice.service} /><Detail label="Department" value={invoice.department} /><Detail label="Payer" value={invoice.payer} /><Detail label="Issued" value={invoice.issued} /><Detail label="Paid" value={invoice.paid} /></div><div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Charge breakdown</div><div className="mt-3 space-y-3">{invoice.items.map((item) => <div key={item} className="flex justify-between gap-4 text-sm text-slate-700"><span>{item.split(" · ")[0]}</span><span className="font-semibold text-slate-900">{item.split(" · ")[1]}</span></div>)}</div></div><div className="mt-6 flex gap-3 border-t border-slate-200 pt-5"><Button variant="secondary" className="flex-1 justify-center"><FileText size={15} /> Print invoice</Button><Button className="flex-1 justify-center" disabled={invoice.status === "Paid"}><CreditCard size={15} /> Collect payment</Button></div></aside></div>;
}

function InvoiceStatus({ status }: { status: Invoice["status"] }) {
  return <Badge tone={status === "Paid" ? "green" : status === "Overdue" ? "rose" : status === "Partial" ? "blue" : "amber"}>{status}</Badge>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</div><div className="mt-1 font-semibold text-slate-800">{value}</div></div>;
}
