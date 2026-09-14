"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  Activity,
  AlertTriangle,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CreditCard,
  FileText,
  FlaskConical,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { roleConfigs } from "@/lib/permissions";
import type { RoleKey } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  BarChart3: Activity,
  FileText,
  CalendarDays,
  Stethoscope,
  ClipboardList: FileText,
  BedDouble: Activity,
  AlertTriangle,
  FlaskConical,
  Pill,
  WalletCards,
  Bell,
  Settings,
  ReceiptText: FileText,
  CreditCard,
};

export function HmsShell({
  role,
  title,
  description,
  breadcrumbs = [],
  actions,
  children,
}: {
  role: RoleKey;
  title: string;
  description: string;
  breadcrumbs?: string[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({ urgent: true, appointments: true, reports: false });
  const config = roleConfigs[role];

  const navItems = useMemo(() => config.nav, [config]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[#cfe2df] bg-[linear-gradient(180deg,#e3f2ee_0%,#edf7f4_48%,#fbfcfb_100%)] text-slate-700 shadow-[18px_0_50px_rgba(18,63,71,0.12)] transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#176c73] to-[#2d9886] text-sm font-bold text-white shadow-lg shadow-[#176c73]/25">A</div>
                <div>
                  <div className="text-lg font-semibold tracking-tight text-slate-900">appziora</div>
                  <div className="text-[10px] tracking-[0.28em] text-slate-500">HMS</div>
                </div>
              </div>
              <button className="rounded-lg p-2 text-slate-600 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#d5eee8] to-[#e9f5f1] text-xs font-bold text-[#21635f]">
                  RC
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900">Royal Care Hospital</div>
                  <div className="truncate text-[11px] text-slate-500">{config.title}</div>
                </div>
                <ChevronDown size={14} className="text-slate-500" />
              </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
              <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</div>
              {navItems.map((item) => {
                const Icon = iconMap[item.icon] ?? LayoutDashboard;
                const active = pathname === item.href || pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                      active ? "bg-gradient-to-r from-[#176c73] to-[#258979] !text-white shadow-md shadow-[#176c73]/20 [&_*]:!text-white" : "text-slate-700 hover:bg-white hover:text-slate-900",
                    )}
                  >
                    <Icon size={17} />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="relative border-t border-slate-200 p-3">
              {settingsOpen && (
                <div className="absolute bottom-[calc(100%-0.5rem)] left-3 right-3 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                  <div className="border-b border-slate-100 px-3 pb-3 pt-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Signed in as</div>
                    <div className="mt-1 truncate text-sm font-semibold text-slate-900">{config.name}</div>
                    <div className="mt-0.5 truncate text-xs text-slate-500">{config.title}</div>
                  </div>
                  <button type="button" onClick={() => { setPasswordOpen(true); setSettingsOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-teal-50 hover:text-teal-800">
                    <KeyRound size={16} />
                    <span>Change password</span>
                  </button>
                  <button type="button" onClick={() => { setNotificationsOpen(true); setSettingsOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-teal-50 hover:text-teal-800">
                    <Bell size={16} />
                    <span>Notification preferences</span>
                  </button>
                  <button type="button" onClick={() => { setHelpOpen(true); setSettingsOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-teal-50 hover:text-teal-800">
                    <HelpCircle size={16} />
                    <span>Help &amp; support</span>
                  </button>
                  <div className="my-2 border-t border-slate-100" />
                  <button type="button" onClick={() => { setLogoutOpen(true); setSettingsOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#d5eee8] to-[#e9f5f1] text-[10px] font-bold text-[#21635f]">
                  {config.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-900">{config.name}</div>
                  <div className="truncate text-[11px] text-slate-500">{config.title}</div>
                </div>
                <button type="button" onClick={() => setSettingsOpen((open) => !open)} className={`rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 ${settingsOpen ? "bg-slate-100 text-teal-700" : ""}`} aria-label="Open settings" aria-expanded={settingsOpen}>
                  <Settings size={15} />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-6">
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                  <Menu size={18} />
                </button>
                <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
                  {breadcrumbs.length > 0 ? breadcrumbs.map((crumb, index) => (
                    <div key={crumb} className="flex items-center gap-2">
                      <span>{crumb}</span>
                      {index < breadcrumbs.length - 1 && <span className="text-slate-300">/</span>}
                    </div>
                  )) : <span>{config.title}</span>}
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end gap-3">
                <div className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 shadow-sm md:flex">
                  <Search size={16} className="text-slate-400" />
                  <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search patients, orders, staff..." />
                  <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500">⌘K</span>
                </div>
                <button className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm" aria-label="Notifications">
                  <Bell size={17} />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
                </button>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d5eee8] to-[#e9f5f1] text-[10px] font-bold text-[#21635f]">{config.initials}</div>
                  <div className="hidden text-left sm:block">
                    <div className="text-sm font-medium text-slate-800">{config.name}</div>
                    <div className="text-[10px] text-slate-500">{config.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-2xl font-semibold tracking-[-0.04em] text-slate-900 md:text-3xl">{title}</h1>
                <p className="mt-2 text-sm text-slate-500">{description}</p>
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {children}
          </main>
        </div>
      </div>
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setNotificationsOpen(false)}>
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.2)]" role="dialog" aria-modal="true" aria-labelledby="notification-preferences-title">
            <div className="bg-[linear-gradient(135deg,#173f4a_0%,#28717a_100%)] px-6 py-7 text-white sm:px-8">
              <div className="flex items-start justify-between gap-4"><div><div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100">Stay informed</div><h2 id="notification-preferences-title" className="text-2xl font-semibold tracking-[-0.04em]">Notification preferences</h2><p className="mt-2 text-sm leading-6 text-white/70">Choose the updates you want to receive in your workspace.</p></div><button type="button" onClick={() => setNotificationsOpen(false)} className="rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close notification preferences"><X size={18} /></button></div>
            </div>
            <div className="space-y-2 p-5 sm:p-7">
              {[
                { key: "urgent" as const, label: "Urgent care alerts", detail: "Emergency cases, critical incidents, and safety notices." },
                { key: "appointments" as const, label: "Appointment updates", detail: "Schedule changes, check-ins, and missed appointments." },
                { key: "reports" as const, label: "Report reminders", detail: "Pending reviews and newly available hospital reports." },
              ].map((item) => (
                <label key={item.key} className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-teal-200 hover:bg-teal-50/50">
                  <span><span className="block text-sm font-semibold text-slate-800">{item.label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{item.detail}</span></span>
                  <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${notificationSettings[item.key] ? "bg-[#28717a]" : "bg-slate-300"}`}><input type="checkbox" className="sr-only" checked={notificationSettings[item.key]} onChange={() => setNotificationSettings((current) => ({ ...current, [item.key]: !current[item.key] }))} /><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${notificationSettings[item.key] ? "left-6" : "left-1"}`} /></span>
                </label>
              ))}
              <div className="flex justify-end border-t border-slate-100 pt-5"><button type="button" onClick={() => setNotificationsOpen(false)} className="rounded-xl bg-[#173f4a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(23,63,74,0.16)] transition hover:bg-[#28717a]">Save preferences</button></div>
            </div>
          </div>
        </div>
      )}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setHelpOpen(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="help-support-title">
            <div className="flex items-start justify-between gap-4"><div><div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">We are here to help</div><h2 id="help-support-title" className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">Help &amp; support</h2><p className="mt-2 text-sm leading-6 text-slate-500">Find answers or connect with the appziora HMS support team.</p></div><button type="button" onClick={() => setHelpOpen(false)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close help and support"><X size={18} /></button></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setHelpOpen(false)} className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-teal-200 hover:bg-teal-50/50"><HelpCircle size={19} className="text-teal-700" /><div className="mt-3 text-sm font-semibold text-slate-800">Browse help center</div><div className="mt-1 text-xs leading-5 text-slate-500">Guides for daily hospital workflows.</div></button><button type="button" onClick={() => setHelpOpen(false)} className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-teal-200 hover:bg-teal-50/50"><Bell size={19} className="text-teal-700" /><div className="mt-3 text-sm font-semibold text-slate-800">Contact support</div><div className="mt-1 text-xs leading-5 text-slate-500">Reach the operations team for assistance.</div></button></div>
            <div className="mt-5 rounded-2xl bg-[#f1f7f6] p-4 text-xs leading-5 text-slate-600">Support hours: Monday to Saturday, 9:00 AM to 6:00 PM. Include your hospital and workspace role when reporting an issue.</div>
          </div>
        </div>
      )}
      {logoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setLogoutOpen(false)}>
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.28)]" role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <div className="bg-[linear-gradient(135deg,#173f4a_0%,#28717a_100%)] px-6 pb-8 pt-7 text-white sm:px-8"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"><LogOut size={22} /></div><h2 id="logout-title" className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Sign out of appziora HMS?</h2><p className="mt-2 max-w-sm text-sm leading-6 text-white/70">You will return to the secure sign-in screen. Any unsaved work on this page will be lost.</p></div>
            <div className="flex justify-end gap-3 p-5 sm:p-6"><button type="button" onClick={() => setLogoutOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Stay signed in</button><button type="button" onClick={() => router.push("/login")} className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(225,29,72,0.2)] transition hover:bg-rose-700">Sign out</button></div>
          </div>
        </div>
      )}
      {passwordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setPasswordOpen(false)}>
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.2)] sm:p-8" role="dialog" aria-modal="true" aria-labelledby="change-password-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Account security</div>
                <h2 id="change-password-title" className="text-2xl font-semibold tracking-[-0.04em] text-slate-900">Change password</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Update the password used to access your {config.title.toLowerCase()} workspace.</p>
              </div>
              <button type="button" onClick={() => setPasswordOpen(false)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Close change password dialog">
                <X size={18} />
              </button>
            </div>
            <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setPasswordOpen(false); }}>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Current password<input required type="password" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">New password<input required minLength={8} type="password" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Confirm new password<input required minLength={8} type="password" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10" /></label>
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={() => setPasswordOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-xl bg-[#173f4a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(23,63,74,0.16)] transition hover:bg-[#28717a]">Update password</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">{label}</div>
      <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function StatCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "slate",
}: {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "amber" | "rose" | "slate";
}) {
  const palette = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-inner ${palette[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-900">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{note}</div>
    </div>
  );
}

export function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{subtitle}</div>
          <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-900">{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="border-b border-slate-200/80 px-4 py-3 text-sm text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
