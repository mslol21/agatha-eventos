import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutExperience } from "@/components/sections/AboutExperience";
import { Services } from "@/components/sections/Services";
import { EventTypes } from "@/components/sections/EventTypes";
import { CorporateEvents } from "@/components/sections/CorporateEvents";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutExperience />
      <Services />
      <EventTypes />
      <CorporateEvents />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <ServiceArea />
      <QuoteForm />
      <FinalCTA />
    </>
  );
}
