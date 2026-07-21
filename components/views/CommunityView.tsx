import React from "react";
import { Search } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { PostCard } from "@/components/features/community/PostCard";
import { PostComposer } from "@/components/features/community/PostComposer";

export function CommunityView() {
  const {
    setView,
    state,
    communityTypeFilter,
    setCommunityTypeFilter,
    communitySortOrder,
    setCommunitySortOrder,
    communitySearchQuery,
    setCommunitySearchQuery,
    filteredPosts,
    likePost,
    updateState,
    currentUser,
    notify,
    broadcastDraft,
    setBroadcastDraft,
    publishBroadcast,
  } = useAppState();

  const typeTabs = [
    { id: "ALL", label: "ALL" },
    { id: "TRADE", label: "TRADE" },
    { id: "TOURNAMENT", label: "TOUR" },
    { id: "ALERT", label: "ALERT" },
    { id: "LISTING", label: "LISTING" },
    { id: "RECRUIT", label: "RECRUIT" },
    { id: "ACHIEVEMENT", label: "ACHIEVE" },
  ];

  const sortTabs = [
    { id: "RECENT", label: "RECENT" },
    { id: "TOP", label: "TOP RATED" },
  ];

  return (
    <section className="flex flex-col bg-black p-0 w-full select-none font-mono">
      {/* Page Header */}
      <PageHeader
        code="COMM_00 // DECENTRALIZED DATA COMMUNICATOR"
        title="Social Feed"
        subtitle="Advisories, trade signals, tournament summaries, and guild announcements"
        backText="BACK TO HOME"
        onBack={() => setView("overview")}
        action={
          <div className="flex flex-col gap-2.5 items-end justify-end">
            <Tabs
              tabs={typeTabs}
              activeTab={communityTypeFilter}
              onChange={setCommunityTypeFilter}
              variant="cyan"
              className="border-none p-0 scale-90 origin-right"
            />
            <div className="flex items-center gap-3 mt-1 select-none">
              <Tabs
                tabs={sortTabs}
                activeTab={communitySortOrder}
                onChange={setCommunitySortOrder}
                variant="cyan"
                className="border-none p-0 scale-75 origin-right opacity-80"
              />
              <div className="relative w-44 h-7">
                <Search className="size-3 absolute left-2.5 top-[8.5px] text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter signals..."
                  value={communitySearchQuery}
                  onChange={(e) => setCommunitySearchQuery(e.target.value)}
                  className="w-full h-full bg-cyan-950/20 border border-cyan-400/25 text-slate-200 pl-7 pr-3 text-[10px] focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        }
      />

      {/* Grid metrics row */}
      <div className="w-full mt-6 bg-cyan-400/10 grid grid-cols-4 gap-px max-md:grid-cols-2">
        <div className="px-5 py-3.5 bg-slate-950/90 flex flex-col items-center">
          <strong className="text-cyan-400 text-base font-extrabold">{state.posts.length}</strong>
          <span className="text-slate-500 text-[8px] font-bold mt-1.5 uppercase tracking-widest">TOTAL SIGNAL FILES</span>
        </div>
        <div className="px-5 py-3.5 bg-slate-950/90 flex flex-col items-center">
          <strong className="text-cyan-400 text-base font-extrabold">1,203</strong>
          <span className="text-slate-500 text-[8px] font-bold mt-1.5 uppercase tracking-widest">PEERS CONNECTED</span>
        </div>
        <div className="px-5 py-3.5 bg-slate-950/90 flex flex-col items-center">
          <strong className="text-cyan-400 text-base font-extrabold">3</strong>
          <span className="text-slate-500 text-[8px] font-bold mt-1.5 uppercase tracking-widest">CRITICAL ALERTS</span>
        </div>
        <div className="px-5 py-3.5 bg-slate-950/90 flex flex-col items-center">
          <strong className="text-cyan-400 text-base font-extrabold">1,540</strong>
          <span className="text-slate-500 text-[8px] font-bold mt-1.5 uppercase tracking-widest">ENDORSEMENTS</span>
        </div>
      </div>

      {/* Main split viewport */}
      <div className="grid grid-cols-[1fr_320px] gap-8 py-8 max-lg:grid-cols-1 w-full">
        {/* Left Column: Feed List */}
        <div className="flex flex-col gap-4">
          {filteredPosts.length === 0 ? (
            <EmptyState
              title="NO COMMUNITY ADVISORIES DETECTED"
              message="Adjust search keywords or select another feed category."
            />
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLike={() => likePost(post.id)}
                onComment={(text) => {
                  updateState((draft) => {
                    const p = draft.posts.find((item) => item.id === post.id);
                    if (p) p.comments.push(`${currentUser.name}: ${text}`);
                  });
                  notify("Comment successfully injected into node.");
                }}
                onShare={() => {
                  navigator.clipboard.writeText(post.content);
                  notify("Signal content copy sync successful.");
                }}
              />
            ))
          )}
        </div>

        {/* Right Column: Widgets & Composer */}
        <div className="flex flex-col gap-6 w-full">
          {/* Post composer */}
          <PostComposer
            value={broadcastDraft}
            onChange={setBroadcastDraft}
            onSend={publishBroadcast}
          />

          {/* Online directory list */}
          <div className="p-6 bg-slate-950/90 border border-cyan-400/20 flex flex-col justify-start items-start w-full hover:shadow-[0_0_15px_rgba(0,246,255,0.05)] transition-all duration-300">
            <span className="text-cyan-400 text-[9.5px] font-black tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_#10b981] animate-pulse" />
              ONLINE PEERS ({1203})
            </span>

            <div className="w-full flex flex-col gap-3.5 text-xs">
              {["AXIOM_V", "NULLSHIFT", "CR4WLER", "VECTOR_X", "GHOST_RIG", "PRISM_7", "ECHO_NET"].map((user, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-350">
                  <div className="size-6 bg-cyan-400/5 border border-cyan-400/25 flex justify-center items-center text-[9px] font-bold text-cyan-400">
                    {user.charAt(0)}
                  </div>
                  <span className="font-semibold">{user}</span>
                  <span className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Trending tags list */}
          <div className="p-6 bg-slate-950/90 border border-cyan-400/20 flex flex-col justify-start items-start w-full hover:shadow-[0_0_15px_rgba(0,246,255,0.05)] transition-all duration-300">
            <SectionLabel code="TREND_00" label="TRENDING ADVISORIES" color="cyan" />
            <div className="w-full flex flex-col text-xs mt-2">
              {[
                ["#PhantomSyndicateWin", "#1"],
                ["#NeonCircuitOpen", "#2"],
                ["#EscrowProtected", "#3"],
                ["#GameTrustSafeTrade", "#4"],
                ["#ValRadiantAccount", "#5"],
                ["#LolChallengerSale", "#6"],
                ["#CS2KnifeDrops", "#7"],
              ].map(([tag, rank], idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 text-slate-400">
                  <span className="hover:text-cyan-300 cursor-pointer font-sans text-xs">{tag}</span>
                  <span className="text-cyan-400 font-bold">{rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunityView;
