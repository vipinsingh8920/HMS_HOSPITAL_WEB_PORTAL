"use client";

import { useState } from "react";
import {
  Activity,
  ChevronDown,
  Menu,
  Search,
  Settings2,
  X,
} from "lucide-react";
import { roleConfigs } from "@/lib/hms-data";
import type { UserRole } from "@/lib/hms-types";

export type { UserRole } from "@/lib/hms-types";

export function AppShell({ children, role, onSignOut, activeNav, onNavigate }: { children: React.ReactNode; role: UserRole; onSignOut: () => void; activeNav?: string; onNavigate?: (label: string) => void }) {
  const [open, setOpen] = useState(false);
  const config = roleConfigs[role];
  const selectedNav = activeNav ?? config.primary[0].label;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><Activity size={19} strokeWidth={2.5} /></div>
          <div><strong>appziora</strong><span>HMS</span></div>
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="hospital-switcher">
          <div className="hospital-avatar">RC</div>
          <div><strong>Royal Care</strong><span>{config.title}</span></div>
          <ChevronDown size={15} />
        </div>
        <nav>
          <p className="nav-label">Workspace</p>
          {config.primary.map(({ label, icon: Icon, badge }) => <button key={label} className={`nav-item ${selectedNav === label ? "active" : ""}`} onClick={() => onNavigate?.(label)}><Icon size={18} /><span>{label}</span>{badge && <b>{badge}</b>}</button>)}
          <p className="nav-label clinical-label">{role === "admin" ? "Administration" : role === "doctor" ? "Care delivery" : role === "receptionist" ? "Hospital desk" : "Laboratory"}</p>
          {config.secondary.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${selectedNav === label ? "active" : ""}`} onClick={() => onNavigate?.(label)}><Icon size={18} /><span>{label}</span></button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Settings2 size={18} /><span>Settings</span></button>
          <button className="profile-chip" onClick={onSignOut} title="Sign out"><div className="profile-avatar">{config.initials}</div><div><strong>{config.name}</strong><span>{config.title}</span></div><ChevronDown size={14} /></button>
        </div>
      </aside>
      {open && <button className="sidebar-overlay" onClick={() => setOpen(false)} aria-label="Close navigation" />}
      <section className="main-column">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
          <div className="crumbs"><span>Royal Care Hospital</span><i>/</i><strong>{selectedNav}</strong></div>
          <div className="topbar-actions"><div className="global-search"><Search size={17} /><input placeholder="Search patients, staff, records" /><kbd>⌘ K</kbd></div><button className="icon-button" aria-label="View activity"><Activity size={18} /><span className="notification-dot" /></button><div className="top-avatar">{config.initials}</div></div>
        </header>
        <main className="content">{children}</main>
      </section>
    </div>
  );
}
