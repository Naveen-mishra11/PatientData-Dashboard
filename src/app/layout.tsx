import type { Metadata } from "next";
import "./globals.css";

import { Manrope } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
})

export const metadata: Metadata = {
  title: "Patient Dashboard",
  description: "It is patient dashboard where the patient data displayed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
