import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Provider from "@/components/provider/toast/Provider";

// import { LOGO } from "@/constant/app.constant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phường Bến Thành",
  description: "Phường Bến Thành",
  icons: {
    // icon: "",
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Provider>{children}</Provider>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.css"
          rel="stylesheet"
        />

        {/* Google Login Script */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
        <script src="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
