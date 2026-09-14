"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LayoutDashboard,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const config = roleConfigs[role];

  const navItems = useMemo(() => config.nav, [config]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[#cfe2df] bg-[linear-gradient(180deg,#e3f2ee_0%,#edf7f4_48%,#fbfcfb_100%)] text-slate-700 shadow-[18px_0_50px_rgba(18,63,71,0.12)] transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#176c73] to-[#2d9886] text-sm font-bold text-white shadow-lg shadow-[#176c73]/25">V</div>
                <div>
                  <div className="text-lg font-semibold tracking-tight text-slate-900">Veya</div>
                  <div className="text-[10px] tracking-[0.28em] text-slate-500">HOSPITAL OS</div>
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

            <div className="border-t border-slate-200 p-3">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#d5eee8] to-[#e9f5f1] text-[10px] font-bold text-[#21635f]">
                  {config.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-900">{config.name}</div>
                  <div className="truncate text-[11px] text-slate-500">{config.title}</div>
                </div>
                <button className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100" aria-label="Open settings">
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
