import type { Metadata } from "next";
import { Inter, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import SiteNav from "./components/site-nav";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

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
      <body className={`${inter.variable} ${fraunces.variable} ${jakarta.variable} font-sans bg-paper text-ink antialiased`}>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
