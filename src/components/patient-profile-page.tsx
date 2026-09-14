"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Download,
  FileText,
  FlaskConical,
  HeartPulse,
  MapPin,
  Phone,
  Pill,
  Printer,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PatientProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  notes: string;
  patient_type: "OP" | "IP" | "REFERRAL" | "EMERGENCY";
  referral_source: string;
  referral_reason: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  blood_group: string;
  allergies: string;
  doctor: string;
  department: string;
  status: string;
};

const patientProfiles: Record<string, PatientProfile> = {
  "P-301": {
    id: "P-301",
    first_name: "Meera",
    last_name: "Iyer",
    email: "meera.iyer@example.com",
    phone: "+91 98765 43210",
    date_of_birth: "1992-04-18",
    gender: "Female",
    address: "14, Rosewood Avenue",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    notes: "Recurring headache for three days. Review hydration and sleep history.",
    patient_type: "OP",
    referral_source: "Self registration",
    referral_reason: "General medicine consultation",
    emergency_contact_name: "Kiran Iyer",
    emergency_contact_phone: "+91 98765 11220",
    blood_group: "B+",
    allergies: "Penicillin",
    doctor: "Dr. Dev Nair",
    department: "General Medicine",
    status: "In consultation",
  },
  "P-302": {
    id: "P-302",
    first_name: "Arjun",
    last_name: "Nair",
    email: "arjun.nair@example.com",
    phone: "+91 98220 11223",
    date_of_birth: "1969-11-02",
    gender: "Male",
    address: "23, Gulmohar Lane",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    notes: "Cardiology follow-up and medication reconciliation required.",
    patient_type: "IP",
    referral_source: "Emergency department",
    referral_reason: "Cardiac observation",
    emergency_contact_name: "Anita Nair",
    emergency_contact_phone: "+91 98220 11990",
    blood_group: "O+",
    allergies: "None known",
    doctor: "Dr. Asha Sharma",
    department: "Cardiology",
    status: "Admitted",
  },
  "P-303": {
    id: "P-303",
    first_name: "Fatima",
    last_name: "Khan",
    email: "fatima.khan@example.com",
    phone: "+91 98900 12345",
    date_of_birth: "1984-08-26",
    gender: "Female",
    address: "8, River Crest",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    notes: "Chest pain reported on arrival. Monitor vitals and escalation protocol.",
    patient_type: "EMERGENCY",
    referral_source: "Emergency arrival",
    referral_reason: "Acute chest pain",
    emergency_contact_name: "Sameer Khan",
    emergency_contact_phone: "+91 98900 88990",
    blood_group: "AB+",
    allergies: "Dust",
    doctor: "Dr. Dev Nair",
    department: "Emergency",
    status: "Under observation",
  },
  "P-304": {
    id: "P-304",
    first_name: "Rohan",
    last_name: "Deshmukh",
    email: "rohan.deshmukh@example.com",
    phone: "+91 97654 32109",
    date_of_birth: "1997-01-12",
    gender: "Male",
    address: "42, Sangam Road",
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
    notes: "Orthopedic review following persistent knee pain.",
    patient_type: "REFERRAL",
    referral_source: "General Medicine",
    referral_reason: "Orthopedic assessment",
    emergency_contact_name: "Madhuri Deshmukh",
    emergency_contact_phone: "+91 97654 11009",
    blood_group: "A+",
    allergies: "Dust",
    doctor: "Dr. Kavita Rao",
    department: "Orthopedics",
    status: "Follow-up",
  },
};

const patientTypeLabels = { OP: "Outpatient", IP: "Inpatient", REFERRAL: "Referral", EMERGENCY: "Emergency" } as const;
const profileSections = [["overview", "Overview"], ["history", "Medical history"], ["clinical", "Clinical assessment"], ["notes", "Notes"], ["orders", "Orders & advice"], ["prescription", "Prescription"], ["imaging", "Imaging"], ["laboratory", "Lab reports"], ["documents", "Documents"]] as const;

export function getPatientProfile(patientId: string) {
  return patientProfiles[patientId];
}

