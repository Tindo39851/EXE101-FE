import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppState, CartItem, Role, Rank, View, NotificationItem, Post, Sponsor, Transaction, User } from "@/lib/types";
import { games, ranks, goals, money, calculateTrustScore } from "@/lib/data/constants";
import { seedState, cloneSeed } from "@/lib/data/seed-state";
import { clans } from "@/lib/data/clans";
import { listings } from "@/lib/data/listings";
import { initialIncidents, initialBrokers } from "@/lib/data/incidents";
import { initialTournaments } from "@/lib/data/tournaments";

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
  const [view, setView] = useState<View>("overview");
  const [state, setState] = useState<AppState>(() => cloneSeed());
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const [profileDraft, setProfileDraft] = useState({ name: "", game: games[0], rank: "Diamond" as Rank, goal: goals[0] });
  const [postDraft, setPostDraft] = useState({ content: "", type: "highlight" });
  const [paymentMethod, setPaymentMethod] = useState("GameTrust Wallet");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [lastPurchased, setLastPurchased] = useState<CartItem | null>(null);

  const [selectedPayment, setSelectedPayment] = useState<"card" | "crypto" | "escrow">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const [selectedClanId, setSelectedClanId] = useState("c1");
  const [clanTierFilter, setClanTierFilter] = useState("ALL");
  const [clanRegionFilter, setClanRegionFilter] = useState("ALL");

  const [joinedClans, setJoinedClans] = useState<string[]>([]);

  const [communityTypeFilter, setCommunityTypeFilter] = useState("ALL");
  const [communitySortOrder, setCommunitySortOrder] = useState("RECENT");
  const [communitySearchQuery, setCommunitySearchQuery] = useState("");
  const [broadcastDraft, setBroadcastDraft] = useState("");

  const [trustTab, setTrustTab] = useState("OVERVIEW");
  const [incidents, setIncidents] = useState(initialIncidents);
  const [brokersList, setBrokersList] = useState(initialBrokers);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [emailDraft, setEmailDraft] = useState("");
  const [passwordDraft, setPasswordDraft] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupAccountName, setSignupAccountName] = useState("");
  const [signupFullName, setSignupFullName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupCaptchaChecked, setSignupCaptchaChecked] = useState(false);
  const [signupAgreePolicy, setSignupAgreePolicy] = useState(false);
  const [signupAgreeNews, setSignupAgreeNews] = useState(false);

  const [tourTab, setTourTab] = useState("ALL");
  const [selectedTour, setSelectedTour] = useState("t1");
  const [tournaments, setTournaments] = useState(initialTournaments);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [trustSort, setTrustSort] = useState<"none" | "desc" | "asc">("none");
  const [gameFilter, setGameFilter] = useState("ALL");

  // LocalStorage Hydration logic
  useEffect(() => {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AppState;
        if (!parsed.notifications) {
          parsed.notifications = cloneSeed().notifications;
        }
        if (!parsed.posts || parsed.posts.length < 14) {
          parsed.posts = cloneSeed().posts;
        }
        setState(parsed);
      } catch {
        setState(cloneSeed());
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem("gametrust-next-mvp-state", JSON.stringify(state));
    }
  }, [hydrated, state]);

  // Computed Values
  const currentUser = useMemo(() => {
    return state.users.find((user) => user.id === state.currentUserId) ?? state.users[0];
  }, [state]);

  useEffect(() => {
    setProfileDraft({ name: currentUser.name, game: currentUser.game, rank: currentUser.rank, goal: currentUser.goal });
  }, [currentUser]);

  const revenue = useMemo(() => {
    return state.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, [state.transactions]);

  const engagement = useMemo(() => {
    return state.posts.reduce((sum, post) => sum + post.likes + post.comments.length, 0);
  }, [state.posts]);

  const premiumUsers = useMemo(() => {
    return state.users.filter((user) => user.premium).length;
  }, [state.users]);

  const matches = useMemo(() => {
    return state.users
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
  }, [currentUser, state.users]);

  const [notifFilter, setNotifFilter] = useState<string>("ALL");
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);

  const filteredNotifications = useMemo(() => {
    let list = state.notifications || [];
    if (notifFilter !== "ALL") {
      list = list.filter(n => n.type.toUpperCase() === notifFilter);
    }
    if (unreadOnly) {
      list = list.filter(n => n.unread);
    }
    return list;
  }, [state.notifications, notifFilter, unreadOnly]);

  const filteredClans = useMemo(() => {
    return clans.filter((c) => {
      const matchTier = clanTierFilter === "ALL" || c.tier === clanTierFilter;
      const matchRegion = clanRegionFilter === "ALL" || c.region === clanRegionFilter;
      return matchTier && matchRegion;
    });
  }, [clanTierFilter, clanRegionFilter]);

  const activeClan = useMemo(() => {
    return clans.find((c) => c.id === selectedClanId) || clans[0];
  }, [selectedClanId]);

  const filteredPosts = useMemo(() => {
    let list = [...state.posts];
    if (communitySearchQuery.trim() !== "") {
      const q = communitySearchQuery.toLowerCase();
      list = list.filter(
        post =>
          post.content.toLowerCase().includes(q) ||
          (post.authorName || "").toLowerCase().includes(q) ||
          (post.game || "").toLowerCase().includes(q)
      );
    }
    if (communityTypeFilter !== "ALL") {
      list = list.filter(post => post.type.toUpperCase() === communityTypeFilter.toUpperCase());
    }
    if (communitySortOrder === "RECENT") {
      list.sort((a, b) => {
        const numA = parseInt(a.id.replace("p", "")) || 0;
        const numB = parseInt(b.id.replace("p", "")) || 0;
        return numA - numB;
      });
    } else {
      list.sort((a, b) => b.likes - a.likes);
    }
    return list;
  }, [state.posts, communitySearchQuery, communityTypeFilter, communitySortOrder]);

  const filteredListings = useMemo(() => {
    let list = [...listings];
    if (gameFilter !== "ALL") {
      list = list.filter(item => item.title.toLowerCase() === gameFilter.toLowerCase());
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.server.toLowerCase().includes(query) || 
        item.badge.toLowerCase().includes(query)
      );
    }
    if (priceMin.trim()) {
      const min = parseFloat(priceMin);
      if (!isNaN(min)) {
        list = list.filter(item => item.price >= min);
      }
    }
    if (priceMax.trim()) {
      const max = parseFloat(priceMax);
      if (!isNaN(max)) {
        list = list.filter(item => item.price <= max);
      }
    }
    if (trustSort === "desc") {
      list.sort((a, b) => parseFloat(b.trust) - parseFloat(a.trust));
    } else if (trustSort === "asc") {
      list.sort((a, b) => parseFloat(a.trust) - parseFloat(b.trust));
    }
    return list;
  }, [gameFilter, searchQuery, priceMin, priceMax, trustSort]);

  const groupedNotifs = useMemo(() => {
    const groups: Record<string, NotificationItem[]> = {
      "TODAY": [],
      "YESTERDAY": [],
      "2 DAYS AGO": [],
      "3 DAYS AGO": []
    };
    filteredNotifications.forEach(n => {
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

  // Action Functions
  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function updateState(updater: (draft: AppState) => void) {
    setState((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as AppState;
      updater(next);
      return next;
    });
  }

  function switchRole(role: Role) {
    updateState((draft) => {
      const user = draft.users.find((item) => item.role === role);
      if (user) draft.currentUserId = user.id;
    });
    notify(`Identity switched to ${role}.`);
  }

  function saveProfile() {
    updateState((draft) => {
      const user = draft.users.find((item) => item.id === draft.currentUserId);
      if (!user) return;
      user.name = profileDraft.name.trim() || user.name;
      user.game = profileDraft.game;
      user.rank = profileDraft.rank;
      user.goal = profileDraft.goal;
      user.trustScore = calculateTrustScore(user);
    });
    notify("Gamer profile saved. Trust Score recalculated.");
  }

  function publishPost() {
    const content = postDraft.content.trim();
    if (!content) return;
    updateState((draft) => {
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
    notify("Post published to the social feed.");
  }

  function buyCart(item: CartItem) {
    updateState((draft) => {
      draft.cart = item;
    });
    setView("checkout");
    setCheckoutStep(1);
    setLastPurchased(null);
    notify(`${item.name} added to escrow checkout.`);
  }

  function completeCheckout() {
    if (!state.cart) {
      notify("Cart is empty.");
      return;
    }
    setLastPurchased(state.cart);
    updateState((draft) => {
      if (!draft.cart) return;
      const user = draft.users.find((item) => item.id === draft.currentUserId) ?? draft.users[0];
      draft.transactions.push({
        id: `t${Date.now()}`,
        user: user.name,
        item: draft.cart.name,
        amount: draft.cart.price,
        method: paymentMethod,
        time: new Date().toLocaleString("en-US"),
      });
      if (draft.cart.id.includes("premium") || draft.cart.id.includes("creator")) {
        user.premium = true;
        user.trustScore = calculateTrustScore(user);
      }
      if (draft.cart.id === "shop-pin") {
        draft.sponsors.push({ id: `s${Date.now()}`, shop: user.name, title: "New pinned shop placement", price: draft.cart.price, status: "Running" });
      }
      draft.cart = null;
    });
    setCheckoutStep(3);
    notify("Payment complete. Revenue and admin dashboard updated.");
  }

  function markNotificationRead(id: string) {
    updateState((draft) => {
      const notif = draft.notifications.find((n) => n.id === id);
      if (notif) notif.unread = false;
    });
    notify("Notification marked as read.");
  }

  function dismissNotification(id: string) {
    updateState((draft) => {
      draft.notifications = draft.notifications.filter((n) => n.id !== id);
    });
    notify("Notification dismissed.");
  }

  function markAllNotificationsRead() {
    updateState((draft) => {
      draft.notifications.forEach((n) => (n.unread = false));
    });
    notify("All notifications marked as read.");
  }

  function clearAllNotifications() {
    updateState((draft) => {
      draft.notifications = [];
    });
    notify("All notifications cleared.");
  }

  function likePost(postId: string) {
    updateState((draft) => {
      const p = draft.posts.find(item => item.id === postId);
      if (p) {
        p.likes += 1;
      }
    });
    notify("Liked post successfully!");
  }

  function publishBroadcast() {
    if (broadcastDraft.trim() === "") {
      notify("Cannot broadcast empty message.");
      return;
    }
    updateState((draft) => {
      const newPost = {
        id: `p${draft.posts.length + 100}`,
        authorId: currentUser.id,
        type: "trade",
        content: broadcastDraft,
        likes: 0,
        comments: [],
        sponsored: false,
        game: currentUser.game,
        authorName: currentUser.name,
        clanTag: joinedClans.length > 0 ? (clans.find(c => c.id === joinedClans[0])?.tag || "") : "",
        time: "Just now",
      };
      draft.posts.unshift(newPost);
    });
    setBroadcastDraft("");
    notify("Broadcasted message successfully to the network!");
  }

  return {
    view, setView, state, setState, hydrated, toast, notify, updateState,
    profileDraft, setProfileDraft, postDraft, setPostDraft, paymentMethod, setPaymentMethod,
    showEditProfile, setShowEditProfile, checkoutStep, setCheckoutStep, lastPurchased, setLastPurchased,
    selectedPayment, setSelectedPayment, cardNumber, setCardNumber, cardHolder, setCardHolder,
    expiryDate, setExpiryDate, cvv, setCvv, agreedToTerms, setAgreedToTerms, showCvv, setShowCvv,
    selectedClanId, setSelectedClanId, clanTierFilter, setClanTierFilter, clanRegionFilter, setClanRegionFilter,
    joinedClans, setJoinedClans, communityTypeFilter, setCommunityTypeFilter, communitySortOrder, setCommunitySortOrder,
    communitySearchQuery, setCommunitySearchQuery, broadcastDraft, setBroadcastDraft,
    trustTab, setTrustTab, incidents, setIncidents, brokersList, setBrokersList,
    tourTab, setTourTab, selectedTour, setSelectedTour, tournaments, setTournaments,
    searchQuery, setSearchQuery, priceMin, setPriceMin, priceMax, setPriceMax, trustSort, setTrustSort,
    gameFilter, setGameFilter, isLoggedIn, setIsLoggedIn, emailDraft, setEmailDraft,
    passwordDraft, setPasswordDraft, rememberMe, setRememberMe, signupEmail, setSignupEmail,
    signupPassword, setSignupPassword, signupConfirmPassword, setSignupConfirmPassword,
    signupAccountName, setSignupAccountName, signupFullName, setSignupFullName, signupPhone, setSignupPhone,
    signupCaptchaChecked, setSignupCaptchaChecked, signupAgreePolicy, setSignupAgreePolicy,
    signupAgreeNews, setSignupAgreeNews, notifFilter, setNotifFilter, unreadOnly, setUnreadOnly,
    currentUser, revenue, engagement, premiumUsers, matches, filteredNotifications, filteredClans,
    activeClan, filteredPosts, filteredListings, groupedNotifs,
    switchRole, saveProfile, publishPost, buyCart, completeCheckout, markNotificationRead,
    dismissNotification, markAllNotificationsRead, clearAllNotifications, likePost, publishBroadcast
  };
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
