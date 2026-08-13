import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  title: "Maison Liora | Café de spécialité à Casablanca",
  description: "Maison Liora est un café premium à Casablanca : cafés de spécialité, brunch maison, pâtisseries artisanales et réservation de table.",
  keywords: ["Maison Liora", "café Casablanca", "coffee shop Casablanca", "brunch Casablanca", "café de spécialité"],
  openGraph: {
    title: "Maison Liora | Café de spécialité à Casablanca",
    description: "Un coffee shop chaleureux et élégant pour cafés de spécialité, brunchs et moments d'exception.",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
