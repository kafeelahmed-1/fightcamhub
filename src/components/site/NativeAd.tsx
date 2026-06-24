import { useEffect } from "react";

const SCRIPT_HASH = "7d51d72e5c329b69928a15c5f0b41428";
const SCRIPT_URL = `https://pl29786100.effectivecpmnetwork.com/${SCRIPT_HASH}/invoke.js`;

interface NativeAdProps {
  containerId: string;
}

export function NativeAd({ containerId }: NativeAdProps) {
  useEffect(() => {
    // Load the external ad script once
    const existingScript = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    );
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div className="relative py-10">
      <div className="container-site">
        <div className="flex w-full flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
          <div id={containerId} className="min-h-[240px] w-full flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Loading premium ad...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
