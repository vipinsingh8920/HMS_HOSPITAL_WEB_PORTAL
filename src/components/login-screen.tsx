"use client";

import { FormEvent, useState } from "react";
import { Activity, CheckCircle2, LockKeyhole, LogIn, ShieldCheck } from "lucide-react";
import { roleOptions } from "@/lib/hms-data";
import type { UserRole } from "@/lib/hms-types";

export function LoginScreen({ onSignIn }: { onSignIn: (role: UserRole) => void }) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSignIn(selectedRole);
  }

  return <main className="login-page"><section className="login-story"><div className="login-brand"><div className="brand-mark"><Activity size={20} strokeWidth={2.5} /></div><div><strong>appziora</strong><span>HMS</span></div></div><div className="story-copy"><span className="story-kicker">Royal Care Hospital</span><h1>Every shift,<br /><em>in sync.</em></h1><p>One calm workspace for every team caring for every patient.</p></div><div className="story-status"><span className="status-pulse" /><span>All systems ready</span><span className="story-divider" /><span>Sep 12, 2026</span></div></section><section className="login-panel"><div className="login-card"><div className="login-heading"><span className="eyebrow"><LockKeyhole size={12} /> Secure workspace</span><h2>Welcome back</h2><p>Choose your workspace to continue to Royal Care.</p></div><div className="role-grid">{roleOptions.map(({ id, label, description, icon: Icon }) => <button type="button" key={id} className={`role-card ${selectedRole === id ? "selected" : ""}`} onClick={() => setSelectedRole(id)}><span className="role-icon"><Icon size={19} /></span><span><strong>{label}</strong><small>{description}</small></span><span className="role-check">{selectedRole === id && <CheckCircle2 size={17} />}</span></button>)}</div><form className="login-form" onSubmit={handleSubmit}><label>Work email<input type="email" placeholder="you@royalcare.in" defaultValue="asha.sharma@royalcare.in" required /></label><label>Password<div className="password-field"><input type="password" placeholder="Enter your password" defaultValue="royalcare" required /><LockKeyhole size={15} /></div></label><div className="form-options"><label className="remember"><input type="checkbox" defaultChecked /> Remember this device</label><button type="button" className="link-button">Forgot password?</button></div><button className="login-button" type="submit">Open {roleOptions.find((item) => item.id === selectedRole)?.label} workspace <LogIn size={16} /></button></form><p className="login-footnote"><ShieldCheck size={14} /> Your workspace is protected with hospital-grade access controls.</p></div></section></main>;
}
