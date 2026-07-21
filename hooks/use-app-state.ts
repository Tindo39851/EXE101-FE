import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppState, CartItem, Role, Rank, View, NotificationItem, Post, Sponsor, Transaction, User } from "@/lib/types";
import { games, ranks, goals, money, calculateTrustScore } from "@/lib/data/constants";
import { clans } from "@/lib/data/clans";
import { listings } from "@/lib/data/listings";
import { initialIncidents, initialBrokers } from "@/lib/data/incidents";
import { initialTournaments } from "@/lib/data/tournaments";

// Import new Zustand stores
import { useAuthStore } from "@/lib/stores/auth.store";
import { useUIStore } from "@/lib/stores/ui.store";
import { useCheckoutStore } from "@/lib/stores/checkout.store";
import { useFiltersStore } from "@/lib/stores/filters.store";
import { getMockDb, saveMockDb } from "@/lib/api/adapters/mock";

// Define the full context state interface
export interface AppContextType {
  // General State
  view: View;
  setView: (view: View) => void;
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  hydrated: boolean;
  toast: string;
  notify: (msg: string) => void;
  updateState: (updater: (draft: AppState) => void) => void;

  // Profile / Auth
  profileDraft: { name: string; game: string; rank: Rank; goal: string };
  setProfileDraft: React.Dispatch<React.SetStateAction<{ name: string; game: string; rank: Rank; goal: string }>>;
  postDraft: { content: string; type: string };
  setPostDraft: React.Dispatch<React.SetStateAction<{ content: string; type: string }>>;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  showEditProfile: boolean;
  setShowEditProfile: (show: boolean) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  lastPurchased: CartItem | null;
  setLastPurchased: (item: CartItem | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  emailDraft: string;
  setEmailDraft: (email: string) => void;
  passwordDraft: string;
  setPasswordDraft: (pw: string) => void;
  rememberMe: boolean;
  setRememberMe: (rem: boolean) => void;

  // SignUp States
  signupEmail: string;
  setSignupEmail: (val: string) => void;
  signupPassword: string;
  setSignupPassword: (val: string) => void;
  signupConfirmPassword: string;
  setSignupConfirmPassword: (val: string) => void;
  signupAccountName: string;
  setSignupAccountName: (val: string) => void;
  signupFullName: string;
  setSignupFullName: (val: string) => void;
  signupPhone: string;
  setSignupPhone: (val: string) => void;
  signupCaptchaChecked: boolean;
  setSignupCaptchaChecked: (val: boolean) => void;
  signupAgreePolicy: boolean;
  setSignupAgreePolicy: (val: boolean) => void;
  signupAgreeNews: boolean;
  setSignupAgreeNews: (val: boolean) => void;

  // Checkout States
  selectedPayment: "card" | "crypto" | "escrow";
  setSelectedPayment: (val: "card" | "crypto" | "escrow") => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  expiryDate: string;
  setExpiryDate: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (val: boolean) => void;
  showCvv: boolean;
  setShowCvv: (val: boolean) => void;

  // Clan States
  selectedClanId: string;
  setSelectedClanId: (val: string) => void;
  clanTierFilter: string;
  setClanTierFilter: (val: string) => void;
  clanRegionFilter: string;
  setClanRegionFilter: (val: string) => void;
  joinedClans: string[];
  setJoinedClans: React.Dispatch<React.SetStateAction<string[]>>;

  // Community States
  communityTypeFilter: string;
  setCommunityTypeFilter: (val: string) => void;
  communitySortOrder: string;
  setCommunitySortOrder: (val: string) => void;
  communitySearchQuery: string;
  setCommunitySearchQuery: (val: string) => void;
  broadcastDraft: string;
  setBroadcastDraft: (val: string) => void;

  // Admin / Trust States
  trustTab: string;
  setTrustTab: (val: string) => void;
  incidents: any[];
  setIncidents: React.Dispatch<React.SetStateAction<any[]>>;
  brokersList: any[];
  setBrokersList: React.Dispatch<React.SetStateAction<any[]>>;

  // Notifications Filter States
  notifFilter: string;
  setNotifFilter: (val: string) => void;
  unreadOnly: boolean;
  setUnreadOnly: (val: boolean) => void;

  // Tournaments States
  tourTab: string;
  setTourTab: (val: string) => void;
  selectedTour: string;
  setSelectedTour: (val: string) => void;
  tournaments: any[];
  setTournaments: React.Dispatch<React.SetStateAction<any[]>>;

  // Marketplace Search/Filters
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  priceMin: string;
  setPriceMin: (val: string) => void;
  priceMax: string;
  setPriceMax: (val: string) => void;
  trustSort: "none" | "desc" | "asc";
  setTrustSort: (val: "none" | "desc" | "asc") => void;
  gameFilter: string;
  setGameFilter: (val: string) => void;

  // Computed Values
  currentUser: User;
  revenue: number;
  engagement: number;
  premiumUsers: number;
  matches: any[];
  filteredNotifications: NotificationItem[];
  filteredClans: any[];
  activeClan: any;
  filteredPosts: Post[];
  filteredListings: any[];
  groupedNotifs: Record<string, NotificationItem[]>;

  // Actions
  switchRole: (role: Role) => void;
  saveProfile: () => void;
  publishPost: () => void;
  buyCart: (item: CartItem) => void;
  completeCheckout: () => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
  likePost: (postId: string) => void;
  publishBroadcast: () => void;
}

export const AppStateContext = createContext<AppContextType | undefined>(undefined);

export function useAppStateInternal(): AppContextType {
  const [hydrated, setHydrated] = useState(false);
  const [dbState, setDbState] = useState<AppState>(() => getMockDb());

  // Zustand Store mappings
  const auth = useAuthStore();
  const ui = useUIStore();
  const checkout = useCheckoutStore();
  const filters = useFiltersStore();

  // Local draft states to preserve legacy form behaviors
  const [profileDraft, setProfileDraft] = useState({ name: "", game: games[0], rank: "Diamond" as Rank, goal: goals[0] });
  const [postDraft, setPostDraft] = useState({ content: "", type: "highlight" });
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Authentication draft states
  const [emailDraft, setEmailDraft] = useState("");
  const [passwordDraft, setPasswordDraft] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // SignUp draft states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupAccountName, setSignupAccountName] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupCaptchaChecked, setSignupCaptchaChecked] = useState(false);
  const [signupAgreePolicy, setSignupAgreePolicy] = useState(false);
  const [signupAgreeNews, setSignupAgreeNews] = useState(false);

  // Admin/Tournament mock lists sync'd to local mock db
  const [incidents, setIncidents] = useState(initialIncidents);
  const [brokersList, setBrokersList] = useState(initialBrokers);
  const [tournaments, setTournaments] = useState(initialTournaments);

  const [notifFilter, setNotifFilter] = useState<string>("ALL");
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);

