import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Token Price Oracle",
  description: "Get interpolated or real-time token prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white dark:bg-black text-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
