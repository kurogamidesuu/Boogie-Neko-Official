import { Fredoka, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { ReactNode } from "react";
import '@/app/globals.css';
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
} : Readonly<{
  children: ReactNode,
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jakarta.variable} ${fredoka.variable} antialiased`}>
        <main className="flex h-screen w-full">
          <div className="w-1/2 h-full flex flex-col items-center justify-between pb-5">
            {/* strip */}
            <div className="relative bg-gradient-to-b from-primary to-violet-700 h-100 w-80 z-0 rounded-b-full">
              {/* circle inside the strip */}
              <div className="relative left-10 -bottom-30 bg-background h-60 w-60 z-0 rounded-full ">
                <Image src='/logo.png' height={300} width={300} alt="Boogie Neko image" className='z-1' />
              </div>
            </div>
            <h1 className="text-5xl font-logo font-semibold">
              Welcome to <br />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-700 text-7xl">Boogie Neko</span>
            </h1>
            <div>
              Contact us at boogieneko@gmail.com
            </div>
          </div>
          <div className="w-1/2 h-full flex items-center justify-center">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  )
}