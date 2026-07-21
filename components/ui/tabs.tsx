import * as React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  count?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "cyan" | "fuchsia" | "yellow";
}

export function Tabs({ tabs, activeTab, onChange, className, variant = "cyan" }: TabsProps) {
  const styles = {
    cyan: {
      active: "bg-cyan-400/10 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(0,246,255,0.2)]",
      inactive: "text-slate-500 hover:text-slate-300 border-white/5",
    },
    fuchsia: {
      active: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500 shadow-[0_0_10px_rgba(255,0,223,0.2)]",
      inactive: "text-slate-500 hover:text-slate-300 border-white/5",
    },
    yellow: {
      active: "bg-yellow-400/10 text-yellow-400 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.2)]",
      inactive: "text-slate-500 hover:text-slate-300 border-white/5",
    },
  };

  return (
    <div className={cn("flex flex-wrap items-center font-mono select-none", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const currentStyle = styles[variant];

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-5 py-2.5 border-b-2 text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer bg-transparent",
              isActive ? currentStyle.active : currentStyle.inactive
            )}
          >
            <span className="flex items-center gap-1.5">
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn(
                  "px-1 text-[8px] bg-slate-900 border rounded-sm",
                  isActive ? "border-current text-current" : "border-slate-800 text-slate-650"
                )}>
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
