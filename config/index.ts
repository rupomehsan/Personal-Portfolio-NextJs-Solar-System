import type { Metadata } from "next";

const BASE_URL = "https://rupomehsan.netlify.app";

export const siteConfig: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rupom Ehsan | Software Engineer Bangladesh | Laravel PHP Developer",
    template: "%s | Rupom Ehsan",
  },
  description:
    "Rupom Ehsan (Abu Ahsan) — Software Engineer from Bangladesh specializing in Laravel, PHP, React, and modern web development. View my portfolio of full-stack projects.",
  keywords: [
    "Rupom Ehsan",
    "Abu Ahsan",
    "Md Abu Ahsan",
    "software engineer Bangladesh",
    "Laravel PHP developer",
    "Laravel developer Bangladesh",
    "PHP developer Bangladesh",
    "full stack developer Bangladesh",
    "web developer Bangladesh",
    "React developer Bangladesh",
    "software engineer portfolio",
    "modern portfolio site",
    "full stack developer portfolio",
    "Next.js developer",
    "Vue developer",
    "MySQL developer",
    "software engineer modern portfolio",
    "Bangladesh developer",
    "Rupom Ehsan portfolio",
    "Abu Ahsan portfolio",
    "rupomehsan",
    "portfolio",
    "reactjs",
    "nextjs",
    "laravel",
    "php",
    "mysql",
    "react",
    "typescript",
    "javascript",
    "tailwindcss",
    "fullstack",
    "3d-portfolio",
  ] as Array<string>,
  authors: [
    {
      name: "Rupom Ehsan",
      url: BASE_URL,
    },
  ],
  creator: "Rupom Ehsan",
  publisher: "Rupom Ehsan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Rupom Ehsan Portfolio",
    title: "Rupom Ehsan | Software Engineer Bangladesh | Laravel PHP Developer",
    description:
      "Rupom Ehsan (Abu Ahsan) — Software Engineer from Bangladesh specializing in Laravel, PHP, React, and modern web development.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Rupom Ehsan — Software Engineer Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rupom Ehsan | Software Engineer Bangladesh | Laravel PHP Developer",
    description:
      "Rupom Ehsan (Abu Ahsan) — Software Engineer from Bangladesh specializing in Laravel, PHP, React, and modern web development.",
    images: ["/logo.png"],
    creator: "@rupomehsan",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
} as const;
