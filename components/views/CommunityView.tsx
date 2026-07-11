import React from "react";
import { Search } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { clans } from "@/lib/data/clans";

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
    joinedClans,
    broadcastDraft,
    setBroadcastDraft,
    publishBroadcast
  } = useAppState();

  return (
    <section className="flex flex-col bg-black p-0">
      {/* Header Banner */}
      <div className="relative bg-gray-950 border-b border-cyan-400/20 py-8 px-6 flex flex-col justify-start items-start overflow-hidden">
        <button
          onClick={() => setView("overview")}
          className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left uppercase cursor-pointer border-none bg-transparent"
        >
          ← BACK TO HOME
        </button>

        <div className="w-full flex justify-between items-end mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
              <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest font-semibold uppercase">
                SECTION_05 // COMMUNITY NETWORK
              </span>
            </div>
            <h3 className="text-slate-200 text-3xl font-extrabold font-mono tracking-widest mt-1.5 uppercase">
              SOCIAL FEED
            </h3>
          </div>
        </div>

        {/* 4 Metrics Boxes */}
        <div className="w-full mt-8 bg-cyan-400/10 grid grid-cols-4 gap-px max-md:grid-cols-2">
          <div className="px-5 py-3.5 bg-gray-950 flex flex-col items-center">
            <strong className="text-cyan-400 text-base font-extrabold font-mono">14</strong>
            <span className="text-slate-500 text-[8px] font-mono mt-1.5 uppercase tracking-wide">TOTAL POSTS</span>
          </div>
          <div className="px-5 py-3.5 bg-gray-950 flex flex-col items-center">
            <strong className="text-cyan-400 text-base font-extrabold font-mono">1,203</strong>
            <span className="text-slate-500 text-[8px] font-mono mt-1.5 uppercase tracking-wide">ONLINE NOW</span>
          </div>
          <div className="px-5 py-3.5 bg-gray-950 flex flex-col items-center">
            <strong className="text-cyan-400 text-base font-extrabold font-mono">3</strong>
            <span className="text-slate-500 text-[8px] font-mono mt-1.5 uppercase tracking-wide">ALERTS TODAY</span>
          </div>
          <div className="px-5 py-3.5 bg-gray-950 flex flex-col items-center">
            <strong className="text-cyan-400 text-base font-extrabold font-mono">1,540</strong>
            <span className="text-slate-500 text-[8px] font-mono mt-1.5 uppercase tracking-wide">TOP LIKES</span>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="w-full mt-8 pt-4 border-t border-white/5 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {["ALL", "TRADE", "TOURNAMENT", "ALERT", "LISTING", "RECRUIT", "ACHIEVEMENT"].map((type) => {
              const active = communityTypeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => setCommunityTypeFilter(type)}
                  className={`px-3.5 py-1 font-mono text-[9.60px] tracking-wide uppercase transition cursor-pointer ${
                    active
                      ? "bg-cyan-400/10 shadow-[0_0_8px_rgba(0,255,255,0.4)] outline outline-1 outline-offset-[-1px] outline-cyan-400 text-cyan-400"
                      : "outline outline-1 outline-offset-[-1px] outline-cyan-400/20 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Sort Toggle */}
            <div className="bg-cyan-400/10 flex gap-px p-px">
              <button
                onClick={() => setCommunitySortOrder("RECENT")}
                className={`px-3.5 py-1 font-mono text-[9.28px] uppercase tracking-wide transition cursor-pointer ${
                  communitySortOrder === "RECENT" ? "bg-cyan-400/10 text-cyan-400" : "bg-gray-950 text-slate-500 hover:text-slate-300"
                }`}
              >
                RECENT
              </button>
              <button
                onClick={() => setCommunitySortOrder("TOP")}
                className={`px-3.5 py-1 font-mono text-[9.28px] uppercase tracking-wide transition cursor-pointer ${
                  communitySortOrder === "TOP" ? "bg-cyan-400/10 text-cyan-400" : "bg-gray-950 text-slate-500 hover:text-slate-300"
                }`}
              >
                TOP
              </button>
            </div>

            {/* Search input */}
            <div className="relative w-48 h-7">
              <Search className="size-3 absolute left-2.5 top-[7.5px] text-slate-500" />
              <input
                type="text"
                placeholder="Search posts..."
                value={communitySearchQuery}
                onChange={e => setCommunitySearchQuery(e.target.value)}
                className="w-full h-full bg-cyan-400/5 border border-cyan-400/20 text-slate-200 pl-8 pr-3 text-[10.40px] font-mono focus:outline-none focus:border-cyan-400/40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Split layout workspace */}
      <div className="grid grid-cols-[1fr_360px] gap-8 py-10 max-lg:grid-cols-1 w-[1400px] max-w-[1400px] px-8 mx-auto">
        
        {/* Left Column: Posts feed list */}
        <div className="flex flex-col gap-4">
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-slate-600 font-mono text-xs uppercase border border-white/5 bg-gray-950/20">
              NO POSTS MATCHING SEARCH CRITERIA
            </div>
          ) : (
            filteredPosts.map((post) => {
              const accentColors = {
                trade: "bg-cyan-400 shadow-[0_0_6px_rgba(0,255,255,1)]",
                tournament: "bg-fuchsia-500 shadow-[0_0_6px_rgba(255,0,255,1)]",
                alert: "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,1)]",
                listing: "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,1)]",
                recruit: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]",
                achievement: "bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,1)]",
              };
              const typeBadgeColors = {
                trade: "bg-cyan-400/5 outline-cyan-400/25 text-cyan-400",
                tournament: "bg-fuchsia-500/5 outline-fuchsia-500/25 text-fuchsia-500",
                alert: "bg-orange-500/5 outline-orange-500/25 text-orange-500",
                listing: "bg-yellow-400/5 outline-yellow-400/25 text-yellow-400",
                recruit: "bg-emerald-400/5 outline-emerald-400/25 text-emerald-400",
                achievement: "bg-yellow-500/5 outline-yellow-500/25 text-yellow-500",
              };
              const t = post.type.toLowerCase();
              const activeAccent = accentColors[t as keyof typeof accentColors] || "bg-cyan-400";
              const activeBadge = typeBadgeColors[t as keyof typeof typeBadgeColors] || "bg-cyan-400/5";

              return (
                <div
                  key={post.id}
                  className="p-5 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-start relative"
                >
                  {/* Accent top border line */}
                  <div className={`w-full h-[1.50px] absolute top-0 left-0 ${activeAccent}`}></div>
                  
                  <div className="w-full pt-4 inline-flex justify-start items-start gap-4">
                    {/* Avatar & status check */}
                    <div className="relative shrink-0">
                      <div className="size-10 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/40 inline-flex justify-center items-center font-mono font-black text-cyan-400 text-base">
                        {post.authorName ? post.authorName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="size-3 absolute -bottom-0.5 -right-0.5 bg-gray-950 rounded-md flex justify-center items-center">
                        <div className="size-2 bg-emerald-400 rounded-full shadow-[0_0_4px_#34d399]"></div>
                      </div>
                    </div>

                    {/* Post contents details */}
                    <div className="flex-1 min-w-0">
                      <div className="w-full flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-slate-200 text-xs font-bold font-mono tracking-wide uppercase">
                            {post.authorName || "ANONYMOUS"}
                          </span>
                          {post.clanTag && (
                            <span className="px-[4.80px] py-[1.60px] outline outline-1 outline-offset-[-1px] outline-cyan-400/30 text-cyan-400 text-[8.80px] font-mono leading-none">
                              [{post.clanTag}]
                            </span>
                          )}
                          <span className={`px-2 py-[2.40px] outline outline-1 outline-offset-[-1px] text-[8.32px] font-mono leading-none ${activeBadge}`}>
                            {post.type === "alert" ? "⚠️ ALERT" : post.type === "recruit" ? "RECRUITING" : post.type.toUpperCase()}
                          </span>
                          {post.game && (
                            <span className="text-slate-500 text-[8.32px] font-mono leading-none">
                              {post.game}
                            </span>
                          )}
                        </div>

                        <span className="text-slate-500 text-[8.32px] font-mono leading-none">
                          🕒 {post.time || "1m ago"}
                        </span>
                      </div>

                      <p className="mt-3 text-slate-300 text-sm font-sans leading-6 pr-4">
                        {post.content}
                      </p>

                      {/* Likes, Comments & Share footer */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-7 text-slate-500 text-[9.60px] font-mono">
                        <button
                          onClick={() => likePost(post.id)}
                          className="flex items-center gap-1.5 hover:text-slate-300 transition cursor-pointer"
                        >
                          <span>❤️</span>
                          <span>{post.likes}</span>
                        </button>
                        <button
                          onClick={() => {
                            const reply = prompt("Enter your comment:");
                            if (reply) {
                              updateState((draft) => {
                                const p = draft.posts.find(item => item.id === post.id);
                                if (p) p.comments.push(`${currentUser.name}: ${reply}`);
                              });
                              notify("Comment added successfully!");
                            }
                          }}
                          className="flex items-center gap-1.5 hover:text-slate-300 transition cursor-pointer"
                        >
                          <span>💬</span>
                          <span>{post.comments.length}</span>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(post.content);
                            notify("Post content copied to clipboard!");
                          }}
                          className="hover:text-slate-300 transition cursor-pointer"
                        >
                          SHARE
                        </button>
                      </div>

                      {/* Live comments list */}
                      {post.comments.length > 0 && (
                        <ul className="mt-3.5 space-y-1 bg-black/40 p-2.5 outline outline-1 outline-offset-[-1px] outline-white/5">
                          {post.comments.map((comment, index) => (
                            <li key={index} className="text-slate-400 text-xs font-sans">
                              {comment}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Widgets */}
        <div className="flex flex-col gap-6">
          
          {/* Broadcast to network tool */}
          <div className="bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-start w-full">
            <div className="w-full bg-fuchsia-500/10 border-b border-fuchsia-500/20 py-2.5 px-4 flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_6px_#f500a3]"></div>
                <span className="text-fuchsia-500 text-[9.92px] font-mono tracking-widest font-bold uppercase">
                  BROADCAST TO NETWORK
                </span>
              </div>
            </div>

            <div className="p-4 w-full flex flex-col gap-3">
              <textarea
                placeholder="Share a trade, alert, or update..."
                value={broadcastDraft}
                onChange={e => setBroadcastDraft(e.target.value)}
                className="w-full bg-slate-900 border border-fuchsia-500/30 text-slate-200 p-3 text-sm focus:outline-none focus:border-fuchsia-500 min-h-24 resize-none placeholder-slate-600 font-sans leading-5"
              />
              <button
                onClick={publishBroadcast}
                className="w-full py-2.5 bg-fuchsia-500 hover:bg-fuchsia-400 text-black font-mono font-bold tracking-widest text-xs uppercase transition shadow-[0_0_12px_rgba(255,0,255,0.3)] cursor-pointer"
              >
                BROADCAST
              </button>
            </div>
          </div>

          {/* Feed breakdown widgets */}
          <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-start w-full">
            <span className="text-cyan-400 text-[9px] font-mono tracking-widest uppercase">
              FEED BREAKDOWN
            </span>
            
            <div className="self-stretch mt-6 flex flex-col gap-4">
              {/* Trade bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">TRADE</span>
                  <span className="text-cyan-400 font-bold">3</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 relative">
                  <div className="h-full bg-cyan-400 shadow-[0_0_6px_#00ffff]" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Tournament bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">TOURNAMENT</span>
                  <span className="text-fuchsia-500 font-bold">2</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 relative">
                  <div className="h-full bg-fuchsia-500 shadow-[0_0_6px_#ff00ff]" style={{ width: "28%" }}></div>
                </div>
              </div>

              {/* Alert bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">ALERT</span>
                  <span className="text-orange-500 font-bold">3</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 relative">
                  <div className="h-full bg-orange-500 shadow-[0_0_6px_#f97316]" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Listing bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">LISTING</span>
                  <span className="text-yellow-400 font-bold">3</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 relative">
                  <div className="h-full bg-yellow-400 shadow-[0_0_6px_#eab308]" style={{ width: "40%" }}></div>
                </div>
              </div>

              {/* Recruit bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">RECRUIT</span>
                  <span className="text-emerald-400 font-bold">2</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 relative">
                  <div className="h-full bg-emerald-400 shadow-[0_0_6px_#34d399]" style={{ width: "28%" }}></div>
                </div>
              </div>

              {/* Achievement bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">ACHIEVEMENT</span>
                  <span className="text-yellow-500 font-bold">2</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 relative">
                  <div className="h-full bg-yellow-500 shadow-[0_0_6px_#eab308]" style={{ width: "28%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Tags widget */}
          <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-start w-full">
            <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest uppercase mb-4 flex items-center gap-1.5">
              📈 TRENDING TAGS
            </span>
            
            <div className="w-full flex flex-col text-xs font-mono">
              {[
                ["#PhantomSyndicateWin", "#1"],
                ["#NeonCircuitOpen", "#2"],
                ["#EscrowProtected", "#3"],
                ["#GameTrustSafeTrade", "#4"],
                ["#ValRadiantAccount", "#5"],
                ["#LolChallengerSale", "#6"],
                ["#CS2KnifeDrops", "#7"],
                ["#ApexPredatorAcc", "#8"]
              ].map(([tag, rank], idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 text-slate-400">
                  <span className="hover:text-cyan-300 cursor-pointer">{tag}</span>
                  <span className="text-cyan-400 font-bold">{rank}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Online users widget */}
          <div className="p-6 bg-gray-950/90 outline outline-1 outline-offset-[-1px] outline-cyan-400/20 flex flex-col justify-start items-start w-full">
            <span className="text-cyan-400 text-[9.92px] font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm shadow-[0_0_6px_#10b981]"></span>
              ONLINE NOW (1,203)
            </span>
            
            <div className="w-full flex flex-col gap-3 font-mono text-xs">
              {["AXIOM_V", "NULLSHIFT", "CR4WLER", "VECTOR_X", "GHOST_RIG", "PRISM_7", "ECHO_NET"].map((user, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-300">
                  <div className="size-6 bg-cyan-400/5 outline outline-1 outline-offset-[-1px] outline-cyan-400/25 flex justify-center items-center text-[9px] font-bold text-cyan-400">
                    {user.charAt(0)}
                  </div>
                  <span>{user}</span>
                  <span className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_4px_#34d399]"></span>
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
