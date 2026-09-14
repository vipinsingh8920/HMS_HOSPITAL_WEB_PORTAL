import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veya | Hospital Operations",
  description: "A calm, connected workspace for modern hospital teams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
