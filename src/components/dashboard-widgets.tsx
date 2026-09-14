import { ArrowUpRight, CalendarDays, ChevronRight, Plus, Search } from "lucide-react";

type WorkspaceHeaderProps = { eyebrow: string; title: string; copy: string; action?: string; actionIcon?: React.ElementType; onAction?: () => void };

export function WorkspaceHeader({ eyebrow, title, copy, action, actionIcon: ActionIcon = Plus, onAction }: WorkspaceHeaderProps) {
  return <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" />{eyebrow}</div><h1>{title}</h1><p>{copy}</p></div><div className="heading-actions"><button className="button secondary"><CalendarDays size={16} /> Sep 12, 2026</button>{action && <button className="button primary" onClick={onAction}><ActionIcon size={17} /> {action}</button>}</div></div>;
}

export function MetricStrip({ items }: { items: { label: string; value: string; detail: string; icon: React.ElementType; tone: string }[] }) {
  return <section className="metric-grid">{items.map(({ label, value, detail, icon: Icon, tone }) => <div className="metric-card" key={label}><div className={`metric-icon ${tone}`}><Icon size={19} /></div><span className="metric-label">{label}</span><div className="metric-value">{value}</div><div className="metric-change"><b>{detail}</b></div></div>)}</section>;
}

export function DataPanel({ title, kicker, action, className = "", children }: { title: string; kicker: string; action?: string; className?: string; children: React.ReactNode }) {
  return <section className={`panel workspace-panel ${className}`}><div className="panel-heading"><div><span className="panel-kicker">{kicker}</span><h2>{title}</h2></div>{action && <button className="text-button">{action} <ArrowUpRight size={15} /></button>}</div><div className="panel-content">{children}</div></section>;
}

export function Bar({ label, value, width, tone }: { label: string; value: string; width: string; tone: string }) {
  return <div className="bar-row"><div><span>{label}</span><b>{value}</b></div><div className="bar-track"><span className={`bar-fill ${tone}`} style={{ width }} /></div></div>;
}

export function QueueItem({ icon: Icon, tone, title, detail }: { icon: React.ElementType; tone: string; title: string; detail: string }) {
  return <div className="queue-item"><span className={`queue-icon ${tone}`}><Icon size={16} /></span><div><strong>{title}</strong><span>{detail}</span></div><ChevronRight size={16} /></div>;
}

export function ScheduleRow({ time, name, detail, tone }: { time: string; name: string; detail: string; tone: string }) {
  return <div className="schedule-row"><time>{time}</time><span className={`schedule-dot ${tone}`} /><div><strong>{name}</strong><span>{detail}</span></div><ChevronRight size={16} /></div>;
}

export function QuickAction({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return <button className="quick-action"><span><Icon size={18} /></span><strong>{label}</strong><ChevronRight size={15} /></button>;
}

export function ActivityTable({ title, rows }: { title: string; rows: string[] }) {
  return <section className="panel activity-table"><div className="panel-heading"><div><span className="panel-kicker">Latest updates</span><h2>{title}</h2></div><button className="icon-button light" aria-label="Search activity"><Search size={16} /></button></div><div>{rows.map((row, index) => <div className="activity-table-row" key={row}><span className={`activity-marker ${["blue", "mint", "amber", "rose"][index]}`} /><span>{row}</span><time>{["2 min ago", "18 min ago", "34 min ago", "1 hr ago"][index]}</time></div>)}</div></section>;
}
