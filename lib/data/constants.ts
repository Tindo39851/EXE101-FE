import type { Rank, Role } from "@/lib/types";

// ─── Dropdown Options ─────────────────────────────────────────────────────────

export const games = ["Arena Of Valor", "FreeFire", "Valorant", "League Of Legends"];

export const ranks: Rank[] = ["Gold", "Platinum", "Diamond", "Master", "Challenger"];

export const goals = [
  "Rank push",
  "Casual squad",
  "Community tournament",
  "Highlight creator",
  "Review shop/account",
];

// ─── Currency Formatter ───────────────────────────────────────────────────────

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

// ─── Utility Functions ────────────────────────────────────────────────────────

export function calculateTrustScore(
  user: Pick<{ rank: Rank; role: Role; premium: boolean }, "rank" | "role" | "premium">
) {
  const rankScore: Record<Rank, number> = {
    Gold: 58,
    Platinum: 68,
    Diamond: 82,
    Master: 90,
    Challenger: 96,
  };
  const roleBonus = user.role === "shop" ? 4 : user.role === "creator" ? 3 : 0;
  const premiumBonus = user.premium ? 5 : 0;
  return Math.min(99, rankScore[user.rank] + roleBonus + premiumBonus);
}
