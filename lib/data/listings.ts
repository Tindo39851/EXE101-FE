import type { Listing, Plan, Role } from "@/lib/types";

export const listings: Listing[] = [
  { id: "l1", title: "Freefire", server: "SEA · AXIOM_V", badge: "Heroic", code: "FRE", wins: "1,842", skins: "143", level: "287", sold: "42", trust: "9.8/10", price: 249.00, accent: "#ff6b1a" },
  { id: "l2", title: "Arena of Valor", server: "AS · NULLSHIFT", badge: "Conqueror", code: "ARE", wins: "3,120", skins: "212", level: "201", sold: "31", trust: "9.6/10", price: 189.50, accent: "#c850f0" },
  { id: "l3", title: "Freefire", server: "SEA · CR4WLER", badge: "Grand Master", code: "FRE", wins: "2,341", skins: "89", level: "312", sold: "18", trust: "9.9/10", price: 374.00, accent: "#ff6b1a" },
  { id: "l4", title: "Arena of Valor", server: "EU · VECTOR_X", badge: "Legend", code: "ARE", wins: "4,102", skins: "67", level: "500", sold: "57", trust: "9.5/10", price: 134.99, accent: "#c850f0" },
  { id: "l5", title: "Freefire", server: "NA · AXIOM_V", badge: "Diamond", code: "FRE", wins: "1,567", skins: "201", level: "198", sold: "24", trust: "9.7/10", price: 299.00, accent: "#ff6b1a" },
  { id: "l6", title: "Arena of Valor", server: "SEA · NULLSHIFT", badge: "Warrior", code: "ARE", wins: "2,891", skins: "334", level: "452", sold: "63", trust: "9.4/10", price: 159.00, accent: "#c850f0" },
  { id: "l7", title: "Freefire", server: "SEA · AXIOM_V", badge: "Gold", code: "FRE", wins: "1,240", skins: "92", level: "89", sold: "141", trust: "9.2/10", price: 79.99, accent: "#ff6b1a" },
  { id: "l8", title: "Arena of Valor", server: "AS · NULLSHIFT", badge: "Diamond", code: "ARE", wins: "1,102", skins: "88", level: "201", sold: "36", trust: "9.5/10", price: 149.00, accent: "#c850f0" },
  { id: "l9", title: "Freefire", server: "EU · CR4WLER", badge: "Bronze", code: "FRE", wins: "2,760", skins: "140", level: "28", sold: "72", trust: "9.1/10", price: 89.50, accent: "#ff6b1a" },
  { id: "l10", title: "Arena of Valor", server: "NA · VECTOR_X", badge: "Commander", code: "ARE", wins: "1,980", skins: "61", level: "280", sold: "19", trust: "9.6/10", price: 210.00, accent: "#c850f0" },
];

export const plans: Plan[] = [
  { id: "premium-gamer", name: "Premium Gamer", price: 49000, desc: "Profile badge, priority team matching and trophy display.", buyerRoles: ["gamer", "creator"] as Role[] },
  { id: "creator-boost", name: "Creator Boost", price: 79000, desc: "Boost highlights on social feed and unlock engagement analytics.", buyerRoles: ["creator", "gamer"] as Role[] },
  { id: "shop-pin", name: "Shop / Pinned Ad", price: 99000, desc: "Pinned marketplace post for verified seller or game shop.", buyerRoles: ["shop", "admin"] as Role[] },
];
