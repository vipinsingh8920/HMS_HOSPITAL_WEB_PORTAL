"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BedDouble,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Eye,
  FileBarChart2,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Pill,
  Pencil,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HmsShell, PageHeader, SectionCard, StatCard, DataTable } from "@/components/hms-shell";
import { hospitals, patients, appointments, staffMembers, notifications, auditLogs } from "@/lib/mock-data";
import { useMemo, useState } from "react";

const patientDetailData = [
  { id: "P-301", name: "Meera Iyer", age: 34, gender: "Female", bloodGroup: "B+", phone: "+91 98765 43210", status: "Waiting", doctor: "Dr. Dev Nair", department: "General Medicine", lastVisit: "Today, 09:42", allergies: "Penicillin", address: "14, Rosewood Avenue, Pune", registered: "2025-06-18", category: "Outpatient" },
  { id: "P-302", name: "Arjun Nair", age: 57, gender: "Male", bloodGroup: "O+", phone: "+91 98220 11223", status: "Admitted", doctor: "Dr. Asha Sharma", department: "Cardiology", lastVisit: "Today, 09:15", allergies: "None", address: "23, Gulmohar Lane, Pune", registered: "2024-03-11", category: "Inpatient" },
  { id: "P-303", name: "Fatima Khan", age: 42, gender: "Female", bloodGroup: "AB+", phone: "+91 98900 12345", status: "Active", doctor: "Dr. Dev Nair", department: "Emergency", lastVisit: "Today, 08:58", allergies: "Dust", address: "8, River Crest, Mumbai", registered: "2025-01-04", category: "Emergency" },
  { id: "P-304", name: "Rohan Deshmukh", age: 29, gender: "Male", bloodGroup: "A+", phone: "+91 97654 32109", status: "Active", doctor: "Dr. Kavita Rao", department: "Orthopedics", lastVisit: "Yesterday, 17:20", allergies: "None", address: "42, Sangam Road, Nagpur", registered: "2025-03-26", category: "Referral" },
];

function PremiumPatientCard({ patient, onOpen }: { patient: (typeof patientDetailData)[number]; onOpen: (patient: (typeof patientDetailData)[number]) => void; }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(patient)}
      className="group w-full rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_18px_35px_rgba(20,184,166,0.12)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 text-sm font-bold text-teal-800">
            {patient.name.split(" ").map((part) => part[0]).join("")}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">{patient.name}</div>
            <div className="text-xs text-slate-500">{patient.id} · {patient.age} yrs</div>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-400 transition group-hover:text-teal-600" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Badge tone={patient.status === "Admitted" ? "blue" : patient.status === "Waiting" ? "amber" : "green"}>{patient.status}</Badge>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{patient.department}</span>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Doctor</span>
          <span className="font-medium text-slate-900">{patient.doctor}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Blood</span>
          <span className="font-medium text-slate-900">{patient.bloodGroup}</span>
        </div>
      </div>
    </button>
  );
}

function PremiumDoctorCard({ doctor }: { doctor: { id: string; name: string; department: string; specialty: string; status: string } }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-sm font-bold text-sky-800">
            {doctor.name.split(" ").map((part) => part[0]).join("")}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">{doctor.name}</div>
            <div className="text-xs text-slate-500">{doctor.department}</div>
          </div>
        </div>
        <Badge tone={doctor.status === "ACTIVE" ? "green" : "amber"}>{doctor.status}</Badge>
      </div>
      <div className="mt-4 text-sm text-slate-600">{doctor.specialty}</div>
    </div>
  );
}

function PremiumStaffCard({ member }: { member: { id: string; name: string; role: string; status: string } }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-sm font-bold text-violet-800">
            {member.name.split(" ").map((part) => part[0]).join("")}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">{member.name}</div>
            <div className="text-xs text-slate-500">{member.role}</div>
          </div>
        </div>
        <Badge tone={member.status === "ACTIVE" ? "green" : "amber"}>{member.status}</Badge>
      </div>
    </div>
  );
}

