import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { LiveCard } from "./LiveCard";
import { VideoCard } from "./VideoCard";
import { AdPlaceholder } from "./AdPlaceholder";
import { AdLeaderboard } from "./AdLeaderboard";
import { SectionHeading } from "./SectionHeading";
import type { VideoItem } from "@/lib/videos";

interface FightPageProps {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    image: string;
    browseTo: "/" | "/exclusive-videos";
    browseLabel: string;
  };
  live: VideoItem[];
  trending: VideoItem[];
  trendingHeading: { eyebrow: string; title: string; description: string };
  monetizationUrl?: string;
  adKey?: string;
  adScriptSrc?: string;
}

const DEFAULT_MONETIZATION_URL = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12";
const DEFAULT_AD_KEY = "591e31908d117513a5daf867dcb90455";
const DEFAULT_AD_SCRIPT = "https://consciousdunkvastly.com/591e31908d117513a5daf867dcb90455/invoke.js";

export function FightPage({ 
  hero, 
  live, 
  trending, 
  trendingHeading, 
  monetizationUrl = DEFAULT_MONETIZATION_URL,
  adKey = DEFAULT_AD_KEY,
  adScriptSrc = DEFAULT_AD_SCRIPT
}: FightPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero {...hero} monetizationUrl={monetizationUrl} />

        {/* LIVE SECTION */}
        <section id="live" className="container-site scroll-mt-20 py-12 sm:py-16">
          <SectionHeading
            eyebrow="On Air Now"
            title="Live Fights"
            description="Multiple cage cams streaming right now. React in real time as the action unfolds."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {live.map((v) => (
              <LiveCard key={v.id} video={v} monetizationUrl={monetizationUrl} />
            ))}
          </div>
        </section>

        {/* Ad after Live */}
        <AdLeaderboard containerId="at-ad-leaderboard-1" adKey={adKey} scriptSrc={adScriptSrc} />

        {/* TRENDING SECTION */}
        <section className="container-site py-12 sm:py-16">
          <SectionHeading {...trendingHeading} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((v) => (
              <VideoCard key={v.id} video={v} monetizationUrl={monetizationUrl} />
            ))}
          </div>
        </section>

        {/* Ad after Videos */}
        <AdLeaderboard containerId="at-ad-leaderboard-2" adKey={adKey} scriptSrc={adScriptSrc} />
      </main>

      <Footer />
    </div>
  );
}