export function PatientProfilePage({ patientId, moduleLabel = "OPD", moduleHref = "/hospital/opd" }: { patientId: string; moduleLabel?: string; moduleHref?: string }) {
  const patient = getPatientProfile(patientId) ?? patientProfiles["P-301"];
  const fullName = `${patient.first_name} ${patient.last_name}`;
  const initials = `${patient.first_name[0]}${patient.last_name[0]}`;
  const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-500"><Link href={moduleHref} className="transition hover:text-[#176c73]">Hospital</Link><span className="text-slate-300">/</span><Link href={moduleHref} className="transition hover:text-[#176c73]">{moduleLabel}</Link><span className="text-slate-300">/</span><span className="font-semibold text-slate-800">Patient profile</span></div>
          <Button variant="secondary"><Download size={15} /> Export profile</Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 py-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-3xl border border-[#b9dcd6] bg-[linear-gradient(120deg,#173f4a_0%,#1d6266_58%,#2d9886_100%)] p-5 text-white shadow-[0_20px_55px_rgba(23,63,74,0.18)] sm:p-7">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold ring-1 ring-white/25 sm:h-20 sm:w-20 sm:text-2xl">{initials}</div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9e2df]">Complete patient profile</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{fullName}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/70"><span>UHID {patient.id}</span><span>·</span><span>{age} years</span><span>·</span><span>{patient.gender}</span></div>
                <div className="mt-4 flex flex-wrap gap-2"><Badge tone="green">{patientTypeLabels[patient.patient_type]}</Badge><Badge tone="blue">{patient.status}</Badge></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-72"><QuickContact icon={Phone} label="Phone" value={patient.phone} /><QuickContact icon={CalendarDays} label="Date of birth" value={patient.date_of_birth} /><QuickContact icon={Stethoscope} label="Consultant" value={patient.doctor} /><QuickContact icon={HeartPulse} label="Blood group" value={patient.blood_group} /></div>
          </div>
        </section>

        <section className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/70 shadow-[0_12px_30px_rgba(15,23,42,0.045)] sm:grid-cols-2 xl:grid-cols-4">
          <ProfileMetric label="Encounter status" value={patient.status} detail="Updated 10:18 AM" tone="teal" />
          <ProfileMetric label="Care priority" value={patient.patient_type === "EMERGENCY" ? "Immediate" : patient.patient_type === "IP" ? "High" : "Routine"} detail="Assigned clinical pathway" tone={patient.patient_type === "EMERGENCY" ? "rose" : "amber"} />
          <ProfileMetric label="Open orders" value="05" detail="3 lab · 2 clinical" tone="blue" />
          <ProfileMetric label="Outstanding balance" value="₹850" detail="1 payment pending" tone="slate" />
        </section>

        <div className="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-[#c8e3df] bg-[#f3faf8] px-4 py-3 sm:flex-row sm:items-center sm:px-5"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#176c73] text-white"><HeartPulse size={15} /></div><div><div className="text-xs font-semibold text-slate-800">Current encounter · OPD consultation</div><div className="mt-0.5 text-[11px] text-slate-500">{patient.department} · {patient.doctor} · 14 Sep 2026</div></div></div><div className="flex items-center gap-2"><Button variant="ghost">Add clinical note</Button><Button>Start consultation</Button></div></div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)]">
          <ClinicalNavigation />
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <div className="space-y-6">
            <ProfileSection id="overview" icon={UserRound} title="Basic patient details" subtitle="Registration and contact information">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Detail label="First name" value={patient.first_name} /><Detail label="Last name" value={patient.last_name} /><Detail label="Email" value={patient.email} /><Detail label="Phone" value={patient.phone} /><Detail label="Date of birth" value={patient.date_of_birth} /><Detail label="Gender" value={patient.gender} /><Detail label="Patient type" value={patientTypeLabels[patient.patient_type]} /><Detail label="Blood group" value={patient.blood_group} /><Detail label="Allergies" value={patient.allergies} /><Detail label="Address" value={`${patient.address}, ${patient.city}`} wide /><Detail label="Location" value={`${patient.state}, ${patient.country}`} /></div>
            </ProfileSection>

            <ProfileSection id="history" icon={HeartPulse} title="Medical history" subtitle="Clinical context and previous care">
              <div className="grid gap-4 md:grid-cols-2"><HistoryItem date="14 Sep 2026" title="OPD consultation" detail={`${patient.department} · ${patient.doctor}`} tone="blue" /><HistoryItem date="12 Sep 2026" title="Vitals recorded" detail="BP 124/82 · Pulse 76 · SpO2 98%" tone="green" /><HistoryItem date="05 Sep 2026" title="Previous encounter" detail="Follow-up assessment completed" tone="amber" /><HistoryItem date="Current note" title="Clinical notes" detail={patient.notes} tone="rose" /></div>
            </ProfileSection>

            <ProfileSection id="clinical" icon={ClipboardList} title="Clinical assessment" subtitle="Chief complaint, HOPI, examination, and diagnosis">
              <div className="space-y-5"><ClinicalNote title="Chief complaints" value={patient.patient_type === "EMERGENCY" ? "Acute chest pain with discomfort since morning" : patient.patient_type === "REFERRAL" ? "Persistent knee pain with restricted movement" : "Headache for three days with intermittent fatigue"} /><ClinicalNote title="History of present illness (HOPI)" value="Symptoms began gradually and have increased in frequency. No recent trauma or known infectious exposure reported. Patient is here for clinical assessment and treatment planning." /><div className="grid gap-4 sm:grid-cols-2"><ClinicalNote title="Physical examination" value="Patient conscious and oriented. General appearance stable. Cardiovascular and respiratory examination documented by the consultant." /><ClinicalNote title="Diagnosis" value={patient.department === "Cardiology" ? "Cardiac observation and medication review" : patient.department === "Orthopedics" ? "Knee pain, provisional orthopedic assessment" : "Primary headache, under clinical evaluation"} /></div></div>
            </ProfileSection>

            <ProfileSection id="notes" icon={FileText} title="Notes" subtitle="Care coordination notes and handover context">
              <div className="space-y-3"><ClinicalNote title="Consultant note" value={patient.notes} /><ClinicalNote title="Referral handover" value={`Patient referred from ${patient.referral_source} for ${patient.referral_reason}. Receiving team should confirm acceptance, appointment availability, and transport requirements.`} /><ClinicalNote title="Administrative note" value="Insurance details and supporting documents should be verified before the next care transition." /></div>
            </ProfileSection>

            <ProfileSection id="orders" icon={ClipboardCheck} title="Orders and advice" subtitle="Clinical orders, care instructions, and follow-up plan">
              <div className="space-y-3"><OrderRow title="Complete blood count (CBC)" detail="Laboratory · Ordered 14 Sep 2026 · Routine" status="Ordered" /><OrderRow title="Lipid profile" detail="Laboratory · Ordered 14 Sep 2026 · Routine" status="Ordered" /><OrderRow title="Fasting blood glucose" detail="Laboratory · Ordered 14 Sep 2026 · Priority" status="Processing" /><OrderRow title="Chest X-ray" detail="Imaging · Requested 14 Sep 2026 · Review if symptoms persist" status="Requested" /><OrderRow title="ECG" detail="Cardiology · Requested 14 Sep 2026 · Consultant review" status="Completed" /><div className="grid gap-4 pt-2 md:grid-cols-2"><ClinicalNote title="Advice summary" value="Maintain hydration, follow prescribed medicines, return immediately if symptoms worsen, and attend the next review appointment." /><ClinicalNote title="Follow-up" value="Review with the assigned consultant in 5 days or earlier for any warning signs." /></div></div>
            </ProfileSection>

            <ProfileSection id="prescription" icon={Pill} title="Prescription" subtitle="Current medicines and printable prescription" action={<Button variant="secondary"><Printer size={15} /> Print prescription</Button>}>
              <div className="rounded-2xl border border-[#c8e3df] bg-[#f3faf8] p-4"><div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#176c73]">Prescription · RX-2026-0914</div><div className="mt-2 text-sm font-semibold text-slate-900">{fullName} · {patient.id}</div><div className="mt-1 text-xs text-slate-500">Issued 14 Sep 2026 by {patient.doctor}</div></div><Badge tone="green">Active</Badge></div><div className="mt-4 divide-y divide-[#d8ebe7]"><MedicationRow name="Paracetamol 500 mg" detail="1 tablet after meals · Three times daily · 5 days" status="Oral" /><MedicationRow name="Pantoprazole 40 mg" detail="1 tablet before breakfast · Once daily · 5 days" status="Oral" /><MedicationRow name="Cetirizine 10 mg" detail="1 tablet at night · Once daily · 5 days" status="Oral" /><MedicationRow name="ORS sachet" detail="1 sachet dissolved in water · As needed" status="Oral" /><MedicationRow name="Diclofenac gel" detail="Apply to affected area · Twice daily · 7 days" status="Topical" /></div></div>
            </ProfileSection>

            <ProfileSection id="imaging" icon={ScanLine} title="Imaging and attachments" subtitle="Radiology requests, scans, and clinical images">
              <DocumentRow name="Chest X-ray request" meta="Radiology · Requested 14 Sep 2026" /><DocumentRow name="Previous imaging report" meta="PDF · Uploaded 05 Sep 2026" /><DocumentRow name="Clinical image attachment" meta="JPG · Added by consultant" />
            </ProfileSection>

            <ProfileSection id="documents" icon={FileText} title="Patient documents" subtitle="Uploaded records and supporting documents" action={<Button variant="ghost">Upload document</Button>}>
              <DocumentRow name="Patient registration form" meta="PDF · Uploaded 14 Sep 2026" /><DocumentRow name="Government identity proof" meta="PDF · Verified by front desk" /><DocumentRow name="Previous consultation notes" meta="PDF · Dr. Dev Nair" /><DocumentRow name="Referral letter" meta="PDF · {patient.referral_source}" />
            </ProfileSection>

            <ProfileSection id="laboratory" icon={FlaskConical} title="Laboratory reports" subtitle="Results associated with this patient" action={<Button variant="ghost">View all reports</Button>}>
              <ReportRow name="Complete blood count" date="14 Sep 2026" status="Verified" result="Within range" tone="green" /><ReportRow name="Lipid profile" date="05 Sep 2026" status="Ready for review" result="Awaiting clinician review" tone="amber" /><ReportRow name="Blood glucose, fasting" date="05 Sep 2026" status="Verified" result="92 mg/dL" tone="blue" />
            </ProfileSection>
          </div>

          <div className="space-y-6">
            <ProfileSection icon={ShieldCheck} title="Care team" subtitle="Assigned clinical ownership"><div className="space-y-3"><TeamRow icon={Stethoscope} name={patient.doctor} detail={`${patient.department} · Primary consultant`} /><TeamRow icon={UserRound} name="Neha Kulkarni" detail="Reception · Registration owner" /><TeamRow icon={FlaskConical} name="Priya Menon" detail="Laboratory · Result verification" /></div></ProfileSection>
            <ProfileSection icon={Phone} title="Emergency contact" subtitle="Contact in case of urgent need"><Detail label="Name" value={patient.emergency_contact_name} /><div className="mt-4"><Detail label="Phone" value={patient.emergency_contact_phone} /></div></ProfileSection>
            <ProfileSection icon={ArrowLeft} title="Referral details" subtitle="Source and reason for patient visit"><Detail label="Referral source" value={patient.referral_source} /><div className="mt-4"><Detail label="Referral reason" value={patient.referral_reason} /></div></ProfileSection>
            <ProfileSection icon={CreditCard} title="Billing details" subtitle="Current patient financial activity"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"><BillingItem label="Consultation invoice" value="₹1,200" status="Paid" /><BillingItem label="Laboratory services" value="₹850" status="Pending" /><BillingItem label="Total billed" value="₹2,050" status="2 transactions" /></div></ProfileSection>
            <ProfileSection icon={Pill} title="Pharmacy" subtitle="Medication and dispense history"><MedicationRow name="Paracetamol 500 mg" detail="1 tablet · After meals · 5 days" status="Dispensed" /><MedicationRow name="Pantoprazole 40 mg" detail="1 tablet · Before breakfast · 5 days" status="Prescribed" /></ProfileSection>
            <ProfileSection icon={MapPin} title="Admission details" subtitle="Encounter and bed information"><Detail label="Encounter type" value={patientTypeLabels[patient.patient_type]} /><div className="mt-4"><Detail label="Admission status" value={patient.patient_type === "OP" ? "Not admitted" : "Active encounter"} /></div><div className="mt-4"><Detail label="Last updated" value="14 Sep 2026 · 10:18 AM" /></div></ProfileSection>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileMetric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: "teal" | "rose" | "amber" | "blue" | "slate" }) {
  const accents = { teal: "text-[#176c73]", rose: "text-rose-700", amber: "text-amber-700", blue: "text-blue-700", slate: "text-slate-700" };
  return <div className="bg-white/90 px-4 py-4 sm:px-5"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</div><div className={`mt-2 truncate text-lg font-semibold tracking-[-0.03em] ${accents[tone]}`}>{value}</div><div className="mt-1 truncate text-[11px] text-slate-500">{detail}</div></div>;
}

function ClinicalNavigation() {
  const [activeSection, setActiveSection] = useState("overview");
  const [query, setQuery] = useState("");
  const visibleSections = profileSections.filter(([, label]) => label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const sectionElements = profileSections.map(([id]) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries.filter((entry) => entry.isIntersecting).sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visibleEntry) setActiveSection(visibleEntry.target.id);
    }, { rootMargin: "-120px 0px -60% 0px", threshold: 0 });
    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <nav className="h-max lg:sticky lg:top-24"><div className="rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm"><div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Patient record</div><div className="mx-1 mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2"><Search size={13} className="shrink-0 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search patient record sections" placeholder="Search sections" className="min-w-0 w-full bg-transparent text-xs outline-none placeholder:text-slate-400" /></div><div className="flex gap-1 overflow-x-auto lg:block">{visibleSections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${activeSection === id ? "bg-[#e3f2ef] text-[#176c73]" : "text-slate-600 hover:bg-slate-50 hover:text-[#176c73]"}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />{label}</a>)}{visibleSections.length === 0 && <div className="px-3 py-2 text-xs text-slate-400">No sections found</div>}</div></div><div className="mt-3 hidden rounded-2xl border border-[#c8e3df] bg-[#f3faf8] p-3 text-xs leading-5 text-slate-600 lg:block"><div className="font-semibold text-[#176c73]">Clinical workspace</div><div className="mt-1">Review the encounter, update care decisions, and print the patient record.</div></div></nav>;
}

