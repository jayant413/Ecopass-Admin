import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { ClientCookiesProvider } from "@/provider/cookieProvider";

import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/provider/modalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-copass Admin",
  description: "Admin Portal to register Conductor and Passengers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ClientCookiesProvider value={cookies().getAll()}>
          <ModalProvider />
          {children}
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
