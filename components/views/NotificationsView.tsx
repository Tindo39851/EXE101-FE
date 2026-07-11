import React from "react";
import { Bell, ShieldAlert, Zap, Users, Star, Trash2, Check } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";

export function NotificationsView() {
  const {
    state,
    setView,
    notifFilter,
    setNotifFilter,
    unreadOnly,
    setUnreadOnly,
    markAllNotificationsRead,
    clearAllNotifications,
    groupedNotifs,
    markNotificationRead,
    dismissNotification,
    notify
  } = useAppState();

  return (
    <section className="flex flex-col gap-6 bg-black p-0">
      {/* Back Button */}
      <button
        onClick={() => setView("overview")}
        className="text-cyan-400 text-[10.40px] font-mono tracking-wider mb-2 hover:underline text-left"
      >
        ← BACK TO HOME
      </button>

      {/* Notification Banner */}
      <div className="relative bg-gray-950/95 border-b border-cyan-400/20 py-8 px-6 flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-stretch">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-cyan-400 shadow-[0px_0px_8px_rgba(0,255,255,1)]"></div>
            <span className="text-cyan-400 text-[9.9px] font-mono tracking-widest font-semibold uppercase">SYS_06 // ALERT CENTER</span>
          </div>
          <h3 className="text-slate-200 text-3xl font-extrabold font-mono tracking-widest uppercase">
            NOTIFICATIONS
          </h3>
        </div>
      </div>

      {/* Stats Block */}
      <div className="flex bg-cyan-400/10 gap-px max-md:flex-wrap">
        <div className="flex-1 min-w-[120px] px-5 py-3.5 bg-gray-950 flex flex-col items-center">
          <span className="text-cyan-400 text-lg font-extrabold font-mono">
            {state.notifications?.length || 0}
          </span>
          <span className="text-slate-500 text-[8px] font-mono tracking-wide mt-1 uppercase">TOTAL</span>
        </div>
        <div className="flex-1 min-w-[120px] px-5 py-3.5 bg-gray-950 flex flex-col items-center">
          <span className="text-fuchsia-500 text-lg font-extrabold font-mono">
            {state.notifications?.filter(n => n.unread).length || 0}
          </span>
          <span className="text-slate-500 text-[8px] font-mono tracking-wide mt-1 uppercase">UNREAD</span>
        </div>
        <div className="flex-1 min-w-[120px] px-5 py-3.5 bg-gray-950 flex flex-col items-center">
          <span className="text-orange-500 text-lg font-extrabold font-mono">
            {state.notifications?.filter(n => n.type === "security").length || 0}
          </span>
          <span className="text-slate-500 text-[8px] font-mono tracking-wide mt-1 uppercase">ALERTS</span>
        </div>
        <div className="flex-1 min-w-[120px] px-5 py-3.5 bg-gray-950 flex flex-col items-center">
          <span className="text-cyan-400 text-lg font-extrabold font-mono">
            {state.notifications?.filter(n => n.type === "trade").length || 0}
          </span>
          <span className="text-slate-500 text-[8px] font-mono tracking-wide mt-1 uppercase">TRADES</span>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-white/5 pb-4">
        <div className="flex gap-2 flex-wrap">
          {["ALL", "TRADE", "SECURITY", "TOURNAMENT", "CLAN", "ACHIEVEMENT"].map((tab) => {
            const active = notifFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setNotifFilter(tab)}
                className={`h-6 px-3.5 py-1 outline outline-1 outline-offset-[-1px] text-[9.6px] font-mono uppercase tracking-wide inline-flex justify-center items-center cursor-pointer transition ${
                  active
                    ? "bg-cyan-400/10 outline-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                    : "outline-cyan-400/20 text-slate-500 hover:bg-cyan-400/5 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-5 flex-wrap text-xs font-mono">
          {/* Unread Only Toggle */}
          <button
            onClick={() => setUnreadOnly(!unreadOnly)}
            className={`px-3.5 py-1 outline outline-1 outline-offset-[-1px] inline-flex justify-start items-center gap-1.5 cursor-pointer select-none transition ${
              unreadOnly
                ? "outline-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/5 shadow-[0_0_8px_rgba(255,0,255,0.2)]"
                : "outline-fuchsia-500/25 text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className={`size-1.5 rounded-full transition ${unreadOnly ? "bg-fuchsia-500" : "bg-slate-500"}`}></span>
            UNREAD ONLY
          </button>

          <button
            onClick={markAllNotificationsRead}
            className="text-slate-500 text-[9.3px] font-mono tracking-wide cursor-pointer hover:text-cyan-400 transition"
          >
            MARK ALL READ
          </button>

          <button
            onClick={clearAllNotifications}
            className="text-slate-500 text-[9.3px] font-mono tracking-wide cursor-pointer hover:text-red-400 transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            CLEAR ALL
          </button>
        </div>
      </div>

      {/* Notifications Groups */}
      <div className="flex flex-col gap-8 mt-2">
        {Object.entries(groupedNotifs).map(([groupTitle, list]) => {
          if (list.length === 0) return null;
          return (
            <div key={groupTitle} className="flex flex-col gap-4">
              {/* Header Group */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-500 text-[9.3px] font-mono tracking-widest">{groupTitle}</span>
                <div className="flex-1 h-px bg-cyan-400/10"></div>
                <span className="text-slate-600 text-[8.3px] font-mono uppercase">{list.length} ITEMS</span>
              </div>

              {/* Group Items */}
              <div className="flex flex-col gap-3.5">
                {list.map((n) => {
                  let IconComp = Bell;
                  let colorClass = "cyan";
                  let borderClass = "border-cyan-400/20 outline-cyan-400/20";
                  let verticalBarBg = "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]";
                  let badgeBg = "bg-cyan-400/5 outline-cyan-400/20 text-cyan-400";

                  if (n.type === "security") {
                    IconComp = ShieldAlert;
                    colorClass = "orange";
                    borderClass = "border-orange-500/20 outline-orange-500/20";
                    verticalBarBg = "bg-orange-500 shadow-[0_0_8px_rgba(255,102,0,1)]";
                    badgeBg = "bg-orange-500/5 outline-orange-500/20 text-orange-500";
                  } else if (n.type === "tournament") {
                    IconComp = Zap;
                    colorClass = "fuchsia";
                    borderClass = "border-fuchsia-500/20 outline-fuchsia-500/20";
                    verticalBarBg = "bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,255,1)]";
                    badgeBg = "bg-fuchsia-500/5 outline-fuchsia-500/20 text-fuchsia-500";
                  } else if (n.type === "clan") {
                    IconComp = Users;
                    colorClass = "green";
                    borderClass = "border-emerald-400/20 outline-emerald-400/20";
                    verticalBarBg = "bg-emerald-400 shadow-[0_0_8px_rgba(0,255,136,1)]";
                    badgeBg = "bg-emerald-400/5 outline-emerald-400/20 text-emerald-400";
                  } else if (n.type === "achievement") {
                    IconComp = Star;
                    colorClass = "yellow";
                    borderClass = "border-yellow-400/20 outline-yellow-400/20";
                    verticalBarBg = "bg-yellow-400 shadow-[0_0_8px_rgba(255,212,0,1)]";
                    badgeBg = "bg-yellow-400/5 outline-yellow-400/20 text-yellow-400";
                  }

                  return (
                    <div
                      key={n.id}
                      className={`relative px-6 py-5 bg-gray-950/95 border ${
                        n.unread ? "border-cyan-400/30" : "border-white/5"
                      } flex justify-start items-start gap-5 transition hover:border-cyan-400/30`}
                    >
                      {/* Color indicator vertical bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${verticalBarBg}`}></div>

                      {/* Left icon wrapper */}
                      <div className={`w-11 h-11 bg-white/[0.02] outline outline-1 ${borderClass} flex justify-center items-center shrink-0`}>
                        <IconComp className={`w-5 h-5 text-${colorClass}-400`} />
                      </div>

                      {/* Center content */}
                      <div className="flex-1 flex flex-col items-start gap-1">
                        <div className="self-stretch flex justify-between items-center flex-wrap gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-slate-200 text-sm font-bold font-mono tracking-wide">
                              {n.title}
                            </span>
                            <span className={`px-1.5 py-[1px] outline outline-1 outline-offset-[-1px] text-[7.4px] font-mono uppercase tracking-wide font-semibold ${badgeBg}`}>
                              {n.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 text-[8.8px] font-mono">{n.time}</span>
                            {n.unread && (
                              <span className="size-1.5 bg-fuchsia-500 rounded-sm shadow-[0_0_8px_rgba(255,0,255,1)]"></span>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm font-medium leading-6 mt-1">
                          {n.content}
                        </p>

                        {/* Action buttons */}
                        <div className="flex items-center gap-5 mt-3 text-[9px] font-mono tracking-wider text-slate-500">
                          {n.unread && (
                            <button
                              onClick={() => markNotificationRead(n.id)}
                              className="hover:text-cyan-400 transition flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              MARK READ
                            </button>
                          )}
                          <button
                            onClick={() => notify(`Viewing details for: ${n.title}`)}
                            className="hover:text-cyan-400 transition cursor-pointer"
                          >
                            VIEW DETAILS
                          </button>
                          <button
                            onClick={() => dismissNotification(n.id)}
                            className="ml-auto hover:text-red-400 transition cursor-pointer"
                          >
                            DISMISS
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default NotificationsView;
