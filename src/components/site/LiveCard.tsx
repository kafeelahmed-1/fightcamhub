import { useRef, useState } from "react";
import { Volume2, VolumeX, MessageCircle, Bookmark, Heart, Repeat, Send } from "lucide-react";
import type { VideoItem } from "@/lib/videos";

interface FloatingHeart {
  id: number;
  left: number;
  scale: number;
  duration: number;
  delay: number;
}

export function LiveCard({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [saved, setSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const triggerHeartsBurst = () => {
    // Generate an organic burst stream of 5-8 hearts mimicking FB Live
    const burstCount = Math.floor(Math.random() * 4) + 5;
    const newHearts: FloatingHeart[] = [];

    for (let i = 0; i < burstCount; i++) {
      newHearts.push({
        id: Date.now() + Math.random() + i,
        // Floats up near the right side where the interaction happens
        left: 78 + (Math.random() * 14 - 7), 
        scale: 0.7 + Math.random() * 0.5,
        duration: 2.2 + Math.random() * 0.8, 
        delay: i * 0.12 
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 3500);
  };

  const handleLikeClick = () => {
    if (!isLiked) {
      triggerHeartsBurst();
    }
    setIsLiked(!isLiked);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card w-full max-w-[400px] h-[520px] sm:h-[590px] transition hover:shadow-glow hover:-translate-y-1">
      
      {/* Tall Media Feed Container */}
      <div className="relative w-full h-[440px] sm:h-[500px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={video.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Live status element */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-live px-3 py-1 text-xs font-bold uppercase tracking-wide text-destructive-foreground">
          <span className="live-dot" /> Live
        </div>

        {/* Viewers layer */}
        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {video.views} watching
        </div>

        {/* Mute controller toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-primary z-10"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Facebook Live-Style Vertical Swaying Hearts Layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute bottom-4 text-2xl animate-fb-live-heart drop-shadow-md user-select-none"
              style={{
                left: `${heart.left}%`,
                transform: `scale(${heart.scale})`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
                opacity: 0
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Action Bar Matched Perfectly to image_e8c29b.png */}
      <div className="px-4 h-[80px] sm:h-[90px] flex items-center justify-between bg-card">
        {/* Left Side Icons Bundle */}
        <div className="flex items-center gap-5">
          <button 
            type="button" 
            onClick={handleLikeClick}
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <Heart className={`h-6 w-6 transition-colors ${isLiked ? "fill-destructive text-destructive" : ""}`} />
          </button>
          
          <button 
            type="button" 
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <MessageCircle className="h-6 w-6" />
          </button>

          <button 
            type="button" 
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <Repeat className="h-5 w-5" />
          </button>

          <button 
            type="button" 
            className="transition hover:scale-110 active:scale-90 text-foreground -rotate-12"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Right Side Standalone Bookmark Icon */}
        <button 
          type="button" 
          onClick={() => setSaved(!saved)}
          className="transition hover:scale-110 active:scale-90 text-foreground"
        >
          <Bookmark className={`h-6 w-6 transition-colors ${saved ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>

    </div>
  );
}