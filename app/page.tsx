import { Hero } from "@/components/home/Hero";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Metrics } from "@/components/home/Metrics";
import { IndustriesPreview } from "@/components/home/IndustriesPreview";
import { Clients } from "@/components/home/Clients";
import { GlobalPresence } from "@/components/home/GlobalPresence";
import { ContactTeaser } from "@/components/home/ContactTeaser";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/");

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <Metrics />
      <IndustriesPreview />
      <Clients />
      <GlobalPresence />
      <ContactTeaser />
    </>
  );
}
