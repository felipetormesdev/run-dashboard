import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Run Dashboard",
  description: "Dashboard interativo para corredores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-green-600 text-white p-4">
          <nav className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Run Dashboard</h1>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
