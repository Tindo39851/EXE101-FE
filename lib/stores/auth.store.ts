import { create } from "zustand";
import type { User, Role, Rank } from "@/lib/types";
import { calculateTrustScore } from "@/lib/data/constants";

interface AuthState {
  isLoggedIn: boolean;
  currentUserId: string;
  users: User[];
  setIsLoggedIn: (loggedIn: boolean) => void;
  switchRole: (role: Role) => void;
  saveProfile: (draft: { name: string; game: string; rank: Rank; goal: string }) => void;
  setUsers: (users: User[]) => void;
  getCurrentUser: () => User;
}

const getInitialUsers = (): User[] => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.users) return parsed.users;
      } catch {
        // ignore
      }
    }
  }
  return [
    { id: "u1", role: "gamer", name: "User", game: "Arena Of Valor", rank: "Diamond", goal: "Rank push", premium: false, trustScore: 90 },
    { id: "u2", role: "creator", name: "Neon Phantom", game: "FreeFire", rank: "Master", goal: "Highlight creator", premium: true, trustScore: 96 },
    { id: "u3", role: "shop", name: "Axiom Vault", game: "Valorant", rank: "Platinum", goal: "Review shop/account", premium: false, trustScore: 84 },
    { id: "u4", role: "admin", name: "TrustOps Admin", game: "Arena Of Valor", rank: "Master", goal: "Community tournament", premium: true, trustScore: 99 },
  ];
};

const getInitialUserId = (): string => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.currentUserId) return parsed.currentUserId;
      } catch {
        // ignore
      }
    }
  }
  return "u1";
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: true,
  currentUserId: getInitialUserId(),
  users: getInitialUsers(),

  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

  switchRole: (role) => {
    const { users } = get();
    const matchedUser = users.find((u) => u.role === role);
    if (matchedUser) {
      set({ currentUserId: matchedUser.id });
    }
  },

  saveProfile: (draft) => {
    set((state) => {
      const updatedUsers = state.users.map((u) => {
        if (u.id === state.currentUserId) {
          const updated = {
            ...u,
            name: draft.name.trim() || u.name,
            game: draft.game,
            rank: draft.rank,
            goal: draft.goal,
          };
          updated.trustScore = calculateTrustScore(updated);
          return updated;
        }
        return u;
      });

      // Save to localStorage if possible
      if (typeof window !== "undefined") {
        const raw = window.localStorage.getItem("gametrust-next-mvp-state") || "{}";
        try {
          const parsed = JSON.parse(raw);
          parsed.users = updatedUsers;
          window.localStorage.setItem("gametrust-next-mvp-state", JSON.stringify(parsed));
        } catch {
          // ignore
        }
      }

      return { users: updatedUsers };
    });
  },

  setUsers: (users) => set({ users }),

  getCurrentUser: () => {
    const { users, currentUserId } = get();
    return users.find((u) => u.id === currentUserId) || users[0];
  },
}));
