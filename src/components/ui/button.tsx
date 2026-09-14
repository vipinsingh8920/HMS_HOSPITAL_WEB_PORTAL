import * as React from "react";

const variants = {
  default: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

export function Button({ className = "", variant = "default", type = "button", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
