import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Veya | Hospital Operations",
    template: "%s | Veya",
  },
  description: "A calm, connected workspace for modern hospital teams.",
  metadataBase: new URL("https://example.com"),
  applicationName: "Veya",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7fbfa,_#edf5f3_38%,_#f1f4f5_100%)] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
