import type { AppState } from "@/lib/types";

// ─── Initial Seed State ───────────────────────────────────────────────────────
// Đây là "database khởi tạo" — tương đương với seed file trong Backend.
// Dữ liệu này được load một lần khi app khởi động, sau đó lưu vào localStorage.

export const seedState: AppState = {
  currentUserId: "u1",
  cart: null,
  users: [
    { id: "u1", role: "gamer", name: "User", game: "Arena Of Valor", rank: "Diamond", goal: "Rank push", premium: false, trustScore: 90 },
    { id: "u2", role: "creator", name: "Neon Phantom", game: "FreeFire", rank: "Master", goal: "Highlight creator", premium: true, trustScore: 96 },
    { id: "u3", role: "shop", name: "Axiom Vault", game: "Valorant", rank: "Platinum", goal: "Review shop/account", premium: false, trustScore: 84 },
    { id: "u4", role: "admin", name: "TrustOps Admin", game: "Arena Of Valor", rank: "Master", goal: "Community tournament", premium: true, trustScore: 99 },
  ],
  posts: [
    {
      id: "p1", authorId: "u2", type: "trade",
      content: "Just secured another Heroic FF account sale through GameTrust escrow. Zero disputes, instant release. This platform is the real deal. 🔒",
      likes: 284, comments: ["Congrats!", "Smooth transaction as always."], sponsored: false,
      game: "Freefire", authorName: "AXIOM_V", clanTag: "PSY", time: "2m ago",
    },
    {
      id: "p2", authorId: "u3", type: "tournament",
      content: "NEON CIRCUIT OPEN — Round 2 results are in. PSY went 3-0, NW dropped to losers bracket after a close game vs DVX. GGs all around.",
      likes: 512, comments: ["PSY is unstoppable.", "NW will bounce back in losers bracket."], sponsored: false,
      game: "Freefire", authorName: "NULLSHIFT", clanTag: "NW", time: "8m ago",
    },
    {
      id: "p3", authorId: "u4", type: "alert",
      content: "WARNING: Scammer @fake_broker_xx attempting to bypass escrow on AOV accounts. Reported and flagged. GameTrust blocked it automatically within 0.8s.",
      likes: 901, comments: ["Thanks for the heads up!", "GT security is next level."], sponsored: false,
      game: "Arena of Valor", authorName: "CR4WLER", clanTag: "DVX", time: "22m ago",
    },
    {
      id: "p4", authorId: "u1", type: "listing",
      content: "Finally hit Grand Master on my FF smurf. Listing it tonight at $149. ESCROW PROTECTED as always. DM for early access.",
      likes: 67, comments: ["Interested, check DMs.", "Skins info please?"], sponsored: false,
      game: "Freefire", authorName: "GHOST_RIG", clanTag: "", time: "41m ago",
    },
    {
      id: "p5", authorId: "u2", type: "recruit",
      content: "GRID REAPERS are recruiting! Must have Trust Score 9.0+. Main games: Freefire & AOV. 423 members strong. Apply in the Clan Hub.",
      likes: 189, comments: ["Applied!", "Solid clan, highly recommend."], sponsored: false,
      game: "Arena of Valor", authorName: "VECTOR_X", clanTag: "GR", time: "1h ago",
    },
    {
      id: "p6", authorId: "u3", type: "achievement",
      content: "1,000 safe trades milestone hit. GameTrust Platinum Broker badge unlocked. Shoutout to every buyer who trusted the process.",
      likes: 1824, comments: ["Legendary milestone!", "Well deserved, best broker in the region."], sponsored: false,
      game: "", authorName: "KRYPT0N", clanTag: "", time: "2h ago",
    },
    {
      id: "p7", authorId: "u1", type: "listing",
      content: "Freefire Heroic account up for grabs – 4,200 matches, rare bundle collection, clean history. Trust Score 9.8. GameTrust escrow only.",
      likes: 342, comments: [], sponsored: false,
      game: "Freefire", authorName: "PRISM_7", clanTag: "PSY", time: "3h ago",
    },
    {
      id: "p8", authorId: "u2", type: "trade",
      content: "AOV Conqueror season ended with a 14-win streak. Anyone got high-rank accounts to sell? Looking to buy legit through escrow.",
      likes: 88, comments: [], sponsored: false,
      game: "Arena of Valor", authorName: "DARKWAVE", clanTag: "NW", time: "4h ago",
    },
    {
      id: "p9", authorId: "u4", type: "alert",
      content: "ALERT: Multiple fake broker accounts spotted using similar usernames to trusted sellers. Always verify the GT verified badge before transacting.",
      likes: 1230, comments: [], sponsored: false,
      game: "", authorName: "SYNTH_RX", clanTag: "", time: "5h ago",
    },
    {
      id: "p10", authorId: "u3", type: "tournament",
      content: "Open qualifiers for the Phantom Cup are live! 128 teams registered so far. Prize pool is at $18,000 and climbing. Register in Tournament Hub.",
      likes: 654, comments: [], sponsored: false,
      game: "Freefire", authorName: "ECHO_NET", clanTag: "GR", time: "6h ago",
    },
    {
      id: "p11", authorId: "u1", type: "listing",
      content: "Hit Conqueror on three separate AOV accounts this season. All three now listed. Prices starting at $89. Escrow-protected, verified seller.",
      likes: 145, comments: [], sponsored: false,
      game: "Arena of Valor", authorName: "VOIDMASK", clanTag: "", time: "8h ago",
    },
    {
      id: "p12", authorId: "u2", type: "recruit",
      content: "GRID DEVEX is recruiting competitive FF & AOV players. Min rank: Heroic / Diamond. Trust Score 8.5+. Active tourneys every weekend.",
      likes: 211, comments: [], sponsored: false,
      game: "Freefire", authorName: "AXON_IV", clanTag: "DVX", time: "9h ago",
    },
    {
      id: "p13", authorId: "u3", type: "achievement",
      content: "500th completed escrow trade. Every single one went smoothly. GameTrust's dispute resolution team is phenomenal. Gold Broker badge earned.",
      likes: 890, comments: [], sponsored: false,
      game: "", authorName: "NULA", clanTag: "", time: "11h ago",
    },
    {
      id: "p14", authorId: "u4", type: "alert",
      content: "Reminder: never share your account credentials outside of the GT secure handoff portal. Three buyers reported phishing attempts this week.",
      likes: 1540, comments: [], sponsored: false,
      game: "", authorName: "CR4WLER", clanTag: "DVX", time: "11h ago",
    },
  ],
  sponsors: [
    { id: "s1", shop: "Axiom Vault", title: "Pinned marketplace broker post - 7 days", price: 99, status: "Running" },
    { id: "s2", shop: "Arena Campus", title: "Grassroots tournament banner", price: 149, status: "Pending" },
  ],
  transactions: [
    { id: "t1", user: "Neon Phantom", item: "Creator Boost Monthly", amount: 79, method: "GameTrust Wallet", time: "Seed" },
    { id: "t2", user: "Axiom Vault", item: "Pinned Shop Ad", amount: 99, method: "MoMo sandbox", time: "Seed" },
  ],
  notifications: [
    { id: "n1", type: "trade", title: "Trade Completed", content: "Your Freefire Heroic account sale of $249 has been released from escrow successfully.", time: "2m ago", unread: true, color: "cyan" },
    { id: "n2", type: "security", title: "Security Alert", content: "Login attempt from a new device (Chrome / Windows) detected. If this wasn't you, change your password immediately.", time: "14m ago", unread: true, color: "orange" },
    { id: "n3", type: "tournament", title: "Tournament Starting Soon", content: "Neon Circuit Open begins in 30 minutes. Your squad registration is confirmed. Check your bracket in the Tournament Hub.", time: "28m ago", unread: true, color: "fuchsia" },
    { id: "n4", type: "trade", title: "Escrow Funds Received", content: "Buyer DARKWAVE has deposited $189.50 into escrow for your Arena of Valor Conqueror account. Transfer when ready.", time: "1h ago", unread: true, color: "cyan" },
    { id: "n5", type: "security", title: "Suspicious Activity Blocked", content: "GameTrust auto-blocked a phishing attempt targeting your account. No action required — threat neutralised in 0.8s.", time: "2h ago", unread: false, color: "orange" },
    { id: "n6", type: "achievement", title: "Achievement Unlocked", content: "You've earned the Diamond Broker badge for completing 1,000 verified trades with zero disputes.", time: "3h ago", unread: false, color: "yellow" },
    { id: "n7", type: "clan", title: "Clan Rank Promotion", content: "[PSY] Phantom Syndicate has promoted you to Officer rank. You now have clan recruitment permissions.", time: "5h ago", unread: false, color: "green" },
    { id: "n8", type: "trade", title: "Dispute Resolved – In Your Favour", content: "Dispute #4821 has been resolved. $128.00 has been released from escrow and credited to your wallet.", time: "7h ago", unread: false, color: "cyan" },
    { id: "n9", type: "tournament", title: "Tournament Result", content: "DARKBYTE INVITATIONAL – Your team placed 2nd. Prize of $1,250 will be credited within 24 hours.", time: "1d ago", unread: false, color: "fuchsia" },
    { id: "n10", type: "trade", title: "New Offer on Your Listing", content: "PRISM_7 has made an offer of $215.00 on your Arena of Valor account listing. Review in Marketplace.", time: "1d ago", unread: false, color: "cyan" },
    { id: "n11", type: "security", title: "Trust Score Update", content: "Your Trust Score has increased to 9.9 / 10 following 3 consecutive dispute-free trades. Top 1% of brokers.", time: "1d ago", unread: false, color: "orange" },
    { id: "n12", type: "clan", title: "Clan War Invitation", content: "[NW] Neon Wolves has challenged [PSY] Phantom Syndicate to a clan war. Vote in the Clan Hub before midnight.", time: "2d ago", unread: false, color: "green" },
    { id: "n13", type: "achievement", title: "Leaderboard Milestone", content: "You've entered the Top 10 broker leaderboard for Freefire account sales this month. Keep it up.", time: "2d ago", unread: false, color: "yellow" },
    { id: "n14", type: "trade", title: "Escrow Released – Buyer Confirmed", content: "Buyer VECTOR_X has confirmed receipt of account credentials. $374.00 released from escrow to your wallet.", time: "3d ago", unread: false, color: "cyan" },
  ],
};

export function cloneSeed(): AppState {
  return JSON.parse(JSON.stringify(seedState)) as AppState;
}
