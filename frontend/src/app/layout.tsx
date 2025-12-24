import type { Metadata } from "next";
import { Fredoka, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
export const metadata: Metadata = {
  title: {
    default: "Boogie Neko Store",
    template: "%s | Boogie Neko Store",
  },
  description: "The purr-fect place for premium handmade accessories.",
  robots: {
    index: true,
  },
  applicationName: "Boogie Neko",
  authors: [{name: "Hempushp Chauhan", url: "https://github.com/kurogamidesuu/Boogie-Neko-Official"}],
  keywords: ['boogie', 'boogieneko', 'ecommerce', 'jewellery', 'accessories', 'hand-made', 'necklaces', 'chains', 'bracelets'],
  openGraph: {
    title: 'Boogie Neko',
    description: 'The purr-fect place for premium handmade accessories.',
    url: '',
    siteName: 'Boogie Neko',
    locale: 'en_US',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    title: "Boogie Neko",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${jakarta.variable} ${fredoka.variable} antialiased font-sans`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
