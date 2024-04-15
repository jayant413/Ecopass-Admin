import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { ClientCookiesProvider } from "@/provider/cookieProvider";

import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/provider/modalProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-copass Admin Dashboard",
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
          <TooltipProvider>
            <ModalProvider />
            {children}
          </TooltipProvider>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
