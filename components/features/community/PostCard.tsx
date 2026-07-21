import React from "react";
import type { Post, User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: () => void;
  onComment: (text: string) => void;
  onShare: () => void;
}

export function PostCard({ post, currentUser, onLike, onComment, onShare }: PostCardProps) {
  const accentColors = {
    trade: "bg-cyan-400 shadow-[0_0_6px_rgba(0,255,255,1)]",
    tournament: "bg-fuchsia-500 shadow-[0_0_6px_rgba(255,0,255,1)]",
    alert: "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,1)]",
    listing: "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,1)]",
    recruit: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]",
    achievement: "bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,1)]",
  };

  const getBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case "trade":
        return "cyan";
      case "tournament":
        return "fuchsia";
      case "alert":
        return "upcoming";
      case "listing":
        return "upcoming";
      case "recruit":
        return "success";
      default:
        return "default";
    }
  };

  const t = post.type.toLowerCase();
  const activeAccent = accentColors[t as keyof typeof accentColors] || "bg-cyan-400";
  const badgeVariant = getBadgeVariant(post.type);

  const handleCommentClick = () => {
    const text = prompt("Enter your comment node message:");
    if (text?.trim()) {
      onComment(text.trim());
    }
  };

  return (
    <div className="p-5 bg-slate-950/80 border border-cyan-400/20 flex flex-col justify-start items-start relative font-mono select-none hover:shadow-[0_0_15px_rgba(0,246,255,0.05)] transition-all duration-300">
      {/* Accent top boundary marker */}
      <div className={`w-full h-[2px] absolute top-0 left-0 ${activeAccent}`} />

      <div className="w-full pt-3 inline-flex justify-start items-start gap-4">
        {/* Avatar & status */}
        <div className="relative shrink-0">
          <div className="size-10 bg-cyan-400/5 border border-cyan-400/30 inline-flex justify-center items-center font-black text-cyan-400 text-sm">
            {post.authorName ? post.authorName.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="size-3 absolute -bottom-0.5 -right-0.5 bg-slate-950 rounded-sm flex justify-center items-center">
            <div className="size-1.5 bg-emerald-400 rounded-full shadow-[0_0_4px_#34d399]" />
          </div>
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0">
          <div className="w-full flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-200 text-[11px] font-black uppercase tracking-wide">
                {post.authorName || "ANONYMOUS"}
              </span>
              {post.clanTag && (
                <span className="px-1.5 py-0.5 bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 text-[8px] font-bold">
                  [{post.clanTag}]
                </span>
              )}
              <Badge variant={badgeVariant} className="text-[7.5px] px-1.5 py-0 border-none">
                {post.type === "alert" ? "⚠️ ALERT" : post.type === "recruit" ? "RECRUITING" : post.type}
              </Badge>
              {post.game && (
                <span className="text-slate-500 text-[8.5px] font-bold">
                  {post.game}
                </span>
              )}
            </div>

            <span className="text-slate-500 text-[8.5px] font-bold">
              🕒 {post.time || "1m ago"}
            </span>
          </div>

          <p className="mt-3.5 text-slate-300 text-xs font-sans leading-relaxed pr-2">
            {post.content}
          </p>

          {/* Action controls row */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-6 text-slate-500 text-[9px] font-bold tracking-wider">
            <button
              onClick={onLike}
              className="flex items-center gap-1.5 hover:text-slate-300 transition cursor-pointer border-none bg-transparent"
            >
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>
            <button
              onClick={handleCommentClick}
              className="flex items-center gap-1.5 hover:text-slate-300 transition cursor-pointer border-none bg-transparent"
            >
              <span>💬</span>
              <span>{post.comments.length}</span>
            </button>
            <button
              onClick={onShare}
              className="hover:text-slate-300 transition cursor-pointer border-none bg-transparent"
            >
              SHARE NODE
            </button>
          </div>

          {/* Comments list */}
          {post.comments.length > 0 && (
            <ul className="mt-3.5 space-y-1.5 bg-black/50 p-3 border border-white/5">
              {post.comments.map((comment, index) => (
                <li key={index} className="text-slate-400 text-xs font-sans border-b border-white/[0.02] last:border-none pb-1 last:pb-0">
                  {comment}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
