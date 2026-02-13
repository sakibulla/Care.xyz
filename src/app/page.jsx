import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import HowItWorks from "@/components/home/HowItWorks";
import OurPromise from "@/components/home/OurPromise";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "Home - Professional Caregiving Services",
  description: "Hero Kidz offers professional caregiving services for babies, elderly, and sick family members. Book certified caregivers available 24/7.",
  openGraph: {
    title: "Hero Kidz - Professional Caregiving Services",
    description: "Trusted caregiving services for your loved ones. Book trained professionals today.",
    images: ["/assets/hero.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hero Kidz - Home",
    description: "Professional caregiving services for babies, elderly, and sick family members",
    url: "https://care-xyz.vercel.app",
    mainEntity: {
      "@type": "Service",
      serviceType: "Caregiving Services",
      provider: {
        "@type": "Organization",
        name: "Hero Kidz",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Caregiving Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Baby Care Services",
              description: "Professional baby sitting and child care services",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Elderly Care Services",
              description: "Compassionate care for seniors and elderly",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Medical Care Services",
              description: "Professional medical and sick care at home",
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-16 md:space-y-20 lg:space-y-24">
        <section aria-label="Hero Banner" className="-mt-4 md:-mt-8">
          <Banner />
        </section>

        <section aria-label="About Us">
          <About />
        </section>

        <section aria-label="Our Top Services">
          <Services />
        </section>

        <section aria-label="How It Works">
          <HowItWorks />
        </section>

        <section aria-label="Our Promise">
          <OurPromise />
        </section>

        <section aria-label="Testimonials">
          <Testimonials />
        </section>
      </div>
    </>
  );
}
