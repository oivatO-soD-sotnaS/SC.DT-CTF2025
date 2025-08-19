import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Silk from "@/components/Silk";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jibberish Super App",
  description: "Bla bla bla --- IGNORE ---",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden -z-10">
          <Silk
            speed={5}
            scale={1}
            color="#0f3039"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
