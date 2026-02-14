import type { Metadata } from "next";
import { Geist, Geist_Mono, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pokemonFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pokemon",
});

export const metadata: Metadata = {
  title: "Pokédex Next",
  description: "Una Pokédex moderna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pokemonFont.variable} antialiased min-h-screen relative`}
      >
        {/* --- CAPA DE FONDO (Aurora) --- */}
        {/* Usamos 'fixed inset-0' para que ocupe toda la pantalla */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            
            {/* 1. Color base (Gris muy claro) */}
            <div className="absolute inset-0 bg-slate-50"></div>

            {/* 2. Mancha Azul (Arriba Izquierda) */}
            <div className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse"></div>

            {/* 3. Mancha Morada (Abajo Derecha) */}
            <div className="absolute top-[20%] right-[0px] w-[400px] h-[400px] bg-purple-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse delay-75"></div>

            {/* 4. Mancha Amarilla/Rosa (Centro Abajo) */}
            <div className="absolute -bottom-[100px] left-[20%] w-[600px] h-[600px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse delay-150"></div>
        </div>

        {/* --- CAPA DE CONTENIDO --- */}
        {/* 'relative' para que se ponga ENCIMA del fondo fijo */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}