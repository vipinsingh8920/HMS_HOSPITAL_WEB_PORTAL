"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ReceptionPatientRegistration = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  preferred_language: string;
  identity_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  notes: string;
  patient_type: "OP" | "IP" | "EMERGENCY" | "REFERRAL";
  department: string;
  doctor: string;
  visit_reason: string;
  appointment_date: string;
  appointment_time: string;
  payment_type: string;
  insurance_provider: string;
  insurance_policy_number: string;
  referral_source: string;
  referral_reason: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
};

const initialForm: ReceptionPatientRegistration = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  gender: "",
  marital_status: "",
  preferred_language: "English",
  identity_number: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  notes: "",
  patient_type: "OP",
  department: "",
  doctor: "",
  visit_reason: "",
  appointment_date: "",
  appointment_time: "",
  payment_type: "Self-pay",
  insurance_provider: "",
  insurance_policy_number: "",
  referral_source: "",
  referral_reason: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
};

export function ReceptionPatientRegistrationDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ReceptionPatientRegistration, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = <Field extends keyof ReceptionPatientRegistration>(field: Field, value: ReceptionPatientRegistration[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ReceptionPatientRegistration, string>> = {};
    const required: Array<keyof ReceptionPatientRegistration> = ["first_name", "last_name", "phone", "date_of_birth", "gender", "address", "city", "state", "country", "department", "doctor", "visit_reason"];
    required.forEach((field) => {
      if (!String(form[field]).trim()) nextErrors[field] = "Required";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email";
    if (form.phone && !/^\+?[0-9 ()-]{10,18}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone number";
    if (form.emergency_contact_phone && !/^\+?[0-9 ()-]{10,18}$/.test(form.emergency_contact_phone)) nextErrors.emergency_contact_phone = "Enter a valid phone number";
    if (form.payment_type === "Insurance" && !form.insurance_provider.trim()) nextErrors.insurance_provider = "Required for insurance billing";
    if (form.payment_type === "Insurance" && !form.insurance_policy_number.trim()) nextErrors.insurance_policy_number = "Required for insurance billing";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const inputClass = (field: keyof ReceptionPatientRegistration) => `mt-2 h-11 w-full rounded-xl border bg-slate-50 px-3 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 ${errors[field] ? "border-rose-300" : "border-slate-200"}`;

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-3 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="mx-auto my-3 w-full max-w-4xl rounded-3xl border border-white/70 bg-white p-5 shadow-[0_28px_90px_rgba(15,23,42,0.24)] sm:my-6 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="reception-register-patient-title">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Front desk registration</div><h2 id="reception-register-patient-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">Register patient</h2><p className="mt-1 text-sm text-slate-500">Create the patient profile before booking an appointment or starting admission.</p></div><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close registration"><X size={18} /></button></div>

      {submitted ? <div className="py-12 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={28} /></div><h3 className="mt-5 text-xl font-semibold text-slate-900">Patient registration captured</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{form.first_name} {form.last_name} is ready for {form.patient_type === "OP" ? "outpatient" : form.patient_type.toLowerCase()} workflows. Connect this form to the patient API to persist the record.</p><div className="mt-6 flex justify-center gap-3"><Button variant="secondary" onClick={() => { setSubmitted(false); setForm(initialForm); }}>Register another</Button><Button onClick={onClose}>Done</Button></div></div> : <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
        <section><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Patient identity</div><div className="grid gap-4 sm:grid-cols-2"><Field label="First name" error={errors.first_name}><input value={form.first_name} onChange={(event) => updateField("first_name", event.target.value)} className={inputClass("first_name")} autoFocus placeholder="First name" /></Field><Field label="Last name" error={errors.last_name}><input value={form.last_name} onChange={(event) => updateField("last_name", event.target.value)} className={inputClass("last_name")} placeholder="Last name" /></Field><Field label="Date of birth" error={errors.date_of_birth}><input type="date" value={form.date_of_birth} onChange={(event) => updateField("date_of_birth", event.target.value)} className={inputClass("date_of_birth")} /></Field><Field label="Gender" error={errors.gender}><SelectControl value={form.gender} onChange={(value) => updateField("gender", value)} className={inputClass("gender")}><option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></SelectControl></Field><Field label="Marital status"><SelectControl value={form.marital_status} onChange={(value) => updateField("marital_status", value)} className={inputClass("marital_status")}><option value="">Select status</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></SelectControl></Field><Field label="Preferred language"><SelectControl value={form.preferred_language} onChange={(value) => updateField("preferred_language", value)} className={inputClass("preferred_language")}><option>English</option><option>Hindi</option><option>Marathi</option><option>Other</option></SelectControl></Field><Field label="Patient type"><SelectControl value={form.patient_type} onChange={(value) => updateField("patient_type", value as ReceptionPatientRegistration["patient_type"])} className={inputClass("patient_type")}><option value="OP">Outpatient (OP)</option><option value="IP">Inpatient (IP)</option><option value="EMERGENCY">Emergency</option><option value="REFERRAL">Referral</option></SelectControl></Field><Field label="Government ID / identity number"><input value={form.identity_number} onChange={(event) => updateField("identity_number", event.target.value)} className={inputClass("identity_number")} placeholder="Optional identity reference" /></Field></div></section>

        <section><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Care routing</div><div className="grid gap-4 sm:grid-cols-2"><Field label="Department" error={errors.department}><SelectControl value={form.department} onChange={(value) => updateField("department", value)} className={inputClass("department")}><option value="">Select department</option><option>General Medicine</option><option>Cardiology</option><option>Dermatology</option><option>Orthopedics</option><option>Pediatrics</option><option>Obstetrics & Gynecology</option><option>Emergency</option></SelectControl></Field><Field label="Consulting doctor" error={errors.doctor}><SelectControl value={form.doctor} onChange={(value) => updateField("doctor", value)} className={inputClass("doctor")}><option value="">Select doctor</option><option>Dr. Dev Nair</option><option>Dr. Asha Sharma</option><option>Dr. Kavita Rao</option><option>Dr. Rohan Mehta</option><option>Dr. Ira Banerjee</option></SelectControl></Field><Field label="Visit reason / chief complaint" error={errors.visit_reason} wide><input value={form.visit_reason} onChange={(event) => updateField("visit_reason", event.target.value)} className={inputClass("visit_reason")} placeholder="Why is the patient visiting today?" /></Field><Field label="Appointment date"><input type="date" value={form.appointment_date} onChange={(event) => updateField("appointment_date", event.target.value)} className={inputClass("appointment_date")} /></Field><Field label="Appointment time"><input type="time" value={form.appointment_time} onChange={(event) => updateField("appointment_time", event.target.value)} className={inputClass("appointment_time")} /></Field></div></section>
        <section><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Contact details</div><div className="grid gap-4 sm:grid-cols-2"><Field label="Phone" error={errors.phone}><input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className={inputClass("phone")} inputMode="tel" placeholder="+91 98765 43210" /></Field><Field label="Email" error={errors.email}><input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass("email")} placeholder="patient@example.com" /></Field><Field label="Address" error={errors.address} wide><input value={form.address} onChange={(event) => updateField("address", event.target.value)} className={inputClass("address")} placeholder="House number, street, locality" /></Field><Field label="City" error={errors.city}><input value={form.city} onChange={(event) => updateField("city", event.target.value)} className={inputClass("city")} placeholder="Pune" /></Field><Field label="State" error={errors.state}><input value={form.state} onChange={(event) => updateField("state", event.target.value)} className={inputClass("state")} placeholder="Maharashtra" /></Field><Field label="Country" error={errors.country}><input value={form.country} onChange={(event) => updateField("country", event.target.value)} className={inputClass("country")} /></Field></div></section>
        <section><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Billing and coverage</div><div className="grid gap-4 sm:grid-cols-2"><Field label="Payment type"><SelectControl value={form.payment_type} onChange={(value) => updateField("payment_type", value)} className={inputClass("payment_type")}><option>Self-pay</option><option>Insurance</option><option>Corporate</option><option>Government scheme</option></SelectControl></Field><Field label="Insurance provider" error={errors.insurance_provider}><input value={form.insurance_provider} onChange={(event) => updateField("insurance_provider", event.target.value)} className={inputClass("insurance_provider")} placeholder="Required for insurance" /></Field><Field label="Insurance policy number" error={errors.insurance_policy_number}><input value={form.insurance_policy_number} onChange={(event) => updateField("insurance_policy_number", event.target.value)} className={inputClass("insurance_policy_number")} placeholder="Policy or member number" /></Field></div></section>

        <section><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Referral, emergency contact, and notes</div><div className="grid gap-4 sm:grid-cols-2"><Field label="Referral source"><input value={form.referral_source} onChange={(event) => updateField("referral_source", event.target.value)} className={inputClass("referral_source")} placeholder="Doctor, hospital, website, walk-in" /></Field><Field label="Referral reason"><input value={form.referral_reason} onChange={(event) => updateField("referral_reason", event.target.value)} className={inputClass("referral_reason")} placeholder="Reason for referral" /></Field><Field label="Emergency contact name"><input value={form.emergency_contact_name} onChange={(event) => updateField("emergency_contact_name", event.target.value)} className={inputClass("emergency_contact_name")} placeholder="Full name" /></Field><Field label="Emergency contact phone" error={errors.emergency_contact_phone}><input value={form.emergency_contact_phone} onChange={(event) => updateField("emergency_contact_phone", event.target.value)} className={inputClass("emergency_contact_phone")} inputMode="tel" placeholder="+91 98765 43210" /></Field><Field label="Notes" wide><textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} className="mt-2 min-h-20 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" placeholder="Additional registration notes, alerts, or accessibility needs" /></Field></div></section>
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Register patient</Button></div>
      </form>}
    </div>
  </div>;
}

function Field({ label, error, wide = false, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={`block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 ${wide ? "sm:col-span-2" : ""}`}>{label}{children}{error && <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{error}</span>}</label>;
}

function SelectControl({ value, onChange, className, children }: { value: string; onChange: (value: string) => void; className: string; children: React.ReactNode }) {
  return <div className="relative"><select value={value} onChange={(event) => onChange(event.target.value)} className={`${className} appearance-none pr-10`} >{children}</select><ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></div>;
}