  // Hydration sync
  useEffect(() => {
    setDbState(getMockDb());
    setHydrated(true);
  }, []);

  // Sync state between hook local db representation and Zustand
  useEffect(() => {
    if (hydrated) {
      const db = getMockDb();
      auth.setUsers(db.users);
      ui.setNotifications(db.notifications);
    }
  }, [hydrated]);

  // Sync profile draft when current user changes
  const currentUser = auth.getCurrentUser();
  useEffect(() => {
    setProfileDraft({ name: currentUser.name, game: currentUser.game, rank: currentUser.rank, goal: currentUser.goal });
  }, [currentUser]);

  // Legacy AppState mapping
  const appState: AppState = useMemo(() => {
    return {
      currentUserId: auth.currentUserId,
      cart: checkout.cart,
      users: auth.users,
      posts: dbState.posts,
      sponsors: dbState.sponsors,
      transactions: dbState.transactions,
      notifications: ui.notifications,
    };
  }, [auth.currentUserId, checkout.cart, auth.users, dbState.posts, dbState.sponsors, dbState.transactions, ui.notifications]);

  // Actions wrapped to sync with mock DB + notify
  const updateDbState = (updater: (draft: AppState) => void) => {
    const current = getMockDb();
    const copy = JSON.parse(JSON.stringify(current)) as AppState;
    updater(copy);
    saveMockDb(copy);
    setDbState(copy);
  };

