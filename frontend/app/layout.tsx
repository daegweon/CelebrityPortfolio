import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CelebrityPortfolio - Invest Like the 1%",
  description: "Track portfolios of high-profile investors and politicians in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
