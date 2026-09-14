import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold", {
  variants: {
    tone: {
      blue: "bg-[#e6eff5] text-[#356a87] ring-1 ring-[#cbdde7]",
      green: "bg-[#e4f4ed] text-[#2d7562] ring-1 ring-[#c6e5d8]",
      amber: "bg-[#f8edd9] text-[#9b6a31] ring-1 ring-[#eddbb8]",
      rose: "bg-[#f7e6e3] text-[#a55f5a] ring-1 ring-[#edcfca]",
      slate: "bg-[#edf2f1] text-[#5f747a] ring-1 ring-[#dce6e4]",
    },
  },
  defaultVariants: {
    tone: "slate",
  },
});

export function Badge({ children, tone, className }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>;
}
