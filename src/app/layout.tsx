import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zayura Exclusive - Kost Putri Eksklusif Malang dekat UB & UIN",
  description: "Zayura Exclusive: Kos putri eksklusif di Malang dekat UB & UIN. Fasilitas hotel, AC, WiFi 400Mbps, aman & nyaman. Booking sekarang!",
  keywords: ["kos putri malang", "kos eksklusif malang", "kos dekat ub", "kos dekat uin malang", "zayura exclusive"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "name": "Zayura Exclusive Kost Putri",
    "description": "Kost putri eksklusif dan premium di Gajayana, Malang dekat UB & UIN.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Gajayana No. 123",
      "addressLocality": "Malang",
      "addressRegion": "Jawa Timur",
      "postalCode": "65144",
      "addressCountry": "ID"
    },
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop",
    "priceRange": "$$",
    "audience": {
      "@type": "Audience",
      "audienceType": "Female Students"
    }
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
