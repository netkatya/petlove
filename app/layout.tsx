import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import AuthHydrator from "@/components/Providers/AuthHydrator";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petlove-vert.vercel.app"),

  title: {
    default: "Petlove",
    template: "%s | Petlove",
  },

  description: "Find, adopt and love pets near you",

  openGraph: {
    title: "Petlove",
    description: "Find, adopt and love pets near you",
    url: "https://petlove-vert.vercel.app",
    siteName: "Petlove",
    images: [
      {
        url: "https://petlove-vert.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Petlove — find your perfect pet",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Petlove",
    description: "Find, adopt and love pets near you",
    images: ["https://petlove-vert.vercel.app/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <AuthHydrator />
        <Header />
        {children}
      </body>
    </html>
  );
}
