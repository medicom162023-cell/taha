import HeroSlider from "@/components/HeroSlider";
import AboutAndStats from "@/components/AboutAndStats";
import ProjectsSection from "@/components/ProjectsSection";
import CommunityImpact from "@/components/CommunityImpact";
import DonationBanner from "@/components/DonationBanner";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <HeroSlider />
      <AboutAndStats />
      <ProjectsSection />
      <CommunityImpact />
      <DonationBanner />
    </main>
  );
}