  const switchRole = (role: Role) => {
    auth.switchRole(role);
    ui.notify(`Identity switched to ${role}.`);
  };

  const saveProfile = () => {
    auth.saveProfile(profileDraft);
    // Sync into local mock db file state
    updateDbState((draft) => {
      const user = draft.users.find((u) => u.id === draft.currentUserId);
      if (user) {
        user.name = profileDraft.name.trim() || user.name;
        user.game = profileDraft.game;
        user.rank = profileDraft.rank;
        user.goal = profileDraft.goal;
        user.trustScore = calculateTrustScore(user);
      }
    });
    ui.notify("Gamer profile saved. Trust Score recalculated.");
  };

  const publishPost = () => {
    const content = postDraft.content.trim();
    if (!content) return;
    updateDbState((draft) => {
      draft.posts.unshift({
        id: `p${Date.now()}`,
        authorId: draft.currentUserId,
        type: postDraft.type,
        content,
        likes: 0,
        comments: [],
        sponsored: false,
      });
    });
    setPostDraft({ content: "", type: "highlight" });
    ui.notify("Post published to the social feed.");
  };

  const buyCart = (item: CartItem) => {
    checkout.buyCart(item);
  };

  const completeCheckout = () => {
    checkout.completeCheckout((newTx) => {
      updateDbState((draft) => {
        draft.transactions.push(newTx);
        const user = draft.users.find((u) => u.id === draft.currentUserId) || draft.users[0];
        if (checkout.cart?.id.includes("premium") || checkout.cart?.id.includes("creator")) {
          user.premium = true;
          user.trustScore = calculateTrustScore(user);
        }
        if (checkout.cart?.id === "shop-pin") {
          draft.sponsors.push({
            id: `s${Date.now()}`,
            shop: user.name,
            title: "New pinned shop placement",
            price: checkout.cart.price,
            status: "Running",
          });
        }
      });
      ui.notify("Payment complete. Revenue and admin dashboard updated.");
    });
  };

  const publishBroadcast = () => {
    if (filters.broadcastDraft.trim() === "") {
      ui.notify("Cannot broadcast empty message.");
      return;
    }
    updateDbState((draft) => {
      const newPost = {
        id: `p${draft.posts.length + 100}`,
        authorId: auth.currentUserId,
        type: "trade",
        content: filters.broadcastDraft,
        likes: 0,
        comments: [],
        sponsored: false,
        game: currentUser.game,
        authorName: currentUser.name,
        clanTag: filters.joinedClans.length > 0 ? (clans.find(c => c.id === filters.joinedClans[0])?.tag || "") : "",
        time: "Just now",
      };
      draft.posts.unshift(newPost);
    });
    filters.setBroadcastDraft("");
    ui.notify("Broadcasted message successfully to the network!");
  };

  const likePost = (postId: string) => {
    updateDbState((draft) => {
      const p = draft.posts.find((item) => item.id === postId);
      if (p) p.likes += 1;
    });
    ui.notify("Liked post successfully!");
  };

