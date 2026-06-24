import { useRef, useState } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import type { VideoItem } from "@/lib/videos";

const REACTIONS = ["❤️", "🔥", "😮", "👊", "😂"] as const;

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number;
}

export function VideoCard({ video, monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12" }: { video: VideoItem; monetizationUrl?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [floats, setFloats] = useState<FloatingReaction[]>([]);

  const react = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = 10 + Math.random() * 70;
    setFloats((f) => [...f, { id, emoji, left }]);
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 1600);
  };

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    el.requestFullscreen?.();
    setStarted(true);
    el.play();
    setPlaying(true);
  };

  const pause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  const watchFull = () => {
    window.open(monetizationUrl, "_blank");
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-video overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={video.src}
          loop
          playsInline
          preload="metadata"
          muted
          onEnded={() => setPlaying(false)}
        />

        {/* Premium ribbon */}
        <div className="absolute left-3 top-3 rounded-md bg-gradient-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
          Premium
        </div>
        <div className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
          {video.duration}
        </div>

        {/* Big center play overlay */}
        {!started ? (
          <button
            type="button"
            onClick={play}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 grid place-items-center bg-black/30 transition group-hover:bg-black/40"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6" />
            </span>
          </button>
        ) : null}

        {/* floating reactions */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
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

      <div className="flex flex-1 flex-col p-4">
        <span className="section-eyebrow text-muted-foreground">{video.tag}</span>
        <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug">{video.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {video.channel} · {video.views} views
        </p>

        <div className="mt-4 flex items-center gap-2">
          {playing ? (
            <button
              type="button"
              onClick={pause}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-semibold transition hover:border-primary"
            >
              <Pause className="h-4 w-4" /> Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-semibold transition hover:border-primary"
            >
              <Play className="h-4 w-4" /> Play
            </button>
          )}

          <button
            type="button"
            onClick={watchFull}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            <Maximize2 className="h-4 w-4" /> Watch full clip
          </button>
        </div>

        {/* reaction buttons */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => react(emoji)}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-1 text-sm transition hover:scale-110 hover:border-primary active:scale-95"
            >
              <span>{emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
