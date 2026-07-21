import type { AppState, User, Listing, Tournament, Clan, Post, Transaction, NotificationItem, Incident, Broker } from "@/lib/types";
import { cloneSeed } from "@/lib/data/seed-state";
import { listings as defaultListings } from "@/lib/data/listings";
import { clans as defaultClans } from "@/lib/data/clans";
import { initialTournaments } from "@/lib/data/tournaments";
import { initialIncidents, initialBrokers } from "@/lib/data/incidents";

// Local storage key for complete state synchronization
const MOCK_DB_KEY = "gametrust-next-mvp-state";

// Helper to get or initialize complete mock state
export function getMockDb(): AppState & {
  listings: Listing[];
  clans: Clan[];
  tournaments: Tournament[];
  incidents: Incident[];
  brokers: Broker[];
} {
  if (typeof window === "undefined") {
    return {
      ...cloneSeed(),
      listings: defaultListings,
      clans: defaultClans,
      tournaments: initialTournaments,
      incidents: initialIncidents,
      brokers: initialBrokers,
    };
  }

  const raw = window.localStorage.getItem(MOCK_DB_KEY);
  let db: any = {};
  if (raw) {
    try {
      db = JSON.parse(raw);
    } catch {
      db = {};
    }
  }

  // Ensure all collections exist
  const seed = cloneSeed();
  if (!db.users) db.users = seed.users;
  if (!db.currentUserId) db.currentUserId = seed.currentUserId;
  if (!db.cart) db.cart = seed.cart;
  if (!db.posts) db.posts = seed.posts;
  if (!db.sponsors) db.sponsors = seed.sponsors;
  if (!db.transactions) db.transactions = seed.transactions;
  if (!db.notifications) db.notifications = seed.notifications;

  if (!db.listings) db.listings = defaultListings;
  if (!db.clans) db.clans = defaultClans;
  if (!db.tournaments) db.tournaments = initialTournaments;
  if (!db.incidents) db.incidents = initialIncidents;
  if (!db.brokers) db.brokers = initialBrokers;

  return db;
}

export function saveMockDb(db: Partial<ReturnType<typeof getMockDb>>) {
  if (typeof window === "undefined") return;
  const current = getMockDb();
  const next = { ...current, ...db };
  window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(next));
}

// Simulate network latency (e.g. 300ms)
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Authentication
  auth: {
    me: async (): Promise<User> => {
      await delay();
      const db = getMockDb();
      return db.users.find((u) => u.id === db.currentUserId) || db.users[0];
    },
    updateProfile: async (draft: { name: string; game: string; rank: any; goal: string }): Promise<User> => {
      await delay();
      const db = getMockDb();
      db.users = db.users.map((u) => {
        if (u.id === db.currentUserId) {
          return {
            ...u,
            name: draft.name,
            game: draft.game,
            rank: draft.rank,
            goal: draft.goal,
          };
        }
        return u;
      });
      saveMockDb({ users: db.users });
      return db.users.find((u) => u.id === db.currentUserId)!;
    },
  },

  // Listings / Marketplace
  listings: {
    list: async (): Promise<Listing[]> => {
      await delay();
      return getMockDb().listings;
    },
    buy: async (id: string): Promise<Listing> => {
      await delay();
      const db = getMockDb();
      const listing = db.listings.find((l) => l.id === id);
      if (!listing) throw new Error("Listing not found");
      return listing;
    },
  },

  // Tournaments
  tournaments: {
    list: async (): Promise<Tournament[]> => {
      await delay();
      return getMockDb().tournaments;
    },
    join: async (id: string): Promise<Tournament> => {
      await delay();
      const db = getMockDb();
      const t = db.tournaments.find((item) => item.id === id);
      if (!t) throw new Error("Tournament not found");
      return t;
    },
  },

  // Clans
  clans: {
    list: async (): Promise<Clan[]> => {
      await delay();
      return getMockDb().clans;
    },
  },

  // Posts / Social Feed
  posts: {
    list: async (): Promise<Post[]> => {
      await delay();
      return getMockDb().posts;
    },
    create: async (post: Omit<Post, "id" | "likes" | "comments">): Promise<Post> => {
      await delay();
      const db = getMockDb();
      const newPost: Post = {
        ...post,
        id: `p${Date.now()}`,
        likes: 0,
        comments: [],
      };
      db.posts.unshift(newPost);
      saveMockDb({ posts: db.posts });
      return newPost;
    },
    like: async (id: string): Promise<Post> => {
      await delay();
      const db = getMockDb();
      const post = db.posts.find((p) => p.id === id);
      if (!post) throw new Error("Post not found");
      post.likes += 1;
      saveMockDb({ posts: db.posts });
      return post;
    },
  },

  // Notifications
  notifications: {
    list: async (): Promise<NotificationItem[]> => {
      await delay();
      return getMockDb().notifications;
    },
    markRead: async (id: string): Promise<NotificationItem[]> => {
      await delay();
      const db = getMockDb();
      db.notifications = db.notifications.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      );
      saveMockDb({ notifications: db.notifications });
      return db.notifications;
    },
    dismiss: async (id: string): Promise<NotificationItem[]> => {
      await delay();
      const db = getMockDb();
      db.notifications = db.notifications.filter((n) => n.id !== id);
      saveMockDb({ notifications: db.notifications });
      return db.notifications;
    },
    markAllRead: async (): Promise<NotificationItem[]> => {
      await delay();
      const db = getMockDb();
      db.notifications = db.notifications.map((n) => ({ ...n, unread: false }));
      saveMockDb({ notifications: db.notifications });
      return db.notifications;
    },
    clearAll: async (): Promise<NotificationItem[]> => {
      await delay();
      saveMockDb({ notifications: [] });
      return [];
    },
  },

  // Transactions
  transactions: {
    list: async (): Promise<Transaction[]> => {
      await delay();
      return getMockDb().transactions;
    },
    create: async (tx: Transaction): Promise<Transaction> => {
      await delay();
      const db = getMockDb();
      db.transactions.push(tx);
      saveMockDb({ transactions: db.transactions });
      return tx;
    },
  },

  // Admin / Incidents / Brokers
  admin: {
    incidents: async (): Promise<Incident[]> => {
      await delay();
      return getMockDb().incidents;
    },
    brokers: async (): Promise<Broker[]> => {
      await delay();
      return getMockDb().brokers;
    },
  },
};
