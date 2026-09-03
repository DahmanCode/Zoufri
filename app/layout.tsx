import type { Metadata } from "next";
import { Inter, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import SiteNav from "./components/site-nav";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Zoufri — Find a roommate who actually fits your life",
  description: "Roommate matching across Morocco. Get matched on lifestyle, budget and habits — not just a photo.",
  openGraph: {
    title: "Zoufri — Find a roommate who actually fits your life",
    description: "Roommate matching across Morocco. Get matched on lifestyle, budget and habits — not just a photo.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${jakarta.variable} font-sans bg-[#E2DAC5] text-ink antialiased`}>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
