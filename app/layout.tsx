import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Next.js + Supabase",
  description: "Next.js app wired up with Tailwind CSS and Supabase auth/database.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-paper text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
