import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VALORANT Tracker — Player Overview",
  description: "A VALORANT-inspired player profile and match analytics dashboard. Demo data is clearly labeled.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
