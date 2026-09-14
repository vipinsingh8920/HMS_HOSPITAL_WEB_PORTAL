import { Activity, BedDouble, CalendarDays, ClipboardList, FileText, FlaskConical, LayoutDashboard, Pill, ShieldCheck, Stethoscope, UserRound, Users } from "lucide-react";
import type { RoleConfig, PatientRecord, RoleOption, UserRole } from "@/lib/hms-types";

export const roleOptions: RoleOption[] = [
  { id: "admin", label: "Hospital admin", description: "Operations, finance and people", icon: ShieldCheck },
  { id: "doctor", label: "Doctor", description: "Rounds, patients and clinical care", icon: Stethoscope },
  { id: "receptionist", label: "Receptionist", description: "Front desk and patient flow", icon: UserRound },
  { id: "lab", label: "Lab manager", description: "Samples, results and quality", icon: FlaskConical },
];

export const initialPatients: PatientRecord[] = [
  { id: 1, uhid: "RC-240981", name: "Meera Iyer", category: "OP", age: "34", gender: "Female", phone: "+91 98765 43210", doctor: "Dr. Asha Sharma", department: "General Medicine", status: "Waiting", registered: "Today, 09:42", bloodGroup: "B+", address: "Kothrud, Pune", allergies: "No known allergies" },
  { id: 2, uhid: "RC-240980", name: "Arjun Nair", category: "IP", age: "57", gender: "Male", phone: "+91 98220 11223", doctor: "Dr. Rohan Mehta", department: "Cardiology", status: "Admitted", registered: "Today, 09:15", bloodGroup: "O+", address: "Baner, Pune", allergies: "Penicillin" },
  { id: 3, uhid: "RC-240979", name: "Fatima Khan", category: "EMERGENCY", age: "42", gender: "Female", phone: "+91 98900 12345", doctor: "Dr. Asha Sharma", department: "Emergency care", status: "Active", registered: "Today, 08:58", bloodGroup: "AB+", address: "Camp, Pune", allergies: "No known allergies" },
  { id: 4, uhid: "RC-240978", name: "Rohan Deshmukh", category: "REFERRAL", age: "29", gender: "Male", phone: "+91 97654 32109", doctor: "Dr. Kavita Rao", department: "Orthopedics", status: "Active", registered: "Yesterday, 17:20", bloodGroup: "A+", address: "Wakad, Pune", allergies: "Dust allergy" },
  { id: 5, uhid: "RC-240977", name: "Sana Sheikh", category: "OP", age: "26", gender: "Female", phone: "+91 98123 45678", doctor: "Dr. Rohan Mehta", department: "Dermatology", status: "Waiting", registered: "Yesterday, 16:42", bloodGroup: "O+", address: "Viman Nagar, Pune", allergies: "No known allergies" },
  { id: 6, uhid: "RC-240976", name: "Sameer Rao", category: "IP", age: "63", gender: "Male", phone: "+91 99001 24567", doctor: "Dr. Kavita Rao", department: "Pulmonology", status: "Admitted", registered: "Yesterday, 14:10", bloodGroup: "A-", address: "Aundh, Pune", allergies: "Sulfa drugs" },
];

export const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: { name: "Asha Sharma", title: "Hospital administrator", initials: "AS", primary: [{ label: "Overview", icon: LayoutDashboard }, { label: "Patients", icon: Users, badge: "24" }, { label: "Appointments", icon: CalendarDays }, { label: "Admissions", icon: BedDouble }], secondary: [{ label: "Staff & rosters", icon: Users }, { label: "Billing & finance", icon: FileText }, { label: "Reports", icon: FileText }] },
  doctor: { name: "Asha Sharma", title: "Consultant physician", initials: "AS", primary: [{ label: "My workspace", icon: LayoutDashboard }, { label: "My patients", icon: Users }, { label: "Appointments", icon: CalendarDays }, { label: "Rounds", icon: BedDouble }], secondary: [{ label: "Clinical notes", icon: Stethoscope }, { label: "Orders", icon: ClipboardList }, { label: "Lab results", icon: FlaskConical }] },
  receptionist: { name: "Neha Kulkarni", title: "Front desk executive", initials: "NK", primary: [{ label: "Front desk", icon: LayoutDashboard }, { label: "Patient registry", icon: Users, badge: "07" }, { label: "Appointments", icon: CalendarDays }, { label: "Payments", icon: FileText }], secondary: [{ label: "Admissions", icon: BedDouble }, { label: "Insurance", icon: FileText }, { label: "Reception reports", icon: FileText }] },
  lab: { name: "Priya Menon", title: "Laboratory manager", initials: "PM", primary: [{ label: "Lab overview", icon: LayoutDashboard }, { label: "Sample queue", icon: FlaskConical, badge: "26" }, { label: "Results", icon: FileText }, { label: "Quality control", icon: Activity }], secondary: [{ label: "Lab orders", icon: ClipboardList }, { label: "Inventory", icon: Pill }, { label: "Lab reports", icon: FileText }] },
};

export const categoryLabels = { OP: "Outpatient", IP: "Inpatient", REFERRAL: "Referral", EMERGENCY: "Emergency" } as const;
