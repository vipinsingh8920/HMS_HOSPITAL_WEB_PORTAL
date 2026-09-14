import { z } from "zod";

export const patientCategorySchema = z.enum(["OP", "IP", "EMERGENCY", "REFERRAL"]);

export const patientRegistrationSchema = z.object({
  name: z.string().trim().min(2, "Enter the patient's full name"),
  dateOfBirth: z.string().min(1, "Select the patient's date of birth"),
  gender: z.enum(["Female", "Male", "Other"], { message: "Select a gender" }),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{10,18}$/, "Enter a valid phone number"),
  category: patientCategorySchema,
  bloodGroup: z.string().trim().min(1, "Select a blood group"),
  address: z.string().trim().min(5, "Enter the patient's address"),
  allergies: z.string().trim().min(1, "Enter allergies or 'None'"),
});

export type PatientCategory = z.infer<typeof patientCategorySchema>;
export type PatientRegistration = z.infer<typeof patientRegistrationSchema>;

export type ReceptionPatient = PatientRegistration & {
  id: string;
  age: number;
  doctor: string;
  department: string;
  status: "Active" | "Waiting" | "Admitted";
  lastVisit: string;
};

export const receptionPatients: ReceptionPatient[] = [
  { id: "P-301", name: "Meera Iyer", dateOfBirth: "1992-04-18", age: 34, gender: "Female", category: "OP", doctor: "Dr. Dev Nair", department: "General Medicine", status: "Waiting", phone: "+91 98765 43210", lastVisit: "Today, 09:42 AM", bloodGroup: "B+", address: "Kothrud, Pune", allergies: "None" },
  { id: "P-302", name: "Arjun Nair", dateOfBirth: "1969-02-11", age: 57, gender: "Male", category: "IP", doctor: "Dr. Asha Sharma", department: "Cardiology", status: "Admitted", phone: "+91 98220 11223", lastVisit: "Today, 09:15 AM", bloodGroup: "O+", address: "Baner, Pune", allergies: "Penicillin" },
  { id: "P-303", name: "Fatima Khan", dateOfBirth: "1984-08-22", age: 42, gender: "Female", category: "EMERGENCY", doctor: "Dr. Dev Nair", department: "Emergency", status: "Active", phone: "+91 98900 12345", lastVisit: "Today, 08:58 AM", bloodGroup: "AB+", address: "Camp, Pune", allergies: "Dust" },
  { id: "P-304", name: "Rohan Deshmukh", dateOfBirth: "1997-01-15", age: 29, gender: "Male", category: "REFERRAL", doctor: "Dr. Kavita Rao", department: "Orthopedics", status: "Active", phone: "+91 97654 32109", lastVisit: "Yesterday, 05:20 PM", bloodGroup: "A+", address: "Wakad, Pune", allergies: "None" },
  { id: "P-305", name: "Sana Sheikh", dateOfBirth: "2000-06-06", age: 26, gender: "Female", category: "OP", doctor: "Dr. Rohan Mehta", department: "Dermatology", status: "Waiting", phone: "+91 98123 45678", lastVisit: "Yesterday, 04:42 PM", bloodGroup: "O+", address: "Viman Nagar, Pune", allergies: "None" },
];

export function getPatientAge(dateOfBirth: string, today = new Date()) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayNotReached = today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  if (birthdayNotReached) age -= 1;
  return age;
}

export function findDuplicatePatient(patients: ReceptionPatient[], registration: PatientRegistration) {
  const normalizedPhone = registration.phone.replace(/\D/g, "");
  const normalizedName = registration.name.toLowerCase().replace(/\s+/g, " ").trim();
  return patients.find((patient) => patient.phone.replace(/\D/g, "") === normalizedPhone || patient.name.toLowerCase().replace(/\s+/g, " ").trim() === normalizedName);
}

export function createReceptionPatient(registration: PatientRegistration, sequence: number): ReceptionPatient {
  return {
    ...registration,
    id: `P-${sequence}`,
    age: getPatientAge(registration.dateOfBirth),
    doctor: "Unassigned",
    department: "Front desk",
    status: "Active",
    lastVisit: "Registered today",
  };
}
