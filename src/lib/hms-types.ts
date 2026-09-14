import type { ElementType } from "react";

export type UserRole = "admin" | "doctor" | "receptionist" | "lab";
export type PatientCategory = "OP" | "IP" | "REFERRAL" | "EMERGENCY";

export type RoleOption = {
  id: UserRole;
  label: string;
  description: string;
  icon: ElementType;
};

export type NavItem = { label: string; icon: ElementType; badge?: string };
export type RoleConfig = { name: string; title: string; initials: string; primary: NavItem[]; secondary: NavItem[] };

export type PatientRecord = {
  id: number;
  uhid: string;
  name: string;
  category: PatientCategory;
  age: string;
  gender: string;
  phone: string;
  doctor: string;
  department: string;
  status: "Active" | "Waiting" | "Admitted";
  registered: string;
  bloodGroup: string;
  address: string;
  allergies: string;
};