function ProfileSection({ id, icon: Icon, title, subtitle, action, children }: { id?: string; icon: typeof UserRound; title: string; subtitle: string; action?: React.ReactNode; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_16px_40px_rgba(15,23,42,0.055)]"><div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-5 py-4 sm:px-6"><div className="flex items-start gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e3f2ef] text-[#176c73]"><Icon size={17} /></div><div><h2 className="text-base font-semibold tracking-[-0.02em] text-slate-900">{title}</h2><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div></div>{action}</div><div className="p-5 sm:p-6">{children}</div></section>;
}

function Detail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) { return <div className={wide ? "sm:col-span-2 lg:col-span-2" : ""}><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</div><div className="mt-1.5 text-sm font-medium leading-5 text-slate-800">{value}</div></div>; }
function QuickContact({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) { return <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15"><div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-white/55"><Icon size={13} />{label}</div><div className="mt-1.5 truncate text-xs font-semibold text-white">{value}</div></div>; }
function ClinicalNote({ title, value }: { title: string; value: string }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{title}</div><div className="mt-2 text-sm leading-6 text-slate-700">{value}</div></div>; }
function OrderRow({ title, detail, status }: { title: string; detail: string; status: string }) { return <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e3f2ef] text-[#176c73]"><ClipboardList size={16} /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div className="text-sm font-semibold text-slate-800">{title}</div><Badge tone="blue">{status}</Badge></div><div className="mt-1 text-xs leading-5 text-slate-500">{detail}</div></div></div>; }
function HistoryItem({ date, title, detail, tone }: { date: string; title: string; detail: string; tone: "blue" | "green" | "amber" | "rose" }) { const tones = { blue: "bg-blue-50 text-blue-700", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", rose: "bg-rose-50 text-rose-700" }; return <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"><div className="flex items-center justify-between gap-3"><span className={`rounded-lg px-2 py-1 text-[10px] font-semibold ${tones[tone]}`}>{date}</span><span className="h-2 w-2 rounded-full bg-slate-300" /></div><div className="mt-3 text-sm font-semibold text-slate-900">{title}</div><div className="mt-1 text-xs leading-5 text-slate-500">{detail}</div></div>; }
function DocumentRow({ name, meta }: { name: string; meta: string }) { return <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><FileText size={16} /></div><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium text-slate-800">{name}</div><div className="mt-1 text-xs text-slate-500">{meta}</div></div><button type="button" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#176c73]" aria-label={`Download ${name}`}><Download size={15} /></button></div>; }
function ReportRow({ name, date, status, result, tone }: { name: string; date: string; status: string; result: string; tone: "blue" | "green" | "amber" }) { return <div className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:items-center"><div className="min-w-0 flex-1"><div className="text-sm font-medium text-slate-800">{name}</div><div className="mt-1 text-xs text-slate-500">{date} · {result}</div></div><Badge tone={tone}>{status}</Badge></div>; }
function TeamRow({ icon: Icon, name, detail }: { icon: typeof Stethoscope; name: string; detail: string }) { return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#176c73] shadow-sm"><Icon size={16} /></div><div><div className="text-sm font-semibold text-slate-800">{name}</div><div className="mt-1 text-xs text-slate-500">{detail}</div></div></div>; }
function BillingItem({ label, value, status }: { label: string; value: string; status: string }) { return <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3"><div><div className="text-sm font-medium text-slate-800">{label}</div><div className="mt-1 text-xs text-slate-500">{status}</div></div><div className="text-sm font-semibold text-slate-900">{value}</div></div>; }
function MedicationRow({ name, detail, status }: { name: string; detail: string; status: string }) { return <div className="border-b border-slate-100 py-3 last:border-b-0"><div className="flex items-center justify-between gap-3"><div className="text-sm font-semibold text-slate-800">{name}</div><span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#176c73]">{status}</span></div><div className="mt-1 text-xs text-slate-500">{detail}</div></div>; }
