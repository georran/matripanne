import type { Metadata } from "next";
import { Geist, Geist_Mono, Pinyon_Script, Rye } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-pinyon', 
});

const ryeScript = Rye({
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-rye', 
})

export const metadata: Metadata = {
  title: "Matripanne™",
  description: "Criado por JojaLabz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR">
      <body
        className={`${pinyonScript.variable} ${ryeScript.variable} ${geistSans.variable} ${geistMono.variable} font-sans font-antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
