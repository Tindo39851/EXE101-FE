import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { HeroStat, InfoCard, MetricGrid } from "@/components/shared/ui-atoms";
import { money } from "@/lib/data/constants";
import { useAppState } from "@/hooks/use-app-state";

export function OverviewView() {
  const { state, setView, revenue, premiumUsers, matches } = useAppState();

  return (
    <section className="grid gap-6">
      <div className="relative grid min-h-[calc(100vh-96px)] place-items-center border-b border-cyan-300/20 text-center">
        <div className="grid justify-items-center gap-9">
          <p className="text-xs uppercase tracking-[.36em] text-cyan-300">Next generation gaming asset ecosystem</p>
          <h1 className="tech-title text-[clamp(72px,13vw,156px)] font-medium leading-[.74]">GAME<br />TRUST</h1>
          <div className="flex w-[min(820px,100%)] justify-center gap-8 max-md:flex-col">
            <Button size="lg" className="w-96 max-md:w-full" onClick={() => setView("market")}>
              Enter Marketplace <ChevronRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-96 max-md:w-full" onClick={() => setView("matching")}>
              Join Tournament
            </Button>
          </div>
          <div className="flex justify-center gap-10 text-center">
            <HeroStat value={`${state.users.length}K`} label="Users" />
            <HeroStat value={money.format(revenue)} label="Escrow vol" />
            <HeroStat value={`${premiumUsers}`} label="Premium" />
          </div>
        </div>
        <div className="absolute bottom-3 flex w-full justify-around overflow-hidden text-[9px] uppercase tracking-[.18em] text-cyan-300">
          <span>Verified brokers: 347</span><span>Active trades: 1,203</span><span>Disputes resolved: 8,441</span><span>Fraud rate: 0.083%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <InfoCard code="Section_01 // MVP logic" title="Business Loop">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[.14em] text-cyan-300">
            {["Create gamer profile", "Post content", "Find team", "Buy premium / ads", "Admin tracks revenue"].map((item, index) => (
              <span key={item} className="border border-cyan-300/25 bg-cyan-300/5 px-3 py-2">{index ? "> " : ""}{item}</span>
            ))}
          </div>
        </InfoCard>
        <InfoCard code="Section_02 // scoring rubric" title="Prototype Proof">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
            <li>Role login changes user persona and buying rights.</li>
            <li>Profile updates recalculate Trust Score.</li>
            <li>Feed interactions increase platform engagement.</li>
            <li>Checkout creates transaction records and revenue.</li>
            <li>Admin dashboard is computed from live app state.</li>
          </ul>
        </InfoCard>
      </div>
      <MetricGrid metrics={[
        [state.posts.length, "Feed posts"],
        [matches.length, "Team matches"],
        [state.posts.filter((post) => post.sponsored).length + state.sponsors.length, "Ads / pinned"],
        [state.transactions.length, "Transactions"],
      ]} />
    </section>
  );
}
export default OverviewView;
