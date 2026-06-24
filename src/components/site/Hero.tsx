import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Link2, Radio, ChevronDown } from "lucide-react";

interface HeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  browseTo: "/" | "/exclusive-videos";
  browseLabel: string;
  monetizationUrl?: string;
  liveButtonLabel?: string;
}

export function Hero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  browseTo,
  browseLabel,
  monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12",
  liveButtonLabel = "Live Fights",
}: HeroProps) {
  useEffect(() => {
    // Load external ad script
    const script = document.createElement("script");
    script.src = "https://consciousdunkvastly.com/8fcc7e9263c3c787815ab520ed8daf12/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          width={1600}
          height={1024}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
      </div>

      <div className="container-site relative pb-10 pt-16 sm:pt-20 lg:pt-28 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl text-center">
          <span className="section-eyebrow live-dot gap-2 justify-center inline-flex">{eyebrow}</span>
          <h1 className="mt-4 text-2xl font-bold uppercase leading-[1.05] sm:text-3xl lg:text-4xl">
            {title} <span className="text-gradient">{highlight}</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base mx-auto">{description}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={monetizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition hover:opacity-90 active:scale-95"
            >
              <Radio className="h-5 w-5" /> {liveButtonLabel}
            </a>
            <Link
              to={browseTo}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 py-3.5 text-base font-bold text-foreground backdrop-blur transition hover:border-primary active:scale-95"
            >
              {browseLabel} <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center gap-2 animate-bounce">
            <p className="text-xs text-muted-foreground">More Content Waiting</p>
            <ChevronDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Native ad unit */}
      <div className="relative pb-10">
        <div className="container-site">
          <div className="flex w-full flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <div id="container-8fcc7e9263c3c787815ab520ed8daf12" className="min-h-[240px] w-full flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Loading premium ad...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
