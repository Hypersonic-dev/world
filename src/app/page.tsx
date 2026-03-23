import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServicesOverview from "@/components/ServicesOverview";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}

