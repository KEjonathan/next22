import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  bg-blue-50`}>
        {children}
      </body>
    </html>
  );
}
