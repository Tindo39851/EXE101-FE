export const ENDPOINTS = {
  auth: {
    signIn: "auth/sign-in",
    signUp: "auth/sign-up",
  },
  users: {
    me: "users/me",
    profile: "users/me/profile",
    matches: "users/matches",
  },
  listings: {
    list: "listings",
    create: "listings",
    mine: "listings/mine",
  },
  tournaments: {
    list: "tournaments",
    detail: (id: string) => `tournaments/${id}`,
    create: "tournaments",
    teams: (id: string) => `tournaments/${id}/teams`,
    join: (id: string) => `tournaments/${id}/join`,
    myRegistrations: "tournaments/registrations/me",
  },
  clans: {
    list: "clans",
    detail: (id: string) => `clans/${id}`,
    create: "clans",
    join: (id: string) => `clans/${id}/join`,
    leave: (id: string) => `clans/${id}/leave`,
  },
  posts: {
    list: "posts",
    create: "posts",
    like: (id: string) => `posts/${id}/like`,
    comments: (id: string) => `posts/${id}/comments`,
  },
  notifications: {
    list: "notifications",
    read: (id: string) => `notifications/${id}/read`,
    dismiss: (id: string) => `notifications/${id}`,
    readAll: "notifications/read-all",
    clearAll: "notifications",
  },
  payments: {
    create: "payments/vnpay/create",
    detail: (id: string) => `payments/${id}`,
    callback: "payments/vnpay/return",
  },
} as const;
