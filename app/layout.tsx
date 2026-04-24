import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rupom Ehsan",
  alternateName: ["Abu Ahsan", "Md Abu Ahsan", "Md. Abu Ahsan"],
  url: "https://md-ahsan.netlify.app/",
  image: "https://md-ahsan.netlify.app/logo.png",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer from Bangladesh specializing in Laravel, PHP, React, Vue, and modern full-stack web development.",
  knowsAbout: [
    "Laravel",
    "PHP",
    "MySQL",
    "React",
    "Vue.js",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Full Stack Web Development",
    "Software Engineering",
  ],
  nationality: {
    "@type": "Country",
    name: "Bangladesh",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
  sameAs: ["https://github.com/Rupomehsan"],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className,
        )}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
