import {
  Activity,
  AlertTriangle,
  BedDouble,
  Bell,
  Building2,
  CalendarCheck2,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileBarChart2,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Pill,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import {
  roleConfigs as canonicalRoleConfigs,
  roleOptions as canonicalRoleOptions,
} from "@/lib/permissions";
import type { RoleOption, UserRole, RoleConfig, PatientRecord } from "@/lib/hms-types";

const legacyIconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  BarChart3: Activity,
  FileText,
  CalendarDays,
  Stethoscope,
  ClipboardList,
  BedDouble,
  AlertTriangle,
  FlaskConical,
  Pill,
  WalletCards,
  Bell,
  ReceiptText,
  CreditCard,
  CalendarCheck2,
  FileBarChart2,
};

const toLegacyNav = (items: typeof canonicalRoleConfigs.HOSPITAL_ADMIN.nav) =>
  items.map((item) => ({
    label: item.label,
    icon: legacyIconMap[item.icon] ?? LayoutDashboard,
    badge: item.permission === "patients" || item.permission === "laboratory" ? "" : undefined,
  }));

export const roleOptions: RoleOption[] = canonicalRoleOptions.map((option) => ({
  id: option.id.toLowerCase() === "hospital_admin" ? "admin" : option.id.toLowerCase() === "lab_manager" ? "lab" : option.id.toLowerCase() === "receptionist" ? "receptionist" : option.id.toLowerCase() === "doctor" ? "doctor" : "admin",
  label: option.label,
  description: option.description,
  icon: legacyIconMap[option.id] ?? ShieldCheck,
}));

export const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: {
    name: canonicalRoleConfigs.HOSPITAL_ADMIN.name,
    title: canonicalRoleConfigs.HOSPITAL_ADMIN.title,
    initials: canonicalRoleConfigs.HOSPITAL_ADMIN.initials,
    primary: toLegacyNav(canonicalRoleConfigs.HOSPITAL_ADMIN.nav.slice(0, 4)),
    secondary: toLegacyNav(canonicalRoleConfigs.HOSPITAL_ADMIN.nav.slice(4)),
  },
  doctor: {
    name: canonicalRoleConfigs.DOCTOR.name,
    title: canonicalRoleConfigs.DOCTOR.title,
    initials: canonicalRoleConfigs.DOCTOR.initials,
    primary: toLegacyNav(canonicalRoleConfigs.DOCTOR.nav.slice(0, 4)),
    secondary: toLegacyNav(canonicalRoleConfigs.DOCTOR.nav.slice(4)),
  },
  receptionist: {
    name: canonicalRoleConfigs.RECEPTIONIST.name,
    title: canonicalRoleConfigs.RECEPTIONIST.title,
    initials: canonicalRoleConfigs.RECEPTIONIST.initials,
    primary: toLegacyNav(canonicalRoleConfigs.RECEPTIONIST.nav.slice(0, 4)),
    secondary: toLegacyNav(canonicalRoleConfigs.RECEPTIONIST.nav.slice(4)),
  },
  lab: {
    name: canonicalRoleConfigs.LAB_MANAGER.name,
    title: canonicalRoleConfigs.LAB_MANAGER.title,
    initials: canonicalRoleConfigs.LAB_MANAGER.initials,
    primary: toLegacyNav(canonicalRoleConfigs.LAB_MANAGER.nav.slice(0, 4)),
    secondary: toLegacyNav(canonicalRoleConfigs.LAB_MANAGER.nav.slice(4)),
  },
};

export const initialPatients: PatientRecord[] = [
  { id: 1, uhid: "RC-240981", name: "Meera Iyer", category: "OP", age: "34", gender: "Female", phone: "+91 98765 43210", doctor: "Dr. Asha Sharma", department: "General Medicine", status: "Waiting", registered: "Today, 09:42", bloodGroup: "B+", address: "Kothrud, Pune", allergies: "No known allergies" },
  { id: 2, uhid: "RC-240980", name: "Arjun Nair", category: "IP", age: "57", gender: "Male", phone: "+91 98220 11223", doctor: "Dr. Rohan Mehta", department: "Cardiology", status: "Admitted", registered: "Today, 09:15", bloodGroup: "O+", address: "Baner, Pune", allergies: "Penicillin" },
  { id: 3, uhid: "RC-240979", name: "Fatima Khan", category: "EMERGENCY", age: "42", gender: "Female", phone: "+91 98900 12345", doctor: "Dr. Asha Sharma", department: "Emergency care", status: "Active", registered: "Today, 08:58", bloodGroup: "AB+", address: "Camp, Pune", allergies: "No known allergies" },
  { id: 4, uhid: "RC-240978", name: "Rohan Deshmukh", category: "REFERRAL", age: "29", gender: "Male", phone: "+91 97654 32109", doctor: "Dr. Kavita Rao", department: "Orthopedics", status: "Active", registered: "Yesterday, 17:20", bloodGroup: "A+", address: "Wakad, Pune", allergies: "Dust allergy" },
  { id: 5, uhid: "RC-240977", name: "Sana Sheikh", category: "OP", age: "26", gender: "Female", phone: "+91 98123 45678", doctor: "Dr. Rohan Mehta", department: "Dermatology", status: "Waiting", registered: "Yesterday, 16:42", bloodGroup: "O+", address: "Viman Nagar, Pune", allergies: "No known allergies" },
  { id: 6, uhid: "RC-240976", name: "Sameer Rao", category: "IP", age: "63", gender: "Male", phone: "+91 99001 24567", doctor: "Dr. Kavita Rao", department: "Pulmonology", status: "Admitted", registered: "Yesterday, 14:10", bloodGroup: "A-", address: "Aundh, Pune", allergies: "Sulfa drugs" },
];

export const categoryLabels = { OP: "Outpatient", IP: "Inpatient", REFERRAL: "Referral", EMERGENCY: "Emergency" } as const;
