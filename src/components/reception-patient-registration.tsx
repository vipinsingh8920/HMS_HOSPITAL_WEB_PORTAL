"use client";

import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createReceptionPatient,
  findDuplicatePatient,
  patientRegistrationSchema,
  type PatientRegistration,
  type ReceptionPatient,
} from "@/lib/reception-patients";

const initialForm: PatientRegistration = {
  name: "",
  dateOfBirth: "",
  gender: "Female",
  phone: "",
  category: "OP",
  bloodGroup: "",
  address: "",
  allergies: "None",
};

export function PatientRegistrationDialog({
  existingPatients,
  nextSequence,
  onClose,
  onCreated,
}: {
  existingPatients: ReceptionPatient[];
  nextSequence: number;
  onClose: () => void;
  onCreated: (patient: ReceptionPatient) => void;
}) {
  const [form, setForm] = useState<PatientRegistration>(initialForm);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof PatientRegistration, string>>>({});

  const updateField = <Field extends keyof PatientRegistration>(field: Field, value: PatientRegistration[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = patientRegistrationSchema.safeParse(form);

    if (!result.success) {
      const nextErrors: Partial<Record<keyof PatientRegistration, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PatientRegistration;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setFieldErrors(nextErrors);
      setError("Review the highlighted fields before creating the patient record.");
      return;
    }

    const duplicate = findDuplicatePatient(existingPatients, result.data);
    if (duplicate) {
      setError(`A patient with this ${duplicate.phone.replace(/\D/g, "") === result.data.phone.replace(/\D/g, "") ? "phone number" : "name"} already exists: ${duplicate.name} (${duplicate.id}). Open the existing record instead.`);
      return;
    }

    onCreated(createReceptionPatient(result.data, nextSequence));
  };

  const fieldClass = (field: keyof PatientRegistration) => `mt-2 h-11 w-full rounded-xl border bg-slate-50 px-3 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 ${fieldErrors[field] ? "border-rose-300" : "border-slate-200"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-3xl rounded-3xl border border-white/70 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.24)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="register-patient-title">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Front desk registration</div>
            <h2 id="register-patient-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">Register patient</h2>
            <p className="mt-1 text-sm text-slate-500">Create a verified patient record before starting an appointment or admission.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close patient registration">
            <X size={18} />
          </button>
        </div>

        {error && <div className="mt-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700" role="alert"><AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{error}</span></div>}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:col-span-2">Full name<input value={form.name} onChange={(event) => updateField("name", event.target.value)} className={fieldClass("name")} placeholder="e.g. Ananya Mehta" autoFocus />{fieldErrors.name && <FieldError message={fieldErrors.name} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Date of birth<input type="date" value={form.dateOfBirth} onChange={(event) => updateField("dateOfBirth", event.target.value)} className={fieldClass("dateOfBirth")} />{fieldErrors.dateOfBirth && <FieldError message={fieldErrors.dateOfBirth} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Gender<select value={form.gender} onChange={(event) => updateField("gender", event.target.value as PatientRegistration["gender"])} className={fieldClass("gender")}><option>Female</option><option>Male</option><option>Other</option></select>{fieldErrors.gender && <FieldError message={fieldErrors.gender} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Phone number<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className={fieldClass("phone")} placeholder="+91 98765 43210" inputMode="tel" />{fieldErrors.phone && <FieldError message={fieldErrors.phone} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Registration type<select value={form.category} onChange={(event) => updateField("category", event.target.value as PatientRegistration["category"])} className={fieldClass("category")}><option value="OP">Outpatient</option><option value="IP">Inpatient</option><option value="EMERGENCY">Emergency</option><option value="REFERRAL">Referral</option></select>{fieldErrors.category && <FieldError message={fieldErrors.category} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Blood group<select value={form.bloodGroup} onChange={(event) => updateField("bloodGroup", event.target.value)} className={fieldClass("bloodGroup")}><option value="">Select blood group</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option><option>Unknown</option></select>{fieldErrors.bloodGroup && <FieldError message={fieldErrors.bloodGroup} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:col-span-2">Address<textarea value={form.address} onChange={(event) => updateField("address", event.target.value)} className="mt-2 min-h-20 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" placeholder="House number, street, city" />{fieldErrors.address && <FieldError message={fieldErrors.address} />}</label>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:col-span-2">Allergies<input value={form.allergies} onChange={(event) => updateField("allergies", event.target.value)} className={fieldClass("allergies")} placeholder="Enter allergies or None" />{fieldErrors.allergies && <FieldError message={fieldErrors.allergies} />}</label>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5"><Button type="button" variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit">Create patient record</Button></div>
        </form>
      </div>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-rose-600">{message}</span>;
}
