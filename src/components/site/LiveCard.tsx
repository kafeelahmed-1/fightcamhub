import { useRef, useState } from "react";
import { ExternalLink, Volume2, VolumeX, MessageCircle, Bookmark } from "lucide-react";
import type { VideoItem } from "@/lib/videos";

const REACTIONS = ["❤️", "🔥", "😮", "👊", "😂"] as const;

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number;
}

export function LiveCard({ video, monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12" }: { video: VideoItem; monetizationUrl?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [floats, setFloats] = useState<FloatingReaction[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>(video.reactions ?? {});
  const [saved, setSaved] = useState(false);

  const react = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = 10 + Math.random() * 70;
    setFloats((f) => [...f, { id, emoji, left }]);
    setCounts((c) => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }));
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 1600);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleCardClick = () => {
    window.open(monetizationUrl, "_blank");
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card h-[500px] sm:h-[600px] cursor-pointer transition hover:shadow-glow hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={video.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Live badge */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-live px-3 py-1 text-xs font-bold uppercase tracking-wide text-destructive-foreground">
          <span className="live-dot" /> Live
        </div>

        {/* Fire effect with hot count */}
        {counts["🔥"] && (
          <div className="absolute left-3 top-14 flex items-center gap-1.5 rounded-full bg-orange-600/80 px-3 py-1.5 text-sm font-bold text-white backdrop-blur">
            <span className="text-lg animate-bounce">🔥</span>
            <span>{(counts["🔥"] / 1000).toFixed(1)}K</span>
          </div>
        )}

        {/* viewers */}
        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {video.views} watching
        </div>

        {/* mute toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-primary"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* floating reactions */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {floats.map((f) => (
            <span
              key={f.id}
              className="reaction-float absolute bottom-12 text-2xl"
              style={{ left: `${f.left}%` }}
            >
              {f.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4" onClick={handleCardClick}>
        <span className="section-eyebrow text-muted-foreground">{video.tag}</span>
        <h3 className="mt-1 line-clamp-1 text-base font-bold">{video.title}</h3>
        <p className="text-xs text-muted-foreground">{video.channel}</p>
      </div>

      <div className="px-4 pb-4 flex flex-col gap-3">
        {/* reaction bar at bottom */}
        <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                react(emoji);
              }}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-sm transition hover:scale-110 hover:border-primary active:scale-95 cursor-pointer"
            >
              <span>{emoji}</span>
              {counts[emoji] ? (
                <span className="text-xs font-semibold text-muted-foreground">{counts[emoji]}</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* direct link under reactions */}
        <a
          href={monetizationUrl}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline w-fit"
        >
          Direct link <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
