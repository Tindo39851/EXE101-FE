import React from "react";
import { ShieldAlert, Zap, Users, Star, Trash2, Check, Bell } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    notify,
  } = useAppState();

  const typeTabs = [
    { id: "ALL", label: "ALL EVENTS" },
    { id: "TRADE", label: "TRADES" },
    { id: "SECURITY", label: "ALERTS" },
    { id: "TOURNAMENT", label: "TOURNAMENTS" },
    { id: "CLAN", label: "CLANS" },
    { id: "ACHIEVEMENT", label: "ACHIEVES" },
  ];

  return (
    <section className="flex flex-col bg-black p-0 w-full select-none font-mono">
      {/* Page Header */}
      <PageHeader
        code="SYS_06 // INTEGRATED ALERT GATEWAY"
        title="Notifications"
        subtitle="Escrow logs, identity verifications, security triggers, and tournament wagers"
        backText="BACK TO HUB"
        onBack={() => setView("overview")}
        action={
          <div className="flex flex-col gap-2.5 items-end justify-end">
            <Tabs
              tabs={typeTabs}
              activeTab={notifFilter}
              onChange={setNotifFilter}
              variant="cyan"
              className="border-none p-0 scale-90 origin-right"
            />
            <div className="flex items-center gap-3.5 mt-1 select-none text-[10px] font-bold">
              <button
                onClick={() => setUnreadOnly(!unreadOnly)}
                className={`px-3 py-1 border transition flex items-center gap-1.5 cursor-pointer uppercase ${
                  unreadOnly
                    ? "bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-400 shadow-[0_0_8px_rgba(255,0,223,0.25)]"
                    : "border-fuchsia-500/20 text-slate-500"
                }`}
              >
                <span className={`size-1.5 rounded-full ${unreadOnly ? "bg-fuchsia-500" : "bg-slate-550"}`} />
                UNREAD ONLY
              </button>

              <button
                onClick={markAllNotificationsRead}
                className="text-slate-500 hover:text-cyan-400 transition"
              >
                MARK ALL READ
              </button>

              <button
                onClick={clearAllNotifications}
                className="text-slate-500 hover:text-red-400 transition flex items-center gap-1.5"
              >
                <Trash2 className="size-3" />
                CLEAR ALL
              </button>
            </div>
          </div>
        }
      />

      {/* Stats Counter Bar */}
      <div className="flex bg-cyan-400/10 gap-px mt-6 select-none uppercase">
        {[
          { val: state.notifications?.length || 0, label: "TOTAL MESSAGES", color: "text-cyan-400" },
          { val: state.notifications?.filter((n) => n.unread).length || 0, label: "UNREAD ALERTS", color: "text-fuchsia-500" },
          { val: state.notifications?.filter((n) => n.type === "security").length || 0, label: "SECURITY DEPOSITS", color: "text-orange-500" },
          { val: state.notifications?.filter((n) => n.type === "trade").length || 0, label: "ESCROW TRANSFERS", color: "text-cyan-400" },
        ].map((stat, idx) => (
          <div key={idx} className="flex-1 min-w-[120px] px-5 py-3.5 bg-slate-950/90 flex flex-col items-center">
            <span className={`text-lg font-black ${stat.color}`}>{stat.val}</span>
            <span className="text-slate-500 text-[8px] font-bold mt-1.5 tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Notifications timeline groups */}
      <div className="flex flex-col gap-6 mt-8">
        {Object.entries(groupedNotifs).map(([groupTitle, list]) => {
          if (list.length === 0) return null;
          return (
            <div key={groupTitle} className="flex flex-col gap-3.5">
              {/* Timeline boundary banner */}
              <div className="flex items-center gap-3 text-xs font-bold select-none text-slate-500 uppercase">
                <span className="text-[9px] font-black tracking-widest">{groupTitle}</span>
                <div className="flex-1 h-px bg-cyan-400/10" />
                <span className="text-slate-650 text-[8px] font-black tracking-widest">{list.length} NODES</span>
              </div>

              {/* Items in group */}
              <div className="flex flex-col gap-3.5">
                {list.map((n) => {
                  let IconComp = Bell;
                  let colorClass = "cyan";
                  let borderClass = "border-cyan-400/20";
                  let verticalBarBg = "bg-cyan-400 shadow-[0_0_8px_rgba(0,246,255,0.6)]";
                  let badgeVariant: any = "cyan";

                  if (n.type === "security") {
                    IconComp = ShieldAlert;
                    colorClass = "orange";
                    borderClass = "border-orange-500/25";
                    verticalBarBg = "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]";
                    badgeVariant = "upcoming";
                  } else if (n.type === "tournament") {
                    IconComp = Zap;
                    colorClass = "fuchsia";
                    borderClass = "border-fuchsia-500/25";
                    verticalBarBg = "bg-fuchsia-500 shadow-[0_0_8px_rgba(255,0,223,0.6)]";
                    badgeVariant = "fuchsia";
                  } else if (n.type === "clan") {
                    IconComp = Users;
                    colorClass = "green";
                    borderClass = "border-emerald-400/25";
                    verticalBarBg = "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]";
                    badgeVariant = "success";
                  } else if (n.type === "achievement") {
                    IconComp = Star;
                    colorClass = "yellow";
                    borderClass = "border-yellow-400/25";
                    verticalBarBg = "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]";
                    badgeVariant = "upcoming";
                  }

                  return (
                    <div
                      key={n.id}
                      className={`relative px-5 py-4 bg-slate-950/80 border transition-all duration-300 flex justify-start items-start gap-4 hover:border-cyan-400/35 hover:shadow-[0_0_15px_rgba(0,246,255,0.04)] ${
                        n.unread ? "border-cyan-400/30" : "border-white/5"
                      }`}
                    >
                      {/* Vertical indicator bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[2.5px] ${verticalBarBg}`} />

                      {/* Icon holder */}
                      <div className={`size-10 bg-white/[0.02] border flex justify-center items-center shrink-0 ${borderClass}`}>
                        <IconComp
                          className={`size-4 ${
                            colorClass === "orange"
                              ? "text-orange-500"
                              : colorClass === "fuchsia"
                              ? "text-fuchsia-400"
                              : colorClass === "green"
                              ? "text-emerald-400"
                              : colorClass === "yellow"
                              ? "text-yellow-400"
                              : "text-cyan-400"
                          }`}
                        />
                      </div>

                      {/* Content block */}
                      <div className="flex-1 flex flex-col items-start gap-1">
                        <div className="self-stretch flex justify-between items-center flex-wrap gap-2 leading-none">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-200 text-xs font-black tracking-wide">
                              {n.title}
                            </span>
                            <Badge variant={badgeVariant} className="text-[7.5px] px-1 border-none leading-none">
                              {n.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 text-[8.5px] font-bold">🕒 {n.time}</span>
                            {n.unread && (
                              <span className="size-1.5 bg-fuchsia-500 rounded-sm shadow-[0_0_6px_#ff00df]" />
                            )}
                          </div>
                        </div>

                        <p className="text-slate-400 text-xs font-sans leading-relaxed mt-2 pr-4">
                          {n.content}
                        </p>

                        {/* Controls */}
                        <div className="flex items-center gap-4 mt-3 text-[9px] font-bold tracking-wider text-slate-500">
                          {n.unread && (
                            <button
                              onClick={() => markNotificationRead(n.id)}
                              className="hover:text-cyan-400 transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                            >
                              <Check className="size-3" />
                              MARK READ
                            </button>
                          )}
                          <button
                            onClick={() => notify(`Viewing details for: ${n.title}`)}
                            className="hover:text-cyan-400 transition cursor-pointer border-none bg-transparent"
                          >
                            DETAILS
                          </button>
                          <button
                            onClick={() => dismissNotification(n.id)}
                            className="hover:text-red-400 transition cursor-pointer border-none bg-transparent"
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
