import "./globals.css";
import type { Metadata } from "next";

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
          <h1 className="text-xl font-bold">Run Dashboard</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
