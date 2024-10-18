import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { geistMonoFont, geistSansFont, interFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Seam test",
  description: "IoT device layouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          interFont.className,
          geistSansFont.variable,
          geistMonoFont.variable,
          "antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
