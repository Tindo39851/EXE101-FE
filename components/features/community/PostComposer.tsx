import React from "react";
import { Button } from "@/components/ui/button";

interface PostComposerProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export function PostComposer({ value, onChange, onSend }: PostComposerProps) {
  return (
    <div className="bg-slate-950/90 border border-cyan-400/20 flex flex-col justify-start items-start w-full font-mono select-none hover:shadow-[0_0_15px_rgba(0,246,255,0.05)] transition-all duration-300">
      <div className="w-full bg-fuchsia-500/10 border-b border-fuchsia-500/20 py-2.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_6px_#ff00df] animate-ping" />
          <span className="text-fuchsia-500 text-[10px] font-black tracking-widest uppercase">
            BROADCAST NODE TERMINAL
          </span>
        </div>
      </div>

      <div className="p-4 w-full flex flex-col gap-3">
        <textarea
          placeholder="Inject network update, security advisory, or trade broadcast..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-900 border border-fuchsia-500/30 text-slate-200 p-3 text-xs focus:outline-none focus:border-fuchsia-500 min-h-24 resize-none placeholder-slate-650 font-sans leading-5"
        />
        <Button
          variant="magenta"
          onClick={onSend}
          className="w-full text-[10px] font-black tracking-widest shadow-magenta"
        >
          BROADCAST DATA
        </Button>
      </div>
    </div>
  );
}
