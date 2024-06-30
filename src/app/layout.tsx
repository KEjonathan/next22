import type { Metadata } from "next";
import "./globals.css";
import HeaderLinks from "@/UI/home/header-nav";
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { inter } from "@/UI/fonts/fonts";
import SRLogo from "@/UI/logo/SRLogo";

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

        <header className="flex shadow-md p-4">
          <div className="flex items-center">
            <div className="ml-16 md:block hidden"><SRLogo /></div>
          </div>
          <div className="flex-grow flex justify-end items-end py-4 px-12">
            <nav className="mr-8">
              <ul className="flex space-x-4">
                <HeaderLinks />
              </ul>
            </nav>
            <div className="mr-8">
              <button className="bg-black text-white py-2 px-4 rounded">Log in</button>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
