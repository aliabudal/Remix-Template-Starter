import { Faq } from "@/components/faq";
import { AvailablePlans } from "@/components/plans";
import { HowItWorks } from "@/components/how-it-works";
import { UsedByClients } from "@/components/used-by-clients";
import { HeroSection } from "@/components/hero-section/hero-section";
import { Sponsors } from "@/components/sponsors";

export default function Home() {
	return (
		<>
			<HeroSection />
			<HowItWorks />
			<UsedByClients />
			<Sponsors />
			<AvailablePlans />
			<Faq />
		</>
	);
}
