import HeroSlider from "@/components/HeroSlider";
import AboutAndStats from "@/components/AboutAndStats";
import ProjectsSection from "@/components/ProjectsSection";
import CommunityImpact from "@/components/CommunityImpact";
import DonationBanner from "@/components/DonationBanner";
import LatestNews from "@/components/LatestNews";
import PartnersSection from "@/components/PartnersSection";
import AidRegistration from "@/components/AidRegistration";
import { HomepageContentProvider } from "@/components/HomepageContentProvider";

export default function HomePage() {
  return (
    <HomepageContentProvider><main className="w-full overflow-x-hidden bg-white">
      <HeroSlider />
      <AboutAndStats />
      <ProjectsSection />
      <CommunityImpact />
      <DonationBanner />
      <LatestNews />
      <PartnersSection />
      <AidRegistration />
    </main></HomepageContentProvider>
  );
}
