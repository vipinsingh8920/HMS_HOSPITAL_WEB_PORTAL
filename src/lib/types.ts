export type RoleKey =
  | "SUPER_ADMIN"
  | "HOSPITAL_ADMIN"
  | "RECEPTIONIST"
  | "DOCTOR"
  | "LAB_MANAGER"
  | "LAB_TECHNICIAN"
  | "PHARMACIST"
  | "ACCOUNTANT"
  | "STAFF";

export type PermissionKey =
  | "dashboard"
  | "hospitals"
  | "hospital_admins"
  | "system"
  | "hospital_staff"
  | "doctors"
  | "patients"
  | "appointments"
  | "opd"
  | "ipd"
  | "emergency"
  | "laboratory"
  | "pharmacy"
  | "radiology"
  | "billing"
  | "reports"
  | "notifications"
  | "audit_logs"
  | "settings"
  | "referrals";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
  permission: PermissionKey;
};

export type RoleConfig = {
  role: RoleKey;
  name: string;
  title: string;
  initials: string;
  dashboardTitle: string;
  accessSummary: string;
  permissions: PermissionKey[];
  nav: NavItem[];
};

export type Hospital = {
  id: string;
  name: string;
  city: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  beds: number;
  doctors: number;
  admins: number;
  occupancy: number;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  phone: string;
  status: "Active" | "Waiting" | "Admitted" | "Discharged";
  doctor: string;
  department: string;
  lastVisit: string;
};

export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  slot: string;
  status: "Scheduled" | "Checked In" | "In Consultation" | "Completed" | "Cancelled" | "No Show";
  type: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  category: string;
};

export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  entity: string;
  ip: string;
  status: "SUCCESS" | "FAILURE" | "WARNING";
};
