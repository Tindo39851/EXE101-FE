import { create } from "zustand";
import type { Rank, Role, User } from "@/lib/types";

const TOKEN_KEY = "gametrust-token";
const USER_KEY = "gametrust-user";

export const guestUser: User = {
  id: "guest",
  role: "gamer",
  name: "Guest Operator",
  game: "Arena Of Valor",
  rank: "Platinum",
  goal: "Compete",
  premium: false,
  trustScore: 0,
};

function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function persistUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(USER_KEY);
  }
}

interface AuthState {
  isLoggedIn: boolean;
  currentUserId: string;
  users: User[];
  setIsLoggedIn: (loggedIn: boolean) => void;
  setSession: (user: User, token: string) => void;
  setCurrentUser: (user: User) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
  saveProfile: (draft: { name: string; game: string; rank: Rank; goal: string }) => void;
  setUsers: (users: User[]) => void;
  getCurrentUser: () => User;
}

const storedUser = readStoredUser();

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn:
    typeof window !== "undefined" &&
    Boolean(window.localStorage.getItem(TOKEN_KEY) && storedUser),
  currentUserId: storedUser?.id ?? guestUser.id,
  users: storedUser ? [storedUser] : [guestUser],

  setIsLoggedIn: (loggedIn) => {
    if (!loggedIn) {
      get().logout();
      return;
    }
    set({ isLoggedIn: true });
  },

  setSession: (user, token) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
    persistUser(user);
    set({ isLoggedIn: true, currentUserId: user.id, users: [user] });
  },

  setCurrentUser: (user) => {
    persistUser(user);
    set({ isLoggedIn: true, currentUserId: user.id, users: [user] });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    }
    set({
      isLoggedIn: false,
      currentUserId: guestUser.id,
      users: [guestUser],
    });
  },

  switchRole: () => {
    // Role switching requires a real sign-in and is handled by use-app-state.
  },

  saveProfile: (draft) => {
    const current = get().getCurrentUser();
    const user: User = {
      ...current,
      name: draft.name.trim() || current.name,
      game: draft.game,
      rank: draft.rank,
      goal: draft.goal,
    };
    get().setCurrentUser(user);
  },

  setUsers: (users) => {
    const current = users[0] ?? guestUser;
    set({ users: [current], currentUserId: current.id });
  },

  getCurrentUser: () => get().users[0] ?? guestUser,
}));
