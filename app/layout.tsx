import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Países do mundo",
  description: "Desafio lançado pela codante.io",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Header/>
    {children}
    </body>
    </html>
  );
}
