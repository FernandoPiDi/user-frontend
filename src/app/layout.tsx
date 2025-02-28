"use client";

import "./globals.css";
import { Navbar } from "../stories/Navbar/Navbar";
import { Usuarios } from "../stories/Usuarios/Usuarios";
import { UserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top" className="font-sans theme-transition">
        <ThemeProvider>
          <UserProvider>
            <Navbar brandName="Usuarios" showSearch={true} />
            <main>
              <Usuarios />
              {children}
            </main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
