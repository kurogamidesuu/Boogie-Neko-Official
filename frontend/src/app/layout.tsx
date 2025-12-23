import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: "Boogie Neko Store",
    template: "%s | Boogie Neko Store",
  },
  description: "The purr-fect place for premium goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <main className="flex-1">
          <header className="flex flex-row gap-5 items-center p-5">
            <h1 className="text-5xl font-bold">Boogie Neko</h1>
            <Image src={'/boogie.jpg'} height={20} width={50} alt="boogie" />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