function PatientDetailDrawer({ patient, onClose }: { patient: (typeof patientDetailData)[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[0_0_60px_rgba(15,23,42,0.22)]" role="dialog" aria-modal="true" aria-labelledby="patient-detail-title">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Patient profile</div>
            <h2 id="patient-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{patient.name}</h2>
            <div className="mt-1 text-sm text-slate-500">{patient.id}</div>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600" aria-label="Close patient details">
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 text-lg font-bold text-teal-800">
              {patient.name.split(" ").map((part) => part[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge tone={patient.status === "Admitted" ? "blue" : patient.status === "Waiting" ? "amber" : "green"}>{patient.status}</Badge>
                <Badge tone="slate">{patient.category}</Badge>
              </div>
              <div className="mt-3 text-sm text-slate-600">{patient.department} · {patient.doctor}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <DetailItem label="Age / gender" value={`${patient.age} yrs · ${patient.gender}`} />
          <DetailItem label="Blood group" value={patient.bloodGroup} />
          <DetailItem label="Phone" value={patient.phone} />
          <DetailItem label="Registered" value={patient.registered} />
          <DetailItem label="Address" value={patient.address} full />
          <DetailItem label="Allergies" value={patient.allergies} full />
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Care team</div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Stethoscope size={18} />
              </div>
              <div>
                <div className="font-medium text-slate-900">{patient.doctor}</div>
                <div className="text-sm text-slate-500">{patient.department}</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button variant="secondary" className="flex-1 justify-center">View records</Button>
          <Button className="flex-1 justify-center">Book appointment</Button>
        </div>
      </aside>
    </div>
  );
}

function DetailItem({ label, value, full = false }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-3 ${full ? "sm:col-span-2" : ""}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}

const superAdminRows = [
  ["Royal Care Hospital", "Pune", "ACTIVE", "240 beds", "38 doctors"],
  ["Aster City Clinic", "Mumbai", "ACTIVE", "120 beds", "20 doctors"],
  ["Sankalp Hospital", "Nagpur", "INACTIVE", "180 beds", "25 doctors"],
];

const hospitalRows = [
  ["Dr. Dev Nair", "General Medicine", "ACTIVE", "12 patients", "Mon"],
  ["Dr. Asha Sharma", "Cardiology", "ACTIVE", "09 patients", "Tue"],
  ["Dr. Kavita Rao", "Orthopedics", "ON_LEAVE", "06 patients", "Wed"],
];

const patientRows = [
  ["Meera Iyer", "P-301", "Female", "34", "Waiting", "Dr. Dev Nair"],
  ["Arjun Nair", "P-302", "Male", "57", "Admitted", "Dr. Asha Sharma"],
  ["Fatima Khan", "P-303", "Female", "42", "Active", "Dr. Dev Nair"],
];

const doctorsList = [
  { id: "D-201", name: "Dr. Dev Nair", department: "General Medicine", specialty: "Internal Medicine", status: "ACTIVE" },
  { id: "D-202", name: "Dr. Asha Sharma", department: "Cardiology", specialty: "Interventional Cardiology", status: "ACTIVE" },
  { id: "D-203", name: "Dr. Kavita Rao", department: "Orthopedics", specialty: "Joint Replacement", status: "ON_LEAVE" },
  { id: "D-204", name: "Dr. Ira Banerjee", department: "Neurology", specialty: "Epilepsy", status: "ACTIVE" },
];

const staffList = [
  { id: "S-701", name: "Asha Sharma", role: "HOSPITAL_ADMIN", status: "ACTIVE" },
  { id: "S-702", name: "Neha Kulkarni", role: "RECEPTIONIST", status: "ACTIVE" },
  { id: "S-703", name: "Priya Menon", role: "LAB_MANAGER", status: "ACTIVE" },
  { id: "S-704", name: "Shivani Rao", role: "PHARMACIST", status: "ACTIVE" },
  { id: "S-705", name: "Nikhil Joshi", role: "ACCOUNTANT", status: "ACTIVE" },
];

const staffRoster = [
  ...doctorsList.map((doctor, index) => ({
    id: doctor.id,
    name: doctor.name,
    category: "Doctor",
    department: doctor.department,
    specialization: doctor.specialty,
    email: `${doctor.name.toLowerCase().replace(/[^a-z]+/g, ".")}@royalcare.in`,
    phone: `+91 98765 43${210 + index}`,
    shift: index === 2 ? "On leave" : "09:00 - 17:00",
    status: doctor.status,
  })),
  { id: "S-702", name: "Neha Kulkarni", category: "Receptionist", department: "Front desk", specialization: "Patient registration & billing", email: "neha.k@royalcare.in", phone: "+91 98220 11442", shift: "08:00 - 16:00", status: "ACTIVE" },
  { id: "S-703", name: "Priya Menon", category: "Lab Manager", department: "Laboratory", specialization: "Clinical lab operations", email: "priya.m@royalcare.in", phone: "+91 98900 22661", shift: "08:30 - 16:30", status: "ACTIVE" },
];

export function SuperAdminDashboardPage() {
  return (
    <HmsShell
      role="SUPER_ADMIN"
      title="Platform dashboard"
      description="Monitor hospital health, tenant growth, and system integrity across the network."
      breadcrumbs={["Super Admin", "Dashboard"]}
      actions={<><Button variant="secondary">Export report</Button><Button>New hospital</Button></>}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total hospitals" value="128" note="↑ 12.5% this quarter" icon={Building2} tone="blue" />
        <StatCard label="Active hospitals" value="94" note="72 operational sites" icon={ShieldCheck} tone="green" />
        <StatCard label="Hospital admins" value="184" note="22 pending approvals" icon={Users} tone="amber" />
        <StatCard label="System alerts" value="07" note="3 critical + 4 warnings" icon={AlertTriangle} tone="rose" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <SectionCard title="Hospital growth" subtitle="Performance overview" action={<Button variant="ghost">Last 6 months</Button>}>
          <div className="grid gap-4 md:grid-cols-3">
            {[{ label: "New hospitals", value: "18", tone: "blue" }, { label: "Avg occupancy", value: "71%", tone: "green" }, { label: "Revenue trend", value: "+18.4%", tone: "amber" }].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
                <div className="mt-3 h-2.5 rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${item.tone === "blue" ? "w-3/4 bg-blue-500" : item.tone === "green" ? "w-4/5 bg-emerald-500" : "w-2/3 bg-amber-500"}`} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="System alerts" subtitle="Immediate attention">
          <div className="space-y-3">
            {[
              "2 hospitals require license renewal",
              "Network latency on 3 regional nodes",
              "5 staff access reviews pending",
            ].map((alert) => (
              <div key={alert} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <span>{alert}</span>
                <Badge tone="rose">High</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Hospital network" subtitle="Directory">
          <DataTable headers={["Hospital", "Location", "Status", "Capacity", "Clinical team"]} rows={superAdminRows.map((row) => row)} />
        </SectionCard>

        <SectionCard title="Recent activity" subtitle="Audit snapshots">
          <div className="space-y-3">
            {auditLogs.slice(0, 4).map((entry) => (
              <div key={entry.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-slate-800">{entry.action}</div>
                  <Badge tone={entry.status === "SUCCESS" ? "green" : entry.status === "WARNING" ? "amber" : "rose"}>{entry.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-slate-500">{entry.user} · {entry.module}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </HmsShell>
  );
}

export function SuperAdminHospitalsPage() {
  return <HmsShell role="SUPER_ADMIN" title="Hospitals" description="Manage tenant network, hospital health, and site-level access." breadcrumbs={["Super Admin", "Hospitals"]} actions={<><Button variant="secondary">Filters</Button><Button>+ Add hospital</Button></>}><SectionCard title="Hospital registry" subtitle="Operational view"><DataTable headers={["Name","City","Status","Beds","Admins"]} rows={hospitals.map((h) => [h.name, h.city, h.status, `${h.beds}`, `${h.admins}`])} /></SectionCard></HmsShell>;
}

export function SuperAdminAdminsPage() {
  return <HmsShell role="SUPER_ADMIN" title="Hospital admins" description="Review tenant administrators and access health." breadcrumbs={["Super Admin", "Hospital Admins"]} actions={<Button>+ Add admin</Button>}><SectionCard title="Admins" subtitle="All active admins"><DataTable headers={["Name","Role","Status","Hospital","Last login"]} rows={staffMembers.map((staff) => [staff.name, staff.role, staff.status, "Royal Care Hospital", "Today"]) } /></SectionCard></HmsShell>;
}

export function SuperAdminSystemPage() { return <HmsShell role="SUPER_ADMIN" title="System" description="Platform health, settings, and audit controls." breadcrumbs={["Super Admin", "System"]}><div className="grid gap-4 md:grid-cols-3"><StatCard label="Uptime" value="99.97%" note="Last 30 days" icon={ShieldCheck} tone="green" /><StatCard label="API latency" value="321ms" note="Within SLA" icon={Activity} tone="blue" /><StatCard label="Failed jobs" value="02" note="1 resolved today" icon={AlertTriangle} tone="amber" /></div></HmsShell>; }

export function HospitalDashboardPage() {
  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Hospital command center" description="Operational metrics across staff, patient flow, admissions, and service delivery." breadcrumbs={["Hospital", "Dashboard"]} actions={<Button variant="secondary">Generate report</Button>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Patients" value="1,248" note="↑ 8.4% since last month" icon={Users} tone="blue" />
        <StatCard label="Appointments" value="64" note="12 waiting to check-in" icon={CalendarDays} tone="green" />
        <StatCard label="Admissions" value="42" note="31 beds available" icon={BedDouble} tone="amber" />
        <StatCard label="Collections" value="₹28.4L" note="↑ 6.8% vs last month" icon={WalletCards} tone="rose" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Operational pulse" subtitle="Current snapshot"><div className="space-y-4">{["Patient satisfaction 92%","Staff attendance 87%","Claim settlement 76%"].map((item, index) => <div key={item}><div className="mb-2 flex justify-between text-xs text-slate-500"><span>{item.split(" ")[0]} ...</span><span>{index === 0 ? "92%" : index === 1 ? "87%" : "76%"}</span></div><div className="h-2.5 rounded-full bg-slate-200"><div className={`h-full rounded-full ${index === 0 ? "w-[92%] bg-emerald-500" : index === 1 ? "w-[87%] bg-blue-500" : "w-[76%] bg-amber-500"}`} /></div></div>)}</div></SectionCard>
        <SectionCard title="Needs attention" subtitle="Admin queue"><div className="space-y-3">{["3 critical incidents","24 new registrations","₹4.2L receivables"].map((item) => <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{item}</div>)}</div></SectionCard>
      </div>
      <div className="mt-6">
        <SectionCard title="Recent activity" subtitle="Live hospital updates" action={<span className="text-xs font-medium text-teal-700">Today</span>}>
          <div className="divide-y divide-slate-200/80">
            {auditLogs.filter((entry) => entry.role !== "SUPER_ADMIN").slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${entry.status === "SUCCESS" ? "bg-emerald-50 text-emerald-700" : entry.status === "WARNING" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>
                    <Activity size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{entry.action}</div>
                    <div className="mt-1 truncate text-xs text-slate-500">{entry.user} · {entry.module} · {entry.entity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-12 sm:pl-0">
                  <span className="text-xs text-slate-400">{entry.timestamp}</span>
                  <Badge tone={entry.status === "SUCCESS" ? "green" : entry.status === "WARNING" ? "amber" : "rose"}>{entry.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </HmsShell>
  );
}

export function HospitalDoctorsPage() {
  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Doctors" description="Manage clinician profiles, schedules, and availability." breadcrumbs={["Hospital", "Doctors"]} actions={<Button>+ Add doctor</Button>}>
      <SectionCard title="Doctor roster" subtitle="All clinicians">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {doctorsList.map((doctor) => (
            <PremiumDoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </SectionCard>
    </HmsShell>
  );
}

type StaffRosterMember = (typeof staffRoster)[number];

function StaffDetailsDrawer({
  staff,
  mode,
  onClose,
  onEdit,
  onSave,
}: {
  staff: StaffRosterMember;
  mode: "view" | "edit";
  onClose: () => void;
  onEdit: () => void;
  onSave: (staff: StaffRosterMember) => void;
}) {
  const [draft, setDraft] = useState(staff);
  const updateDraft = (field: keyof StaffRosterMember, value: string) => setDraft((current) => ({ ...current, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(15,23,42,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="staff-detail-title">
        <div className="flex items-start justify-between gap-4">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Staff profile</div><h2 id="staff-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{mode === "edit" ? "Update staff details" : staff.name}</h2><p className="mt-1 text-sm text-slate-500">{staff.id} · {staff.category}</p></div>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close staff details"><X size={18} /></button>
        </div>

        {mode === "view" ? (
          <>
            <div className="mt-7 flex items-center gap-4 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 p-5"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-bold text-teal-800 shadow-sm">{staff.name.split(" ").map((part) => part[0]).join("")}</div><div><div className="text-lg font-semibold text-slate-900">{staff.name}</div><div className="mt-1 text-sm text-slate-600">{staff.specialization}</div><div className="mt-2"><Badge tone={staff.status === "ACTIVE" ? "green" : "amber"}>{staff.status}</Badge></div></div></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><DetailItem label="Department" value={staff.department} /><DetailItem label="Shift" value={staff.shift} /><DetailItem label="Phone" value={staff.phone} /><DetailItem label="Email" value={staff.email} /><DetailItem label="Specialization" value={staff.specialization} full /></div>
            <div className="mt-7 flex justify-end border-t border-slate-200 pt-5"><Button onClick={onEdit}><Pencil size={15} /> Update details</Button></div>
          </>
        ) : (
          <form className="mt-7 space-y-5" onSubmit={(event) => { event.preventDefault(); onSave(draft); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["name", "department", "specialization", "email", "phone", "shift"] as const).map((field) => (
                <label key={field} className={`block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 ${field === "specialization" || field === "email" ? "sm:col-span-2" : ""}`}>{field === "name" ? "Full name" : field}<input value={draft[field]} onChange={(event) => updateDraft(field, event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label>
              ))}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Save changes</Button></div>
          </form>
        )}
      </aside>
    </div>
  );
}

type NewStaffForm = {
  name: string;
  category: "Doctor" | "Receptionist" | "Lab Manager";
  department: string;
  specialization: string;
  email: string;
  phone: string;
  shift: string;
};

const emptyStaffForm: NewStaffForm = {
  name: "",
  category: "Doctor",
  department: "",
  specialization: "",
  email: "",
  phone: "",
  shift: "09:00 - 17:00",
};

function AddStaffDialog({ onClose, onAdd }: { onClose: () => void; onAdd: (staff: StaffRosterMember) => void }) {
  const [form, setForm] = useState<NewStaffForm>(emptyStaffForm);
  const [errors, setErrors] = useState<Partial<Record<keyof NewStaffForm, string>>>({});

  const updateField = <Field extends keyof NewStaffForm>(field: Field, value: NewStaffForm[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof NewStaffForm, string>> = {};
    const requiredFields: Array<keyof NewStaffForm> = ["name", "department", "specialization", "email", "phone"];

    requiredFields.forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "This field is required";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAdd({
      id: `S-${String(Date.now()).slice(-4)}`,
      ...form,
      status: "ACTIVE",
    });
  };

  const fieldClass = (field: keyof NewStaffForm) => `mt-2 h-11 w-full rounded-xl border bg-slate-50 px-3 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 ${errors[field] ? "border-rose-300" : "border-slate-200"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.24)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="add-staff-title">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Staff directory</div><h2 id="add-staff-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">Add staff member</h2><p className="mt-1 text-sm text-slate-500">Create a staff profile for the hospital workspace.</p></div>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close add staff form"><X size={18} /></button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Full name<input value={form.name} onChange={(event) => updateField("name", event.target.value)} className={fieldClass("name")} placeholder="e.g. Dr. Ananya Mehta" />{errors.name && <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{errors.name}</span>}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Staff type<select value={form.category} onChange={(event) => updateField("category", event.target.value as NewStaffForm["category"])} className={fieldClass("category")}><option>Doctor</option><option>Receptionist</option><option>Lab Manager</option></select></label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Department<input value={form.department} onChange={(event) => updateField("department", event.target.value)} className={fieldClass("department")} placeholder="e.g. Cardiology" />{errors.department && <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{errors.department}</span>}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Shift<input value={form.shift} onChange={(event) => updateField("shift", event.target.value)} className={fieldClass("shift")} placeholder="09:00 - 17:00" /></label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:col-span-2">Specialization<input value={form.specialization} onChange={(event) => updateField("specialization", event.target.value)} className={fieldClass("specialization")} placeholder="e.g. Internal Medicine or Patient registration" />{errors.specialization && <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{errors.specialization}</span>}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Work email<input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className={fieldClass("email")} placeholder="name@royalcare.in" />{errors.email && <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{errors.email}</span>}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Phone number<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className={fieldClass("phone")} placeholder="+91 98765 43210" />{errors.phone && <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{errors.phone}</span>}</label>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-5"><p className="text-xs text-slate-400">New profiles are created as Active.</p><div className="flex gap-3"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Create staff profile</Button></div></div>
        </form>
      </div>
    </div>
  );
}

export function HospitalStaffPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [staff, setStaff] = useState(staffRoster);
  const [selectedStaff, setSelectedStaff] = useState<StaffRosterMember | null>(null);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const tabs = ["All", "Doctor", "Receptionist", "Lab Manager"];
  const visibleStaff = activeTab === "All" ? staff : staff.filter((member) => member.category === activeTab);

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Manage staff members" description="Manage doctors and hospital teams from one connected staff workspace." breadcrumbs={["Hospital", "Staff"]} actions={<Button onClick={() => setAddDialogOpen(true)}>+ Add staff member</Button>}>
      <section>
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-teal-500 bg-[#123f47] px-6 py-5 shadow-[0_16px_35px_rgba(18,63,71,0.16)]">
          <div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-200">Hospital-wide team</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Staff directory</h3><p className="mt-1 text-sm text-white/60">One connected view of the people keeping Royal Care moving.</p></div>
          <div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visibleStaff.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-200/70">Visible members</div></div>
        </div>
        <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/60 p-1 shadow-sm">
          {tabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "bg-[#123f47] text-white shadow-sm" : "text-slate-500 hover:bg-teal-50 hover:text-teal-700"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f1] shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span className="w-11 shrink-0" /><span className="w-44 shrink-0">Staff member</span><span className="w-32 shrink-0">Role & department</span><span className="min-w-52 flex-1">Specialization & contact</span><span className="w-24 shrink-0">Status</span><span className="w-28 shrink-0 text-right">Actions</span>
            </div>
          {visibleStaff.map((member) => (
            <div key={member.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f8fbfa]/70 px-5 py-4 transition last:border-b-0 hover:bg-white">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 via-emerald-50 to-white text-sm font-bold text-teal-800 shadow-sm ring-1 ring-teal-100 transition group-hover:shadow-md">{member.name.split(" ").map((part) => part[0]).join("")}</div>
              <div className="w-44 shrink-0"><div className="font-semibold tracking-[-0.01em] text-slate-900">{member.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{member.id}</div></div>
              <div className="w-32 shrink-0"><div className="inline-flex rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-teal-700">{member.category}</div><div className="mt-2 text-xs text-slate-500">{member.department}</div></div>
              <div className="min-w-52 flex-1"><div className="text-sm font-semibold text-slate-800">{member.specialization}</div><div className="mt-1 text-xs text-slate-500">{member.email} <span className="mx-1 text-slate-300">·</span> {member.phone}</div></div>
              <div className="w-24 shrink-0"><Badge tone={member.status === "ACTIVE" ? "green" : "amber"}>{member.status}</Badge><div className="mt-2 text-[11px] font-medium text-slate-400">{member.shift}</div></div>
              <div className="sticky right-0 z-10 flex w-28 shrink-0 items-center justify-end gap-1 bg-[#f8fbfa]/95 pl-2 group-hover:bg-white sm:pl-3">
                <button type="button" onClick={() => { setSelectedStaff(member); setDrawerMode("view"); }} title={`View ${member.name}`} aria-label={`View ${member.name}`} className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"><Eye size={17} /></button>
                <button type="button" onClick={() => { setSelectedStaff(member); setDrawerMode("edit"); }} title={`Update ${member.name}`} aria-label={`Update ${member.name}`} className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition hover:bg-amber-50 hover:text-amber-700"><Pencil size={15} /><span>Update</span></button>
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
      </section>
      {selectedStaff && <StaffDetailsDrawer key={`${selectedStaff.id}-${drawerMode}`} staff={selectedStaff} mode={drawerMode} onClose={() => setSelectedStaff(null)} onEdit={() => setDrawerMode("edit")} onSave={(updatedStaff) => { setStaff((current) => current.map((member) => member.id === updatedStaff.id ? updatedStaff : member)); setSelectedStaff(updatedStaff); setDrawerMode("view"); }} />}
      {addDialogOpen && <AddStaffDialog onClose={() => setAddDialogOpen(false)} onAdd={(newStaff) => { setStaff((current) => [newStaff, ...current]); setActiveTab("All"); setAddDialogOpen(false); }} />}
    </HmsShell>
  );
}

export function HospitalPatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientDetailData)[number] | null>(null);

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Patient management" description="Coordinate patient records, care teams, and hospital-wide clinical flow." breadcrumbs={["Hospital", "Patients"]} actions={<Button>+ Register patient</Button>}>
      <section>
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#4b8e9a] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]">
          <div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9e2df]">Clinical registry</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Patient management</h3><p className="mt-1 text-sm text-white/60">A single view of active patient care across Royal Care Hospital.</p></div>
          <div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{patientDetailData.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b9e2df]/70">Active records</div></div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]">
          <div className="overflow-x-auto">
            <div className="min-w-[980px]">
              <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient</span><span className="w-32 shrink-0">Profile</span><span className="min-w-56 flex-1">Care team</span><span className="w-28 shrink-0">Last visit</span><span className="w-24 shrink-0">Status</span><span className="sticky right-0 w-20 shrink-0 bg-slate-100/95 text-right">Action</span>
              </div>
              {patientDetailData.map((patient) => (
                <div key={patient.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d6eceb] via-[#eaf5f2] to-white text-sm font-bold text-[#28717a] shadow-sm ring-1 ring-[#c8e3e0]">{patient.name.split(" ").map((part) => part[0]).join("")}</div>
                  <div className="w-44 shrink-0"><div className="font-semibold tracking-[-0.01em] text-slate-900">{patient.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">UHID {patient.id}</div></div>
                  <div className="w-32 shrink-0"><div className="text-sm font-semibold text-slate-800">{patient.age} yrs · {patient.gender}</div><div className="mt-1 text-xs font-medium text-[#28717a]">Blood {patient.bloodGroup}</div></div>
                  <div className="min-w-56 flex-1"><div className="text-sm font-semibold text-slate-800">{patient.doctor}</div><div className="mt-1 text-xs text-slate-500">{patient.department}</div></div>
                  <div className="w-28 shrink-0 text-xs font-medium text-slate-500">{patient.lastVisit}</div>
                  <div className="w-24 shrink-0"><Badge tone={patient.status === "Admitted" ? "blue" : patient.status === "Waiting" ? "amber" : "green"}>{patient.status}</Badge></div>
                  <div className="sticky right-0 w-20 shrink-0 bg-[#f9fbfb]/95 text-right group-hover:bg-white"><button type="button" onClick={() => setSelectedPatient(patient)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#28717a] transition hover:bg-[#e3f2ef]" title={`View ${patient.name}`}><Eye size={15} /> <span>View</span></button></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </HmsShell>
  );
}

type AppointmentRecord = (typeof appointments)[number];

function AppointmentDetailsDrawer({ appointment, onClose }: { appointment: AppointmentRecord; onClose: () => void }) {
  const statusTone = appointment.status === "Completed" ? "green" : appointment.status === "In Consultation" ? "blue" : appointment.status === "Checked In" ? "amber" : "slate";

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(23,63,74,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="appointment-detail-title">
        <div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#28717a]">Appointment detail</div><h2 id="appointment-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{appointment.patient}</h2><p className="mt-1 text-sm text-slate-500">{appointment.id} · {appointment.type}</p></div><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close appointment details"><X size={18} /></button></div>
        <div className="mt-7 rounded-3xl bg-gradient-to-br from-[#e3f2ef] to-[#f1f7f6] p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-lg font-semibold text-slate-900">{appointment.slot}</div><div className="mt-1 text-sm text-slate-600">{appointment.department}</div></div><Badge tone={statusTone}>{appointment.status}</Badge></div></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2"><DetailItem label="Patient" value={appointment.patient} /><DetailItem label="Appointment ID" value={appointment.id} /><DetailItem label="Doctor" value={appointment.doctor} /><DetailItem label="Department" value={appointment.department} /><DetailItem label="Visit type" value={appointment.type} /><DetailItem label="Scheduled time" value={appointment.slot} /></div>
        <div className="mt-7 border-t border-slate-200 pt-5"><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Care coordination</div><p className="mt-2 text-sm leading-6 text-slate-600">This appointment is visible to the assigned care team and can be followed through the {appointment.department} workflow.</p></div>
      </aside>
    </div>
  );
}

export function HospitalAppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Appointment management" description="Monitor and coordinate scheduled visits across every hospital department." breadcrumbs={["Hospital", "Appointments"]}>
      <section>
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#4b8e9a] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9e2df]">Daily schedule</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Appointment management</h3><p className="mt-1 text-sm text-white/60">A live view of patient visits and department capacity.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{appointments.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b9e2df]/70">Today&apos;s visits</div></div></div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]"><div className="overflow-x-auto"><div className="min-w-[920px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-11 shrink-0" /><span className="w-44 shrink-0">Patient</span><span className="min-w-52 flex-1">Care team</span><span className="w-32 shrink-0">Visit type</span><span className="w-28 shrink-0">Time</span><span className="w-28 shrink-0">Status</span><span className="w-16 shrink-0 text-right">Action</span></div>{appointments.map((appointment) => <div key={appointment.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d6eceb] via-[#eaf5f2] to-white text-sm font-bold text-[#28717a] shadow-sm ring-1 ring-[#c8e3e0]">{appointment.patient.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold tracking-[-0.01em] text-slate-900">{appointment.patient}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{appointment.id}</div></div><div className="min-w-52 flex-1"><div className="text-sm font-semibold text-slate-800">{appointment.doctor}</div><div className="mt-1 text-xs text-slate-500">{appointment.department}</div></div><div className="w-32 shrink-0 text-xs font-medium text-slate-600">{appointment.type}</div><div className="w-28 shrink-0 text-sm font-semibold text-[#28717a]">{appointment.slot}</div><div className="w-28 shrink-0"><Badge tone={appointment.status === "Completed" ? "green" : appointment.status === "In Consultation" ? "blue" : appointment.status === "Checked In" ? "amber" : "slate"}>{appointment.status}</Badge></div><div className="w-16 shrink-0 text-right"><button type="button" onClick={() => setSelectedAppointment(appointment)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#28717a] transition hover:bg-[#e3f2ef]" title={`View ${appointment.patient}`}><Eye size={15} /> View</button></div></div>)}</div></div></div>
      </section>
      {selectedAppointment && <AppointmentDetailsDrawer appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />}
    </HmsShell>
  );
}

export function HospitalOpdPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientDetailData)[number] | null>(null);
  const opdQueue = [
    { patientId: "P-301", complaint: "Headache", status: "In consultation", time: "09:42 AM", vitals: "BP 124/82 · Pulse 76" },
    { patientId: "P-303", complaint: "Chest pain", status: "Waiting", time: "10:18 AM", vitals: "BP 138/88 · Pulse 84" },
    { patientId: "P-304", complaint: "Knee pain", status: "Follow-up", time: "11:05 AM", vitals: "BP 118/76 · Pulse 72" },
  ];

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="OPD management" description="Monitor outpatient consultations, patient flow, and department capacity." breadcrumbs={["Hospital", "OPD"]}>
      <div className="grid gap-4 md:grid-cols-3"><StatCard label="Today&apos;s queue" value="18" note="6 waiting now" icon={Users} tone="blue" /><StatCard label="In consultation" value="07" note="Across 4 departments" icon={Stethoscope} tone="green" /><StatCard label="Average wait" value="18 min" note="4 min faster today" icon={Activity} tone="amber" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#4b8e9a] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9e2df]">Outpatient department</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Live consultation queue</h3><p className="mt-1 text-sm text-white/60">Track the patient journey from arrival to follow-up.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">09:00</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b9e2df]/70">Clinic opened</div></div></div>
        <div className="grid gap-4 lg:grid-cols-3">
          {opdQueue.map((item) => {
            const patient = patientDetailData.find((record) => record.id === item.patientId);
            if (!patient) return null;
            const statusTone = item.status === "In consultation" ? "blue" : item.status === "Waiting" ? "amber" : "green";
            return <article key={item.patientId} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_35px_rgba(23,63,74,0.07)] transition hover:-translate-y-0.5 hover:border-[#acd6d1] hover:shadow-[0_18px_40px_rgba(23,63,74,0.12)]"><div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-br from-[#f1f8f6] to-white p-5"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dcefeb] text-sm font-bold text-[#28717a]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div><div className="font-semibold text-slate-900">{patient.name}</div><div className="mt-1 text-xs text-slate-500">{patient.id} · {patient.age} yrs · {patient.gender}</div></div></div><Badge tone={statusTone}>{item.status}</Badge></div><div className="space-y-4 p-5"><div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Presenting complaint</div><div className="mt-1 text-sm font-semibold text-slate-800">{item.complaint}</div></div><div className="grid grid-cols-2 gap-3"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Consultant</div><div className="mt-1 text-xs font-medium text-slate-700">{patient.doctor}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Slot</div><div className="mt-1 text-xs font-medium text-[#28717a]">{item.time}</div></div></div><div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">{item.vitals}</div><button type="button" onClick={() => setSelectedPatient(patient)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#b8dcd6] px-3 py-2.5 text-xs font-semibold text-[#28717a] transition hover:bg-[#e5f3f0]"><Eye size={15} /> View full patient details</button></div></article>;
          })}
        </div>
      </section>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </HmsShell>
  );
}
export function HospitalIpdPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientDetailData)[number] | null>(null);
  const inpatientRows = [
    { patientId: "P-302", ward: "Ward 3", bed: "B-301", admission: "12 Sep 2026", acuity: "Routine", status: "Admitted" },
    { patientId: "P-303", ward: "Emergency", bed: "ER-04", admission: "12 Sep 2026", acuity: "High priority", status: "Under observation" },
    { patientId: "P-304", ward: "Orthopedics", bed: "O-118", admission: "11 Sep 2026", acuity: "Routine", status: "Admitted" },
  ];

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="IPD management" description="Coordinate inpatient admissions, beds, transfers, and discharge readiness." breadcrumbs={["Hospital", "IPD"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Current inpatients" value="42" note="74% occupancy" icon={BedDouble} tone="blue" /><StatCard label="Available beds" value="31" note="Within target" icon={CheckCircle2} tone="green" /><StatCard label="Transfers" value="04" note="2 pending" icon={ArrowRight} tone="amber" /><StatCard label="Discharges" value="07" note="Today" icon={ClipboardList} tone="rose" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#4b8e9a] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9e2df]">Inpatient department</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Inpatient census</h3><p className="mt-1 text-sm text-white/60">A clear view of admitted patients and bed utilization.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">74%</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b9e2df]/70">Bed occupancy</div></div></div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]">
          <div className="hidden overflow-x-auto md:block">
            <div className="min-w-[1050px]">
              <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Inpatient</span><span className="w-32 shrink-0">Ward & bed</span><span className="min-w-48 flex-1">Care team</span><span className="w-32 shrink-0">Admission</span><span className="w-28 shrink-0">Acuity</span><span className="w-28 shrink-0">Status</span><span className="w-20 shrink-0 text-right">Action</span></div>
              {inpatientRows.map((row) => { const patient = patientDetailData.find((record) => record.id === row.patientId); if (!patient) return null; return <div key={row.patientId} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d6eceb] via-[#eaf5f2] to-white text-sm font-bold text-[#28717a] shadow-sm ring-1 ring-[#c8e3e0]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold tracking-[-0.01em] text-slate-900">{patient.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{patient.id} · {patient.age} yrs</div></div><div className="w-32 shrink-0"><div className="text-sm font-semibold text-slate-800">{row.ward}</div><div className="mt-1 text-xs font-medium text-[#28717a]">Bed {row.bed}</div></div><div className="min-w-48 flex-1"><div className="text-sm font-semibold text-slate-800">{patient.doctor}</div><div className="mt-1 text-xs text-slate-500">{patient.department}</div></div><div className="w-32 shrink-0 text-xs font-medium text-slate-500">{row.admission}</div><div className="w-28 shrink-0"><Badge tone={row.acuity === "High priority" ? "rose" : "slate"}>{row.acuity}</Badge></div><div className="w-28 shrink-0"><Badge tone={row.status === "Under observation" ? "amber" : "blue"}>{row.status}</Badge></div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedPatient(patient)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#28717a] transition hover:bg-[#e3f2ef]" title={`View ${patient.name}`}><Eye size={15} /> View</button></div></div>; })}
            </div>
          </div>
          <div className="divide-y divide-slate-200 md:hidden">
            {inpatientRows.map((row) => { const patient = patientDetailData.find((record) => record.id === row.patientId); if (!patient) return null; return <article key={row.patientId} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#dcefeb] text-sm font-bold text-[#28717a]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient.name}</div><div className="mt-1 text-xs text-slate-500">{patient.id} · {patient.age} yrs</div></div></div><Badge tone={row.status === "Under observation" ? "amber" : "blue"}>{row.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Ward & bed</div><div className="mt-1 font-semibold text-slate-800">{row.ward} · {row.bed}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Consultant</div><div className="mt-1 font-semibold text-slate-800">{patient.doctor}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Admission</div><div className="mt-1 text-slate-600">{row.admission}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Acuity</div><div className="mt-1"><Badge tone={row.acuity === "High priority" ? "rose" : "slate"}>{row.acuity}</Badge></div></div></div><button type="button" onClick={() => setSelectedPatient(patient)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#b8dcd6] px-3 py-2.5 text-xs font-semibold text-[#28717a] transition hover:bg-[#e5f3f0]"><Eye size={15} /> View full patient details</button></article>; })}
          </div>
        </div>
      </section>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </HmsShell>
  );
}
export function HospitalEmergencyPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientDetailData)[number] | null>(null);
  const emergencyRows = [
    { patientId: "P-303", arrival: "09:18 AM", triage: "Critical", bay: "ER-04", complaint: "Chest pain", status: "Under observation" },
    { patientId: "P-302", arrival: "09:42 AM", triage: "High priority", bay: "ER-02", complaint: "Cardiac review", status: "Admitted" },
    { patientId: "P-301", arrival: "10:05 AM", triage: "Priority", bay: "ER-07", complaint: "Severe headache", status: "Waiting" },
  ];

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Emergency management" description="Coordinate triage, emergency bays, and rapid clinical response." breadcrumbs={["Hospital", "Emergency"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Active cases" value="12" note="3 critical" icon={AlertTriangle} tone="rose" /><StatCard label="Critical" value="03" note="Immediate attention" icon={Activity} tone="rose" /><StatCard label="Available bays" value="08" note="Across emergency unit" icon={BedDouble} tone="green" /><StatCard label="Avg response" value="06 min" note="2 min faster today" icon={CheckCircle2} tone="blue" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#d98a68] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3c5ae]">Emergency department</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Live triage queue</h3><p className="mt-1 text-sm text-white/60">Prioritize urgent patients and monitor bay allocation.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">24/7</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f3c5ae]/70">Response coverage</div></div></div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]">
          <div className="hidden overflow-x-auto md:block"><div className="min-w-[1050px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient</span><span className="w-32 shrink-0">Triage & bay</span><span className="min-w-48 flex-1">Presenting complaint</span><span className="w-28 shrink-0">Arrival</span><span className="w-32 shrink-0">Status</span><span className="w-20 shrink-0 text-right">Action</span></div>{emergencyRows.map((row) => { const patient = patientDetailData.find((record) => record.id === row.patientId); if (!patient) return null; return <div key={row.patientId} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4ded5] via-[#faeee8] to-white text-sm font-bold text-[#a55f5a] shadow-sm ring-1 ring-[#eed1c8]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold tracking-[-0.01em] text-slate-900">{patient.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{patient.id} · {patient.age} yrs</div></div><div className="w-32 shrink-0"><Badge tone={row.triage === "Critical" ? "rose" : row.triage === "High priority" ? "amber" : "blue"}>{row.triage}</Badge><div className="mt-2 text-xs font-medium text-[#a55f5a]">Bay {row.bay}</div></div><div className="min-w-48 flex-1"><div className="text-sm font-semibold text-slate-800">{row.complaint}</div><div className="mt-1 text-xs text-slate-500">Assigned: {patient.doctor}</div></div><div className="w-28 shrink-0 text-xs font-medium text-slate-500">{row.arrival}</div><div className="w-32 shrink-0"><Badge tone={row.status === "Under observation" ? "amber" : row.status === "Admitted" ? "blue" : "slate"}>{row.status}</Badge></div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedPatient(patient)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#a55f5a] transition hover:bg-[#f9e9e4]" title={`View ${patient.name}`}><Eye size={15} /> View</button></div></div>; })}</div></div>
          <div className="divide-y divide-slate-200 md:hidden">{emergencyRows.map((row) => { const patient = patientDetailData.find((record) => record.id === row.patientId); if (!patient) return null; return <article key={row.patientId} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f7e6e3] text-sm font-bold text-[#a55f5a]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient.name}</div><div className="mt-1 text-xs text-slate-500">{patient.id} · {patient.age} yrs</div></div></div><Badge tone={row.triage === "Critical" ? "rose" : row.triage === "High priority" ? "amber" : "blue"}>{row.triage}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Bay</div><div className="mt-1 font-semibold text-slate-800">{row.bay}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Arrival</div><div className="mt-1 text-slate-600">{row.arrival}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Complaint</div><div className="mt-1 font-semibold text-slate-800">{row.complaint}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Status</div><div className="mt-1"><Badge tone={row.status === "Under observation" ? "amber" : row.status === "Admitted" ? "blue" : "slate"}>{row.status}</Badge></div></div></div><button type="button" onClick={() => setSelectedPatient(patient)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#e5bbae] px-3 py-2.5 text-xs font-semibold text-[#a55f5a] transition hover:bg-[#f9e9e4]"><Eye size={15} /> View full patient details</button></article>; })}</div>
        </div>
      </section>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </HmsShell>
  );
}
export function HospitalReferralsPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientDetailData)[number] | null>(null);
  const referralRows = [
    { patientId: "P-304", source: "Orthopedics", destination: "Joint replacement center", type: "External", status: "Awaiting acceptance", created: "Today, 10:32" },
    { patientId: "P-301", source: "General Medicine", destination: "Cardiology", type: "Internal", status: "Under review", created: "Today, 09:18" },
    { patientId: "P-303", source: "Emergency", destination: "Critical care", type: "Internal", status: "Accepted", created: "Yesterday, 18:40" },
  ];

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Referral management" description="Coordinate incoming and outgoing patient referrals across departments and partner hospitals." breadcrumbs={["Hospital", "Referrals"]}>
      <div className="grid gap-4 md:grid-cols-3"><StatCard label="Open referrals" value="18" note="6 require review" icon={FileText} tone="blue" /><StatCard label="Awaiting acceptance" value="07" note="Across 3 departments" icon={Activity} tone="amber" /><StatCard label="Completed this month" value="42" note="↑ 12.4% vs last month" icon={CheckCircle2} tone="green" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#8b86ba] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#cbc8ee]">Care coordination</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Active referrals</h3><p className="mt-1 text-sm text-white/60">Track every patient handoff from request to acceptance.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">18</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#cbc8ee]/70">Open requests</div></div></div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]">
          <div className="hidden overflow-x-auto md:block"><div className="min-w-[1120px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient</span><span className="w-36 shrink-0">From</span><span className="min-w-52 flex-1">Destination</span><span className="w-24 shrink-0">Type</span><span className="w-36 shrink-0">Status</span><span className="w-32 shrink-0">Created</span><span className="w-20 shrink-0 text-right">Action</span></div>{referralRows.map((row) => { const patient = patientDetailData.find((record) => record.id === row.patientId); if (!patient) return null; return <div key={row.patientId} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e3e0f3] via-[#f2f1fa] to-white text-sm font-bold text-[#6f6ba1] shadow-sm ring-1 ring-[#d8d4ed]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold tracking-[-0.01em] text-slate-900">{patient.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{patient.id} · {patient.age} yrs</div></div><div className="w-36 shrink-0 text-sm font-semibold text-slate-800">{row.source}</div><div className="min-w-52 flex-1"><div className="text-sm font-semibold text-slate-800">{row.destination}</div><div className="mt-1 text-xs text-slate-500">Assigned doctor: {patient.doctor}</div></div><div className="w-24 shrink-0"><Badge tone={row.type === "External" ? "blue" : "slate"}>{row.type}</Badge></div><div className="w-36 shrink-0"><Badge tone={row.status === "Accepted" ? "green" : row.status === "Under review" ? "amber" : "blue"}>{row.status}</Badge></div><div className="w-32 shrink-0 text-xs font-medium text-slate-500">{row.created}</div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedPatient(patient)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#6f6ba1] transition hover:bg-[#eeecf8]" title={`View ${patient.name}`}><Eye size={15} /> View</button></div></div>; })}</div></div>
          <div className="divide-y divide-slate-200 md:hidden">{referralRows.map((row) => { const patient = patientDetailData.find((record) => record.id === row.patientId); if (!patient) return null; return <article key={row.patientId} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e9e6f5] text-sm font-bold text-[#6f6ba1]">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient.name}</div><div className="mt-1 text-xs text-slate-500">{patient.id} · {patient.age} yrs</div></div></div><Badge tone={row.status === "Accepted" ? "green" : row.status === "Under review" ? "amber" : "blue"}>{row.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">From</div><div className="mt-1 font-semibold text-slate-800">{row.source}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Type</div><div className="mt-1"><Badge tone={row.type === "External" ? "blue" : "slate"}>{row.type}</Badge></div></div><div className="col-span-2"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Destination</div><div className="mt-1 font-semibold text-slate-800">{row.destination}</div></div></div><button type="button" onClick={() => setSelectedPatient(patient)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#c9c3e6] px-3 py-2.5 text-xs font-semibold text-[#6f6ba1] transition hover:bg-[#eeecf8]"><Eye size={15} /> View full patient details</button></article>; })}</div>
        </div>
      </section>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </HmsShell>
  );
}
export function HospitalLaboratoryPage() {
  const labOrders = [
    { id: "LAB-204", patientId: "P-302", test: "Complete Blood Count", doctor: "Dr. Asha Sharma", department: "Cardiology", priority: "Urgent", status: "Pending", raised: "Today, 10:14 AM" },
    { id: "LAB-205", patientId: "P-301", test: "Liver Function Test", doctor: "Dr. Dev Nair", department: "General Medicine", priority: "Routine", status: "Processing", raised: "Today, 09:48 AM" },
    { id: "LAB-206", patientId: "P-303", test: "Troponin I", doctor: "Dr. Dev Nair", department: "Emergency", priority: "Critical", status: "Completed", raised: "Today, 08:56 AM" },
    { id: "LAB-207", patientId: "P-304", test: "Knee X-ray review", doctor: "Dr. Kavita Rao", department: "Orthopedics", priority: "Routine", status: "Rejected", raised: "Yesterday, 05:22 PM" },
  ];
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<(typeof labOrders)[number] | null>(null);
  const tabs = ["All", "Active", "Pending", "Completed", "Rejected"];
  const visibleOrders = labOrders.filter((order) => activeTab === "All" || (activeTab === "Active" ? ["Pending", "Processing"].includes(order.status) : order.status === activeTab));

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Laboratory management" description="Review doctor-raised orders, monitor processing, and track verified results." breadcrumbs={["Hospital", "Laboratory"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Total orders" value="104" note="This month" icon={FlaskConical} tone="blue" /><StatCard label="Active orders" value="40" note="12 urgent" icon={Activity} tone="amber" /><StatCard label="Completed" value="64" note="Today" icon={CheckCircle2} tone="green" /><StatCard label="Rejected" value="03" note="Needs correction" icon={AlertTriangle} tone="rose" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#6b9eb1] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#bfdeea]">Clinical diagnostics</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Laboratory orders</h3><p className="mt-1 text-sm text-white/60">Doctor-raised investigations across every department.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visibleOrders.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bfdeea]/70">Visible orders</div></div></div>
        <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/60 p-1 shadow-sm">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "bg-[#173f4a] text-white shadow-sm" : "text-slate-500 hover:bg-[#e5f1f4] hover:text-[#356a87]"}`}>{tab}</button>)}</div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]"><div className="hidden overflow-x-auto md:block"><div className="min-w-[1120px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient & order</span><span className="min-w-52 flex-1">Investigation</span><span className="w-36 shrink-0">Raised by</span><span className="w-24 shrink-0">Priority</span><span className="w-28 shrink-0">Status</span><span className="w-20 shrink-0 text-right">Action</span></div>{visibleOrders.map((order) => { const patient = patientDetailData.find((record) => record.id === order.patientId); return <div key={order.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dcecf3] via-[#eef6f8] to-white text-sm font-bold text-[#356a87] shadow-sm ring-1 ring-[#cbdde7]">{patient?.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold text-slate-900">{patient?.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{order.id} · {order.raised}</div></div><div className="min-w-52 flex-1"><div className="text-sm font-semibold text-slate-800">{order.test}</div><div className="mt-1 text-xs text-slate-500">{order.department}</div></div><div className="w-36 shrink-0"><div className="text-sm font-semibold text-slate-800">{order.doctor}</div><div className="mt-1 text-xs text-slate-500">Ordering clinician</div></div><div className="w-24 shrink-0"><Badge tone={order.priority === "Critical" ? "rose" : order.priority === "Urgent" ? "amber" : "slate"}>{order.priority}</Badge></div><div className="w-28 shrink-0"><Badge tone={order.status === "Completed" ? "green" : order.status === "Rejected" ? "rose" : order.status === "Processing" ? "blue" : "amber"}>{order.status}</Badge></div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedOrder(order)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#356a87] transition hover:bg-[#e5f1f4]" title={`View ${order.id}`}><Eye size={15} /> View</button></div></div>; })}</div></div><div className="divide-y divide-slate-200 md:hidden">{visibleOrders.map((order) => { const patient = patientDetailData.find((record) => record.id === order.patientId); return <article key={order.id} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e6eff5] text-sm font-bold text-[#356a87]">{patient?.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient?.name}</div><div className="mt-1 text-xs text-slate-500">{order.id} · {order.test}</div></div></div><Badge tone={order.status === "Completed" ? "green" : order.status === "Rejected" ? "rose" : order.status === "Processing" ? "blue" : "amber"}>{order.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Raised by</div><div className="mt-1 font-semibold text-slate-800">{order.doctor}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Priority</div><div className="mt-1"><Badge tone={order.priority === "Critical" ? "rose" : order.priority === "Urgent" ? "amber" : "slate"}>{order.priority}</Badge></div></div><div className="col-span-2"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Department</div><div className="mt-1 font-semibold text-slate-800">{order.department}</div></div></div><button type="button" onClick={() => setSelectedOrder(order)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#bfd8e2] px-3 py-2.5 text-xs font-semibold text-[#356a87] transition hover:bg-[#e5f1f4]"><Eye size={15} /> View order details</button></article>; })}</div></div>
      </section>
      {selectedOrder && <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedOrder(null)}><aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(23,63,74,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="lab-order-title"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#356a87]">Laboratory order</div><h2 id="lab-order-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{selectedOrder.test}</h2><p className="mt-1 text-sm text-slate-500">{selectedOrder.id} · {selectedOrder.patientId}</p></div><button type="button" onClick={() => setSelectedOrder(null)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close lab order details"><X size={18} /></button></div><div className="mt-7 rounded-3xl bg-gradient-to-br from-[#e6eff5] to-[#f4f8fa] p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-lg font-semibold text-slate-900">{selectedOrder.patientId}</div><div className="mt-1 text-sm text-slate-600">Raised by {selectedOrder.doctor}</div></div><Badge tone={selectedOrder.status === "Completed" ? "green" : selectedOrder.status === "Rejected" ? "rose" : selectedOrder.status === "Processing" ? "blue" : "amber"}>{selectedOrder.status}</Badge></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><DetailItem label="Test" value={selectedOrder.test} /><DetailItem label="Patient" value={patientDetailData.find((record) => record.id === selectedOrder.patientId)?.name ?? selectedOrder.patientId} /><DetailItem label="Department" value={selectedOrder.department} /><DetailItem label="Priority" value={selectedOrder.priority} /><DetailItem label="Ordering doctor" value={selectedOrder.doctor} /><DetailItem label="Raised" value={selectedOrder.raised} /></div></aside></div>}
    </HmsShell>
  );
}
export function HospitalPharmacyPage() {
  const prescriptions = [
    { id: "RX-701", patientId: "P-301", medicine: "Paracetamol 500mg", dosage: "1 tablet · twice daily", doctor: "Dr. Dev Nair", department: "General Medicine", quantity: "14 tablets", stock: "In stock", status: "Pending", raised: "Today, 10:26 AM" },
    { id: "RX-702", patientId: "P-302", medicine: "Aspirin 75mg", dosage: "1 tablet · once daily", doctor: "Dr. Asha Sharma", department: "Cardiology", quantity: "30 tablets", stock: "Low stock", status: "Active", raised: "Today, 09:52 AM" },
    { id: "RX-703", patientId: "P-303", medicine: "Ceftriaxone 1g", dosage: "IV · once daily", doctor: "Dr. Dev Nair", department: "Emergency", quantity: "5 vials", stock: "In stock", status: "Dispensed", raised: "Today, 08:44 AM" },
    { id: "RX-704", patientId: "P-304", medicine: "Amoxicillin 500mg", dosage: "1 capsule · three times daily", doctor: "Dr. Kavita Rao", department: "Orthopedics", quantity: "21 capsules", stock: "Unavailable", status: "Rejected", raised: "Yesterday, 04:12 PM" },
  ];
  const [activeTab, setActiveTab] = useState("All");
  const [selectedPrescription, setSelectedPrescription] = useState<(typeof prescriptions)[number] | null>(null);
  const tabs = ["All", "Active", "Pending", "Dispensed", "Rejected"];
  const visiblePrescriptions = prescriptions.filter((prescription) => activeTab === "All" || prescription.status === activeTab);

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Pharmacy management" description="Monitor doctor-raised prescriptions, dispensing, and medication stock across the hospital." breadcrumbs={["Hospital", "Pharmacy"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Total prescriptions" value="186" note="This month" icon={Pill} tone="blue" /><StatCard label="Active orders" value="32" note="8 due today" icon={Activity} tone="amber" /><StatCard label="Dispensed today" value="142" note="92% fulfilled" icon={CheckCircle2} tone="green" /><StatCard label="Low stock items" value="07" note="Needs procurement" icon={AlertTriangle} tone="rose" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#76a98f] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c1e4d1]">Medication operations</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Prescription queue</h3><p className="mt-1 text-sm text-white/60">Doctor-raised medication orders and fulfillment status.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visiblePrescriptions.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c1e4d1]/70">Visible orders</div></div></div>
        <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/60 p-1 shadow-sm">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "bg-[#173f4a] text-white shadow-sm" : "text-slate-500 hover:bg-[#e5f2ed] hover:text-[#2d7562]"}`}>{tab}</button>)}</div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]"><div className="hidden overflow-x-auto md:block"><div className="min-w-[1160px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient & order</span><span className="min-w-56 flex-1">Medication & dosage</span><span className="w-36 shrink-0">Prescribed by</span><span className="w-28 shrink-0">Quantity</span><span className="w-28 shrink-0">Stock</span><span className="w-28 shrink-0">Status</span><span className="w-20 shrink-0 text-right">Action</span></div>{visiblePrescriptions.map((prescription) => { const patient = patientDetailData.find((record) => record.id === prescription.patientId); return <div key={prescription.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dcefe9] via-[#eef8f3] to-white text-sm font-bold text-[#2d7562] shadow-sm ring-1 ring-[#c6e5d8]">{patient?.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold text-slate-900">{patient?.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{prescription.id} · {prescription.raised}</div></div><div className="min-w-56 flex-1"><div className="text-sm font-semibold text-slate-800">{prescription.medicine}</div><div className="mt-1 text-xs text-slate-500">{prescription.dosage} · {prescription.department}</div></div><div className="w-36 shrink-0"><div className="text-sm font-semibold text-slate-800">{prescription.doctor}</div><div className="mt-1 text-xs text-slate-500">Ordering clinician</div></div><div className="w-28 shrink-0 text-sm font-semibold text-[#2d7562]">{prescription.quantity}</div><div className="w-28 shrink-0"><Badge tone={prescription.stock === "Unavailable" ? "rose" : prescription.stock === "Low stock" ? "amber" : "green"}>{prescription.stock}</Badge></div><div className="w-28 shrink-0"><Badge tone={prescription.status === "Dispensed" ? "green" : prescription.status === "Rejected" ? "rose" : prescription.status === "Active" ? "blue" : "amber"}>{prescription.status}</Badge></div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedPrescription(prescription)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#2d7562] transition hover:bg-[#e5f2ed]" title={`View ${prescription.id}`}><Eye size={15} /> View</button></div></div>; })}</div></div><div className="divide-y divide-slate-200 md:hidden">{visiblePrescriptions.map((prescription) => { const patient = patientDetailData.find((record) => record.id === prescription.patientId); return <article key={prescription.id} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e4f4ed] text-sm font-bold text-[#2d7562]">{patient?.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient?.name}</div><div className="mt-1 text-xs text-slate-500">{prescription.id} · {prescription.medicine}</div></div></div><Badge tone={prescription.status === "Dispensed" ? "green" : prescription.status === "Rejected" ? "rose" : prescription.status === "Active" ? "blue" : "amber"}>{prescription.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Prescribed by</div><div className="mt-1 font-semibold text-slate-800">{prescription.doctor}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Quantity</div><div className="mt-1 font-semibold text-[#2d7562]">{prescription.quantity}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Dosage</div><div className="mt-1 font-semibold text-slate-800">{prescription.dosage}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Stock</div><div className="mt-1"><Badge tone={prescription.stock === "Unavailable" ? "rose" : prescription.stock === "Low stock" ? "amber" : "green"}>{prescription.stock}</Badge></div></div></div><button type="button" onClick={() => setSelectedPrescription(prescription)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#b9ddcb] px-3 py-2.5 text-xs font-semibold text-[#2d7562] transition hover:bg-[#e5f2ed]"><Eye size={15} /> View prescription details</button></article>; })}</div></div>
      </section>
      {selectedPrescription && <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedPrescription(null)}><aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(23,63,74,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="prescription-detail-title"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2d7562]">Prescription detail</div><h2 id="prescription-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{selectedPrescription.medicine}</h2><p className="mt-1 text-sm text-slate-500">{selectedPrescription.id} · {selectedPrescription.patientId}</p></div><button type="button" onClick={() => setSelectedPrescription(null)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close prescription details"><X size={18} /></button></div><div className="mt-7 rounded-3xl bg-gradient-to-br from-[#e4f4ed] to-[#f4faf7] p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-lg font-semibold text-slate-900">{selectedPrescription.patientId}</div><div className="mt-1 text-sm text-slate-600">{selectedPrescription.dosage}</div></div><Badge tone={selectedPrescription.status === "Dispensed" ? "green" : selectedPrescription.status === "Rejected" ? "rose" : selectedPrescription.status === "Active" ? "blue" : "amber"}>{selectedPrescription.status}</Badge></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><DetailItem label="Medication" value={selectedPrescription.medicine} /><DetailItem label="Patient" value={patientDetailData.find((record) => record.id === selectedPrescription.patientId)?.name ?? selectedPrescription.patientId} /><DetailItem label="Dosage" value={selectedPrescription.dosage} /><DetailItem label="Quantity" value={selectedPrescription.quantity} /><DetailItem label="Stock status" value={selectedPrescription.stock} /><DetailItem label="Prescribing doctor" value={selectedPrescription.doctor} /><DetailItem label="Department" value={selectedPrescription.department} /><DetailItem label="Raised" value={selectedPrescription.raised} /></div></aside></div>}
    </HmsShell>
  );
}
export function HospitalBillingPage() {
  const invoices = [
    { id: "INV-2098", patientId: "P-303", service: "Emergency care & observation", department: "Emergency", payer: "Self pay", total: "₹4,240", due: "₹1,260", status: "Pending", issued: "Today, 10:40 AM" },
    { id: "INV-2099", patientId: "P-302", service: "Cardiology admission", department: "IPD · Cardiology", payer: "Insurance", total: "₹18,700", due: "₹7,900", status: "Partial", issued: "Today, 09:22 AM" },
    { id: "INV-2100", patientId: "P-301", service: "General consultation & tests", department: "OPD · General Medicine", payer: "Self pay", total: "₹2,450", due: "₹0", status: "Paid", issued: "Today, 08:35 AM" },
    { id: "INV-2094", patientId: "P-304", service: "Orthopedic consultation", department: "OPD · Orthopedics", payer: "Insurance", total: "₹6,800", due: "₹6,800", status: "Overdue", issued: "11 Sep 2026" },
  ];
  const [activeTab, setActiveTab] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[number] | null>(null);
  const tabs = ["All", "Pending", "Partial", "Paid", "Overdue"];
  const visibleInvoices = invoices.filter((invoice) => activeTab === "All" || invoice.status === activeTab);

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Billing management" description="Monitor hospital invoices, collections, insurance balances, and outstanding payments." breadcrumbs={["Hospital", "Billing"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Gross billing" value="₹28.4L" note="This month" icon={WalletCards} tone="blue" /><StatCard label="Collected" value="₹23.1L" note="81% collected" icon={CheckCircle2} tone="green" /><StatCard label="Outstanding" value="₹5.3L" note="Across 46 invoices" icon={CreditCard} tone="amber" /><StatCard label="Overdue" value="₹86K" note="Needs follow-up" icon={AlertTriangle} tone="rose" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#c39b58] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1d9a8]">Revenue operations</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Invoice management</h3><p className="mt-1 text-sm text-white/60">Keep patient billing, insurance claims, and collections visible.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visibleInvoices.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f1d9a8]/70">Visible invoices</div></div></div>
        <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/60 p-1 shadow-sm">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "bg-[#173f4a] text-white shadow-sm" : "text-slate-500 hover:bg-[#f7efdf] hover:text-[#9b6a31]"}`}>{tab}</button>)}</div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]"><div className="hidden overflow-x-auto md:block"><div className="min-w-[1180px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-44 shrink-0">Patient & invoice</span><span className="min-w-52 flex-1">Service</span><span className="w-36 shrink-0">Payer</span><span className="w-28 shrink-0">Total</span><span className="w-28 shrink-0">Due</span><span className="w-28 shrink-0">Status</span><span className="w-20 shrink-0 text-right">Action</span></div>{visibleInvoices.map((invoice) => { const patient = patientDetailData.find((record) => record.id === invoice.patientId); return <div key={invoice.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5ead4] via-[#fbf5e9] to-white text-sm font-bold text-[#9b6a31] shadow-sm ring-1 ring-[#eddbb8]">{patient?.name.split(" ").map((part) => part[0]).join("")}</div><div className="w-44 shrink-0"><div className="font-semibold text-slate-900">{patient?.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{invoice.id} · {invoice.issued}</div></div><div className="min-w-52 flex-1"><div className="text-sm font-semibold text-slate-800">{invoice.service}</div><div className="mt-1 text-xs text-slate-500">{invoice.department}</div></div><div className="w-36 shrink-0 text-sm font-semibold text-slate-700">{invoice.payer}</div><div className="w-28 shrink-0 text-sm font-semibold text-slate-800">{invoice.total}</div><div className={`w-28 shrink-0 text-sm font-semibold ${invoice.due === "₹0" ? "text-[#2d7562]" : "text-[#9b6a31]"}`}>{invoice.due}</div><div className="w-28 shrink-0"><Badge tone={invoice.status === "Paid" ? "green" : invoice.status === "Overdue" ? "rose" : invoice.status === "Partial" ? "blue" : "amber"}>{invoice.status}</Badge></div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedInvoice(invoice)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#9b6a31] transition hover:bg-[#f7efdf]" title={`View ${invoice.id}`}><Eye size={15} /> View</button></div></div>; })}</div></div><div className="divide-y divide-slate-200 md:hidden">{visibleInvoices.map((invoice) => { const patient = patientDetailData.find((record) => record.id === invoice.patientId); return <article key={invoice.id} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f8edd9] text-sm font-bold text-[#9b6a31]">{patient?.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{patient?.name}</div><div className="mt-1 text-xs text-slate-500">{invoice.id} · {invoice.service}</div></div></div><Badge tone={invoice.status === "Paid" ? "green" : invoice.status === "Overdue" ? "rose" : invoice.status === "Partial" ? "blue" : "amber"}>{invoice.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Total</div><div className="mt-1 font-semibold text-slate-800">{invoice.total}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Due</div><div className="mt-1 font-semibold text-[#9b6a31]">{invoice.due}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Payer</div><div className="mt-1 font-semibold text-slate-800">{invoice.payer}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Department</div><div className="mt-1 font-semibold text-slate-800">{invoice.department}</div></div></div><button type="button" onClick={() => setSelectedInvoice(invoice)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#e8d4ac] px-3 py-2.5 text-xs font-semibold text-[#9b6a31] transition hover:bg-[#f7efdf]"><Eye size={15} /> View invoice details</button></article>; })}</div></div>
      </section>
      {selectedInvoice && <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedInvoice(null)}><aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(23,63,74,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="invoice-detail-title"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b6a31]">Invoice detail</div><h2 id="invoice-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{selectedInvoice.id}</h2><p className="mt-1 text-sm text-slate-500">{patientDetailData.find((record) => record.id === selectedInvoice.patientId)?.name ?? selectedInvoice.patientId} · {selectedInvoice.service}</p></div><button type="button" onClick={() => setSelectedInvoice(null)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close invoice details"><X size={18} /></button></div><div className="mt-7 rounded-3xl bg-gradient-to-br from-[#f8edd9] to-[#fcf8ef] p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-2xl font-semibold text-slate-900">{selectedInvoice.total}</div><div className="mt-1 text-sm text-slate-600">Outstanding {selectedInvoice.due}</div></div><Badge tone={selectedInvoice.status === "Paid" ? "green" : selectedInvoice.status === "Overdue" ? "rose" : selectedInvoice.status === "Partial" ? "blue" : "amber"}>{selectedInvoice.status}</Badge></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><DetailItem label="Patient" value={patientDetailData.find((record) => record.id === selectedInvoice.patientId)?.name ?? selectedInvoice.patientId} /><DetailItem label="Invoice" value={selectedInvoice.id} /><DetailItem label="Service" value={selectedInvoice.service} /><DetailItem label="Department" value={selectedInvoice.department} /><DetailItem label="Payer" value={selectedInvoice.payer} /><DetailItem label="Issued" value={selectedInvoice.issued} /><DetailItem label="Total amount" value={selectedInvoice.total} /><DetailItem label="Outstanding" value={selectedInvoice.due} /></div></aside></div>}
    </HmsShell>
  );
}
export function HospitalReportsPage() {
  const reports = [
    { id: "RPT-401", name: "Hospital performance summary", category: "Operational", period: "September 2026", owner: "Hospital Admin", status: "Ready", updated: "Today, 09:20 AM", summary: "Appointments, admissions, occupancy, staff attendance, and service delivery." },
    { id: "RPT-402", name: "Revenue and collections report", category: "Financial", period: "September 2026", owner: "Finance team", status: "Ready", updated: "Today, 08:45 AM", summary: "Gross billing, collections, outstanding invoices, and payer mix." },
    { id: "RPT-403", name: "Clinical outcomes review", category: "Clinical", period: "Q3 2026", owner: "Clinical governance", status: "In review", updated: "Yesterday, 04:15 PM", summary: "OPD flow, IPD outcomes, emergency response, and referral activity." },
    { id: "RPT-404", name: "Laboratory and pharmacy utilization", category: "Operational", period: "August 2026", owner: "Operations team", status: "Ready", updated: "11 Sep 2026", summary: "Lab order completion, pharmacy dispensing, stock pressure, and turnaround." },
    { id: "RPT-405", name: "Access and compliance audit", category: "Compliance", period: "Q3 2026", owner: "System administrator", status: "Pending", updated: "10 Sep 2026", summary: "Role access, audit events, unresolved warnings, and policy reviews." },
  ];
  const [activeTab, setActiveTab] = useState("All");
  const [selectedReport, setSelectedReport] = useState<(typeof reports)[number] | null>(null);
  const tabs = ["All", "Operational", "Clinical", "Financial", "Compliance"];
  const visibleReports = reports.filter((report) => activeTab === "All" || report.category === activeTab);

  return (
    <HmsShell role="HOSPITAL_ADMIN" title="Reports management" description="Turn hospital activity into clear operational, clinical, financial, and compliance decisions." breadcrumbs={["Hospital", "Reports"]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Reports generated" value="128" note="This month" icon={FileBarChart2} tone="blue" /><StatCard label="Operational score" value="92%" note="↑ 4.8% this month" icon={Activity} tone="green" /><StatCard label="Revenue tracked" value="₹8.7L" note="Current period" icon={WalletCards} tone="amber" /><StatCard label="Pending reviews" value="05" note="Requires attention" icon={AlertTriangle} tone="rose" /></div>
      <section className="mt-6">
        <div className="mb-6 flex items-end justify-between gap-4 border-l-4 border-[#8b86ba] bg-[#173f4a] px-6 py-5 shadow-[0_16px_35px_rgba(23,63,74,0.16)]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#cbc8ee]">Hospital intelligence</div><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Reports library</h3><p className="mt-1 text-sm text-white/60">Review the signals that guide hospital operations and care quality.</p></div><div className="hidden text-right sm:block"><div className="text-3xl font-semibold tracking-[-0.05em] text-white">{visibleReports.length}</div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#cbc8ee]/70">Visible reports</div></div></div>
        <div className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white/60 p-1 shadow-sm">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "bg-[#173f4a] text-white shadow-sm" : "text-slate-500 hover:bg-[#eeecf8] hover:text-[#6f6ba1]"}`}>{tab}</button>)}</div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#eef3f4] shadow-[0_12px_30px_rgba(23,63,74,0.06)]"><div className="hidden overflow-x-auto md:block"><div className="min-w-[1120px]"><div className="flex items-center gap-4 border-b border-slate-200 bg-slate-100/80 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400"><span className="w-12 shrink-0" /><span className="w-64 shrink-0">Report</span><span className="w-28 shrink-0">Category</span><span className="w-32 shrink-0">Period</span><span className="min-w-40 flex-1">Owner</span><span className="w-28 shrink-0">Status</span><span className="w-32 shrink-0">Updated</span><span className="w-20 shrink-0 text-right">Action</span></div>{visibleReports.map((report) => <div key={report.id} className="group flex items-center gap-4 border-b border-slate-200/80 bg-[#f9fbfb]/80 px-5 py-4 transition last:border-b-0 hover:bg-white"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e3e0f3] via-[#f2f1fa] to-white text-[#6f6ba1] shadow-sm ring-1 ring-[#d8d4ed]"><FileBarChart2 size={19} /></div><div className="w-64 shrink-0"><div className="font-semibold text-slate-900">{report.name}</div><div className="mt-1 text-[11px] font-medium text-slate-400">{report.id}</div></div><div className="w-28 shrink-0"><Badge tone={report.category === "Financial" ? "amber" : report.category === "Clinical" ? "blue" : report.category === "Compliance" ? "rose" : "slate"}>{report.category}</Badge></div><div className="w-32 shrink-0 text-sm font-medium text-slate-700">{report.period}</div><div className="min-w-40 flex-1 text-sm text-slate-600">{report.owner}</div><div className="w-28 shrink-0"><Badge tone={report.status === "Ready" ? "green" : report.status === "In review" ? "amber" : "slate"}>{report.status}</Badge></div><div className="w-32 shrink-0 text-xs text-slate-500">{report.updated}</div><div className="w-20 shrink-0 text-right"><button type="button" onClick={() => setSelectedReport(report)} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#6f6ba1] transition hover:bg-[#eeecf8]" title={`View ${report.name}`}><Eye size={15} /> View</button></div></div>)}</div></div><div className="divide-y divide-slate-200 md:hidden">{visibleReports.map((report) => <article key={report.id} className="bg-[#f9fbfb]/80 p-4"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e9e6f5] text-[#6f6ba1]"><FileBarChart2 size={18} /></div><div className="min-w-0"><div className="truncate font-semibold text-slate-900">{report.name}</div><div className="mt-1 text-xs text-slate-500">{report.id} · {report.period}</div></div></div><Badge tone={report.status === "Ready" ? "green" : report.status === "In review" ? "amber" : "slate"}>{report.status}</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Category</div><div className="mt-1 font-semibold text-slate-800">{report.category}</div></div><div><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Owner</div><div className="mt-1 font-semibold text-slate-800">{report.owner}</div></div><div className="col-span-2"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Summary</div><div className="mt-1 text-slate-600">{report.summary}</div></div></div><button type="button" onClick={() => setSelectedReport(report)} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#c9c3e6] px-3 py-2.5 text-xs font-semibold text-[#6f6ba1] transition hover:bg-[#eeecf8]"><Eye size={15} /> View report details</button></article>)}</div></div>
      </section>
      {selectedReport && <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedReport(null)}><aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[-20px_0_70px_rgba(23,63,74,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="report-detail-title"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f6ba1]">Report details</div><h2 id="report-detail-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{selectedReport.name}</h2><p className="mt-1 text-sm text-slate-500">{selectedReport.id} · {selectedReport.period}</p></div><button type="button" onClick={() => setSelectedReport(null)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close report details"><X size={18} /></button></div><div className="mt-7 rounded-3xl bg-gradient-to-br from-[#e9e6f5] to-[#f7f6fb] p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-lg font-semibold text-slate-900">{selectedReport.category} report</div><div className="mt-1 text-sm text-slate-600">Owned by {selectedReport.owner}</div></div><Badge tone={selectedReport.status === "Ready" ? "green" : selectedReport.status === "In review" ? "amber" : "slate"}>{selectedReport.status}</Badge></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><DetailItem label="Report ID" value={selectedReport.id} /><DetailItem label="Category" value={selectedReport.category} /><DetailItem label="Period" value={selectedReport.period} /><DetailItem label="Owner" value={selectedReport.owner} /><DetailItem label="Last updated" value={selectedReport.updated} /><DetailItem label="Status" value={selectedReport.status} /><DetailItem label="Coverage" value={selectedReport.summary} full /></div></aside></div>}
    </HmsShell>
  );
}

export function ReceptionDashboardPage() { return <HmsShell role="RECEPTIONIST" title="Front desk overview" description="Keep patient flow smooth from registration to billing." breadcrumbs={["Reception", "Dashboard"]} actions={<Button>Register patient</Button>}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Arrivals today" value="38" note="11 awaiting check-in" icon={Users} tone="blue" /><StatCard label="Appointments" value="64" note="18 still to arrive" icon={CalendarDays} tone="green" /><StatCard label="New patients" value="08" note="4 registrations pending" icon={Users} tone="amber" /><StatCard label="Payments" value="₹86K" note="14 invoices open" icon={CreditCard} tone="rose" /></div></HmsShell>; }
export function ReceptionPatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof patientDetailData)[number] | null>(null);

  return (
    <HmsShell role="RECEPTIONIST" title="Patients" description="Check in patients, verify records, and direct them to care." breadcrumbs={["Reception", "Patients"]}>
      <SectionCard title="Patient registry" subtitle="Live desk">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patientDetailData.map((patient) => (
            <PremiumPatientCard key={patient.id} patient={patient} onOpen={setSelectedPatient} />
          ))}
        </div>
      </SectionCard>
      {selectedPatient && <PatientDetailDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </HmsShell>
  );
}
export function ReceptionAppointmentsPage() { return <HmsShell role="RECEPTIONIST" title="Appointments" description="Book, confirm, reschedule, and check in appointments." breadcrumbs={["Reception", "Appointments"]}><SectionCard title="Today's schedule" subtitle="Reception desk"><DataTable headers={['Patient','Doctor','Time','Status']} rows={appointments.map((a) => [a.patient, a.doctor, a.slot, a.status])} /></SectionCard></HmsShell>; }
export function ReceptionAdmissionsPage() { return <HmsShell role="RECEPTIONIST" title="Admissions" description="Complete admissions, transfers, and discharge coordination." breadcrumbs={["Reception", "Admissions"]}><SectionCard title="Current admissions" subtitle="In progress"><DataTable headers={['Patient','Ward','Bed','Status']} rows={[['Arjun Nair','Ward 3','B-301','Admitted'],['Sameer Rao','ICU','ICU-04','Observation']]} /></SectionCard></HmsShell>; }
export function ReceptionBillingPage() { return <HmsShell role="RECEPTIONIST" title="Billing" description="Create invoices, capture payments, and print receipts." breadcrumbs={["Reception", "Billing"]}><SectionCard title="Billing" subtitle="Cash desk"><DataTable headers={['Invoice','Patient','Amount','Status']} rows={[['INV-2012','Meera Iyer','₹2,400','Paid'],['INV-2013','Rohan Deshmukh','₹5,950','Pending']]} /></SectionCard></HmsShell>; }

export function DoctorDashboardPage() { return <HmsShell role="DOCTOR" title="Clinical dashboard" description="Review patient assignments, appointments, and active care priorities." breadcrumbs={["Doctor", "Dashboard"]} actions={<Button>New consultation</Button>}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Today's appointments" value="12" note="4 consultations next" icon={CalendarDays} tone="blue" /><StatCard label="Patients on rounds" value="18" note="6 require review" icon={BedDouble} tone="green" /><StatCard label="Critical alerts" value="03" note="Need attention now" icon={AlertTriangle} tone="rose" /><StatCard label="Pending orders" value="09" note="5 lab · 4 imaging" icon={FileText} tone="amber" /></div></HmsShell>; }
export function DoctorAppointmentsPage() { return <HmsShell role="DOCTOR" title="Appointments" description="Manage today's and upcoming clinical schedule." breadcrumbs={["Doctor", "Appointments"]}><SectionCard title="Consultation schedule" subtitle="Today"><DataTable headers={['Patient','Time','Type','Status']} rows={appointments.map((a) => [a.patient, a.slot, a.type, a.status])} /></SectionCard></HmsShell>; }
export function DoctorPatientsPage() {
  return <HmsShell role="DOCTOR" title="My patients" description="Access authorized patient records and update clinical care information." breadcrumbs={["Doctor", "Patients"]}>
    <SectionCard title="Assigned patients" subtitle="Authorized clinical access">
      <div className="space-y-3">
        {patients.map((patient) => (
          <div key={patient.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-slate-900">{patient.name}</div>
              <div className="mt-1 text-sm text-slate-500">{patient.age} yrs · {patient.department} · Last visit {patient.lastVisit}</div>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={patient.status === "Admitted" ? "blue" : patient.status === "Waiting" ? "amber" : "green"}>{patient.status}</Badge>
              <Button variant="secondary">Update record</Button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  </HmsShell>;
}
export function DoctorConsultationsPage() { return <HmsShell role="DOCTOR" title="Consultations" description="Fast clinical workflow from intake to treatment plan." breadcrumbs={["Doctor", "Consultations"]}><SectionCard title="Clinical workspace" subtitle="Active consultation"><div className="grid gap-4 md:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Patient summary</div><div className="mt-2 text-lg font-semibold">Meera Iyer</div><div className="mt-1 text-sm text-slate-500">Chief complaint: fatigue, fever</div></div><div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Vitals</div><div className="mt-2 text-sm text-slate-700">BP 118/76 · HR 88 · Temp 99.2°F</div></div></div></SectionCard></HmsShell>; }
export function DoctorSchedulePage() { return <HmsShell role="DOCTOR" title="Schedule" description="Review availability, breaks, and upcoming sessions." breadcrumbs={["Doctor", "Schedule"]}><SectionCard title="Availability" subtitle="This week"><DataTable headers={['Day','Slot','Status']} rows={[['Mon','09:00-14:00','Available'],['Tue','08:30-12:30','Booked'],['Wed','On leave','Unavailable']]} /></SectionCard></HmsShell>; }

export function LabDashboardPage() { return <HmsShell role="LAB_MANAGER" title="Laboratory operations" description="Monitor sample queue, results, and verification workflow." breadcrumbs={["Laboratory", "Dashboard"]} actions={<Button>New lab order</Button>}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Pending samples" value="26" note="8 urgent" icon={FlaskConical} tone="blue" /><StatCard label="Results to verify" value="14" note="4 critical" icon={FileText} tone="green" /><StatCard label="Processing" value="08" note="In stage" icon={Activity} tone="amber" /><StatCard label="Completed" value="64" note="Today" icon={CheckCircle2} tone="rose" /></div></HmsShell>; }
export function LabOrdersPage() { return <HmsShell role="LAB_MANAGER" title="Lab orders" description="Review test requests and sample readiness." breadcrumbs={["Laboratory", "Orders"]}><SectionCard title="Orders queue" subtitle="Latest requests"><DataTable headers={['Patient','Test','Status','Priority']} rows={[['Arjun Nair','CBC','Pending','High'],['Meera Iyer','LFT','Sample collected','Normal']]} /></SectionCard></HmsShell>; }
export function LabResultsPage() { return <HmsShell role="LAB_MANAGER" title="Results" description="Verify, approve, and distribute laboratory reports." breadcrumbs={["Laboratory", "Results"]}><SectionCard title="Result verification" subtitle="Current results"><DataTable headers={['Patient','Test','Result','Status']} rows={[['Arjun Nair','CBC','Normal','Verified'],['Fatima Khan','Troponin','Elevated','Pending review']]} /></SectionCard></HmsShell>; }
export function LabReportsPage() { return <HmsShell role="LAB_MANAGER" title="Lab reports" description="Prepared reports and summary analytics." breadcrumbs={["Laboratory", "Reports"]}><SectionCard title="Summary" subtitle="This month"><DataTable headers={['Report','No.','Status']} rows={[['Hematology','146','Published'],['Biochemistry','118','Draft']]} /></SectionCard></HmsShell>; }

export function PharmacyDashboardPage() { return <HmsShell role="PHARMACIST" title="Medication center" description="Monitor prescriptions, stock, and dispensing workflow." breadcrumbs={["Pharmacy", "Dashboard"]} actions={<Button>Dispense</Button>}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Pending prescriptions" value="18" note="5 due within 30 mins" icon={ClipboardList} tone="blue" /><StatCard label="Low stock" value="07" note="Action required" icon={Pill} tone="amber" /><StatCard label="Dispensed" value="142" note="Today" icon={CheckCircle2} tone="green" /><StatCard label="Expiring" value="05" note="This week" icon={AlertTriangle} tone="rose" /></div></HmsShell>; }
export function PharmacyPrescriptionsPage() { return <HmsShell role="PHARMACIST" title="Prescriptions" description="Verify and dispense medication requests." breadcrumbs={["Pharmacy", "Prescriptions"]}><SectionCard title="Prescription queue" subtitle="Pending"><DataTable headers={['Patient','Doctor','Medicines','Status']} rows={[['Meera Iyer','Dr. Dev Nair','Paracetamol','Ready'],['Arjun Nair','Dr. Asha Sharma','Aspirin','Pending verification']]} /></SectionCard></HmsShell>; }
export function PharmacyInventoryPage() { return <HmsShell role="PHARMACIST" title="Inventory" description="Track stock positions, low inventory, and expiries." breadcrumbs={["Pharmacy", "Inventory"]}><SectionCard title="Medicine inventory" subtitle="Medications"><DataTable headers={['Medicine','Batch','Stock','Expiry']} rows={[['Paracetamol','P-1001','320 packs','2027-02'],['Amoxicillin','A-4002','18 packs','2026-11']]} /></SectionCard></HmsShell>; }
export function PharmacyReportsPage() { return <HmsShell role="PHARMACIST" title="Reports" description="Stock and dispensing performance analytics." breadcrumbs={["Pharmacy", "Reports"]}><SectionCard title="Monthly summary" subtitle="Current period"><DataTable headers={['Metric','Value']} rows={[['Prescriptions dispensed','1,284'],['Low stock items','07'],['Inventory value','₹4.8L']]} /></SectionCard></HmsShell>; }

export function AccountsDashboardPage() { return <HmsShell role="ACCOUNTANT" title="Finance dashboard" description="Revenue, invoices, and payment performance at a glance." breadcrumbs={["Accounts", "Dashboard"]} actions={<Button>New invoice</Button>}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Revenue" value="₹28.4L" note="This month" icon={WalletCards} tone="green" /><StatCard label="Invoices" value="482" note="92 paid" icon={ReceiptText} tone="blue" /><StatCard label="Outstanding" value="₹4.2L" note="14 invoices open" icon={CreditCard} tone="amber" /><StatCard label="Expenses" value="₹9.1L" note="Operational" icon={FileBarChart2} tone="rose" /></div></HmsShell>; }
export function AccountsInvoicesPage() { return <HmsShell role="ACCOUNTANT" title="Invoices" description="Review billing entries and invoice details." breadcrumbs={["Accounts", "Invoices"]}><SectionCard title="Invoice register" subtitle="Current cycle"><DataTable headers={['Invoice','Patient','Amount','Status']} rows={[['INV-2098','Fatima Khan','₹4,240','Pending'],['INV-2099','Arjun Nair','₹18,700','Partial']]} /></SectionCard></HmsShell>; }
export function AccountsPaymentsPage() { return <HmsShell role="ACCOUNTANT" title="Payments" description="Track cash, digital, and insurance settlements." breadcrumbs={["Accounts", "Payments"]}><SectionCard title="Payment ledger" subtitle="Transactions"><DataTable headers={['Receipt','Patient','Method','Amount','Status']} rows={[['RCPT-901','Fatima Khan','UPI','₹4,240','Received'],['RCPT-902','Meera Iyer','Card','₹2,400','Received']]} /></SectionCard></HmsShell>; }
export function AccountsReportsPage() { return <HmsShell role="ACCOUNTANT" title="Reports" description="Revenue, trends, and payment clearing analyses." breadcrumbs={["Accounts", "Reports"]}><SectionCard title="Finance summary" subtitle="This quarter"><DataTable headers={['Metric','Value']} rows={[['Revenue','₹84.2L'],['Expenses','₹26.5L'],['Outstanding','₹4.2L']]} /></SectionCard></HmsShell>; }

export function StaffDashboardPage() {
  return (
    <HmsShell role="STAFF" title="Team workspace" description="Access assigned tasks, notifications, and shared operational updates." breadcrumbs={["Staff", "Dashboard"]}>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Tasks" value="12" note="3 due today" icon={ClipboardList} tone="blue" />
        <StatCard label="Messages" value="04" note="2 unread" icon={Bell} tone="amber" />
        <StatCard label="Alerts" value="02" note="Needs review" icon={AlertTriangle} tone="rose" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {staffList.map((member) => (
          <PremiumStaffCard key={member.id} member={member} />
        ))}
      </div>
    </HmsShell>
  );
}
export function StaffNotificationsPage() { return <HmsShell role="STAFF" title="Notifications" description="Review important updates and operational announcements." breadcrumbs={["Staff", "Notifications"]}><SectionCard title="Inbox" subtitle="Unread items"><DataTable headers={['Title','Category','Time','Status']} rows={notifications.map((n) => [n.title, n.category, n.time, n.unread ? 'Unread' : 'Read'])} /></SectionCard></HmsShell>; }
