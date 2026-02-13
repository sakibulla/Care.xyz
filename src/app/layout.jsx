import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
});

export const metadata = {
  metadataBase: new URL("https://care-xyz.vercel.app"),

  title: {
    default: "Hero Kidz | Professional Caregiving Services - Baby, Elderly & Medical Care",
    template: "%s | Hero Kidz",
  },

  description:
    "Hero Kidz provides trusted, professional caregiving services for babies, elderly, and sick family members. Book certified caregivers for hourly or daily care. Available 24/7 with trained professionals.",

  applicationName: "Hero Kidz",

  keywords: [
    "baby sitting service",
    "elderly care",
    "sick care",
    "professional caregiver",
    "home care services",
    "babysitter booking",
    "elderly companion",
    "patient care",
    "caregiving platform",
    "nanny services",
    "senior care",
    "medical care at home",
    "certified caregivers",
    "24/7 care services",
    "home healthcare",
    "child care services",
    "nursing care",
    "respite care",
  ],

  authors: [{ name: "Hero Kidz Team", url: "https://care-xyz.vercel.app" }],
  creator: "Hero Kidz",
  publisher: "Hero Kidz",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://care-xyz.vercel.app",
    siteName: "Hero Kidz",
    title: "Hero Kidz | Professional Caregiving Services",
    description:
      "Trusted caregiving services for your loved ones. Book trained professionals for baby care, elderly care, and medical care. Available 24/7.",
    images: [
      {
        url: "/assets/hero.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz - Professional Caregiving Services",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz | Professional Caregiving Services",
    description:
      "Trusted caregiving services for babies, elderly, and sick family members. Book certified professionals today.",
    images: ["/assets/hero.png"],
    creator: "@herokidz",
  },

  alternates: {
    canonical: "https://care-xyz.vercel.app",
  },

  category: "healthcare",
  
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Hero Kidz",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hero Kidz",
    description: "Professional caregiving services for babies, elderly, and sick family members",
    url: "https://care-xyz.vercel.app",
    logo: "https://care-xyz.vercel.app/assets/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX",
      contactType: "Customer Service",
      availableLanguage: ["English"],
      areaServed: "US",
    },
    sameAs: [
      "https://facebook.com/herokidz",
      "https://twitter.com/herokidz",
      "https://instagram.com/herokidz",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "15",
      highPrice: "50",
      offerCount: "10",
    },
  };

  return (
    <NextAuthProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <meta name="theme-color" content="#3b82f6" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className={`${poppins.className} antialiased bg-gradient-to-br from-slate-50 via-white to-gray-50`}>
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:w-11/12 mx-auto py-2">
              <Navbar />
            </div>
          </header>
          
          <main className="w-full px-4 sm:px-6 lg:px-8 xl:w-11/12 mx-auto py-4 md:py-8 min-h-[calc(100vh-302px)] mt-20">
            {children}
          </main>

          <footer className="mt-auto">
            <Footer />
          </footer>
        </body>
      </html>
    </NextAuthProvider>
  );
}