  // Computed Values
  const revenue = useMemo(() => {
    return dbState.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, [dbState.transactions]);

  const engagement = useMemo(() => {
    return dbState.posts.reduce((sum, post) => sum + post.likes + post.comments.length, 0);
  }, [dbState.posts]);

  const premiumUsers = useMemo(() => {
    return auth.users.filter((user) => user.premium).length;
  }, [auth.users]);

  const matches = useMemo(() => {
    return auth.users
      .filter((candidate) => candidate.id !== currentUser.id && candidate.role !== "admin")
      .map((candidate) => {
        let score = 35;
        if (candidate.game === currentUser.game) score += 30;
        if (candidate.rank === currentUser.rank) score += 20;
        if (candidate.goal === currentUser.goal) score += 15;
        if (candidate.premium) score += 5;
        return { ...candidate, matchScore: Math.min(100, score) };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [currentUser, auth.users]);

  const filteredNotifications = useMemo(() => {
    let list = ui.notifications;
    if (notifFilter !== "ALL") {
      list = list.filter((n) => n.type.toUpperCase() === notifFilter);
    }
    if (unreadOnly) {
      list = list.filter((n) => n.unread);
    }
    return list;
  }, [ui.notifications, notifFilter, unreadOnly]);

  const filteredClans = useMemo(() => {
    return clans.filter((c) => {
      const matchTier = filters.clanTierFilter === "ALL" || c.tier === filters.clanTierFilter;
      const matchRegion = filters.clanRegionFilter === "ALL" || c.region === filters.clanRegionFilter;
      return matchTier && matchRegion;
    });
  }, [filters.clanTierFilter, filters.clanRegionFilter]);

  const activeClan = useMemo(() => {
    return clans.find((c) => c.id === filters.selectedClanId) || clans[0];
  }, [filters.selectedClanId]);

  const filteredPosts = useMemo(() => {
    let list = [...dbState.posts];
    if (filters.communitySearchQuery.trim() !== "") {
      const q = filters.communitySearchQuery.toLowerCase();
      list = list.filter(
        (post) =>
          post.content.toLowerCase().includes(q) ||
          (post.authorName || "").toLowerCase().includes(q) ||
          (post.game || "").toLowerCase().includes(q)
      );
    }
    if (filters.communityTypeFilter !== "ALL") {
      list = list.filter((post) => post.type.toUpperCase() === filters.communityTypeFilter.toUpperCase());
    }
    if (filters.communitySortOrder === "RECENT") {
      list.sort((a, b) => {
        const numA = parseInt(a.id.replace("p", "")) || 0;
        const numB = parseInt(b.id.replace("p", "")) || 0;
        return numA - numB;
      });
    } else {
      list.sort((a, b) => b.likes - a.likes);
    }
    return list;
  }, [dbState.posts, filters.communitySearchQuery, filters.communityTypeFilter, filters.communitySortOrder]);

  const filteredListings = useMemo(() => {
    let list = [...listings];
    if (filters.gameFilter !== "ALL") {
      list = list.filter((item) => item.title.toLowerCase() === filters.gameFilter.toLowerCase());
    }
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      list = list.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.server.toLowerCase().includes(query) ||
        item.badge.toLowerCase().includes(query)
      );
    }
    if (filters.priceMin.trim()) {
      const min = parseFloat(filters.priceMin);
      if (!isNaN(min)) {
        list = list.filter((item) => item.price >= min);
      }
    }
    if (filters.priceMax.trim()) {
      const max = parseFloat(filters.priceMax);
      if (!isNaN(max)) {
        list = list.filter((item) => item.price <= max);
      }
    }
    if (filters.trustSort === "desc") {
      list.sort((a, b) => parseFloat(b.trust) - parseFloat(a.trust));
    } else if (filters.trustSort === "asc") {
      list.sort((a, b) => parseFloat(a.trust) - parseFloat(b.trust));
    }
    return list;
  }, [filters.gameFilter, filters.searchQuery, filters.priceMin, filters.priceMax, filters.trustSort]);

  const groupedNotifs = useMemo(() => {
    const groups: Record<string, NotificationItem[]> = {
      "TODAY": [],
      "YESTERDAY": [],
      "2 DAYS AGO": [],
      "3 DAYS AGO": [],
    };
    filteredNotifications.forEach((n) => {
      if (n.time.includes("m") || n.time.includes("h")) {
        groups["TODAY"].push(n);
      } else if (n.time.includes("1d")) {
        groups["YESTERDAY"].push(n);
      } else if (n.time.includes("2d")) {
        groups["2 DAYS AGO"].push(n);
      } else {
        groups["3 DAYS AGO"].push(n);
      }
    });
    return groups;
  }, [filteredNotifications]);

  return {
    view: ui.view,
    setView: ui.setView,
    state: appState,
    setState: () => {}, // Disabled in bridge, write mutations via updates
    hydrated,
    toast: ui.toast,
    notify: ui.notify,
    updateState: updateDbState,

    profileDraft,
    setProfileDraft,
    postDraft,
    setPostDraft,
    paymentMethod: checkout.paymentMethod,
    setPaymentMethod: checkout.setPaymentMethod,
    showEditProfile,
    setShowEditProfile,
    checkoutStep: checkout.checkoutStep,
    setCheckoutStep: checkout.setCheckoutStep,
    lastPurchased: checkout.lastPurchased,
    setLastPurchased: checkout.setLastPurchased,

    selectedPayment: checkout.selectedPayment,
    setSelectedPayment: checkout.setSelectedPayment,
    cardNumber: checkout.cardNumber,
    setCardNumber: checkout.setCardNumber,
    cardHolder: checkout.cardHolder,
    setCardHolder: checkout.setCardHolder,
    expiryDate: checkout.expiryDate,
    setExpiryDate: checkout.setExpiryDate,
    cvv: checkout.cvv,
    setCvv: checkout.setCvv,
    agreedToTerms: checkout.agreedToTerms,
    setAgreedToTerms: checkout.setAgreedToTerms,
    showCvv: checkout.showCvv,
    setShowCvv: checkout.setShowCvv,

    selectedClanId: filters.selectedClanId,
    setSelectedClanId: filters.setSelectedClanId,
    clanTierFilter: filters.clanTierFilter,
    setClanTierFilter: filters.setClanTierFilter,
    clanRegionFilter: filters.clanRegionFilter,
    setClanRegionFilter: filters.setClanRegionFilter,
    joinedClans: filters.joinedClans,
    setJoinedClans: (val: any) => filters.setJoinedClans(val),

    communityTypeFilter: filters.communityTypeFilter,
    setCommunityTypeFilter: filters.setCommunityTypeFilter,
    communitySortOrder: filters.communitySortOrder,
    setCommunitySortOrder: filters.setCommunitySortOrder,
    communitySearchQuery: filters.communitySearchQuery,
    setCommunitySearchQuery: filters.setCommunitySearchQuery,
    broadcastDraft: filters.broadcastDraft,
    setBroadcastDraft: filters.setBroadcastDraft,

    trustTab: filters.trustTab,
    setTrustTab: filters.setTrustTab,
    incidents,
    setIncidents,
    brokersList,
    setBrokersList,

    notifFilter,
    setNotifFilter,
    unreadOnly,
    setUnreadOnly,

    tourTab: filters.tourTab,
    setTourTab: filters.setTourTab,
    selectedTour: filters.selectedTour,
    setSelectedTour: filters.setSelectedTour,
    tournaments,
    setTournaments,

    searchQuery: filters.searchQuery,
    setSearchQuery: filters.setSearchQuery,
    priceMin: filters.priceMin,
    setPriceMin: filters.setPriceMin,
    priceMax: filters.priceMax,
    setPriceMax: filters.setPriceMax,
    trustSort: filters.trustSort,
    setTrustSort: filters.setTrustSort,
    gameFilter: filters.gameFilter,
    setGameFilter: filters.setGameFilter,

    isLoggedIn: auth.isLoggedIn,
    setIsLoggedIn: auth.setIsLoggedIn,
    emailDraft,
    setEmailDraft,
    passwordDraft,
    setPasswordDraft,
    rememberMe,
    setRememberMe,

    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,
    signupAccountName,
    setSignupAccountName,
    signupFullName,
    setSignupFullName,
    signupPhone,
    setSignupPhone,
    signupCaptchaChecked,
    setSignupCaptchaChecked,
    signupAgreePolicy,
    setSignupAgreePolicy,
    signupAgreeNews,
    setSignupAgreeNews,

    currentUser,
    revenue,
    engagement,
    premiumUsers,
    matches,
    filteredNotifications,
    filteredClans,
    activeClan,
    filteredPosts,
    filteredListings,
    groupedNotifs,

    switchRole,
    saveProfile,
    publishPost,
    buyCart,
    completeCheckout,
    markNotificationRead: ui.markNotificationRead,
    dismissNotification: ui.dismissNotification,
    markAllNotificationsRead: ui.markAllNotificationsRead,
    clearAllNotifications: ui.clearAllNotifications,
    likePost,
    publishBroadcast,
  };
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
