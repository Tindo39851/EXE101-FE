import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AppState,
  CartItem,
  Clan,
  Listing,
  NotificationItem,
  Post,
  Rank,
  Role,
  Tournament,
  User,
  View,
} from "@/lib/types";
import { games, goals } from "@/lib/data/constants";
import { clans as fallbackClans } from "@/lib/data/clans";
import { listings as fallbackListings } from "@/lib/data/listings";
import { initialTournaments } from "@/lib/data/tournaments";
import { initialIncidents, initialBrokers } from "@/lib/data/incidents";
import { cloneSeed } from "@/lib/data/seed-state";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCheckoutStore } from "@/lib/stores/checkout.store";
import { useFiltersStore } from "@/lib/stores/filters.store";
import { useUIStore } from "@/lib/stores/ui.store";
import { gameTrustApi } from "@/lib/api/gametrust";
import {
  mapClan,
  mapListing,
  mapMatch,
  mapNotification,
  mapPost,
  mapTournament,
  mapUser,
} from "@/lib/api/mappers";
import type {
  ApiPostType,
  AuthDto,
  RegistrationDto,
} from "@/lib/api/contracts";

export interface AppContextType {
  view: View;
  setView: (view: View) => void;
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  hydrated: boolean;
  isBusy: boolean;
  toast: string;
  notify: (msg: string) => void;
  updateState: (updater: (draft: AppState) => void) => void;

  profileDraft: { name: string; game: string; rank: Rank; goal: string };
  setProfileDraft: React.Dispatch<
    React.SetStateAction<{ name: string; game: string; rank: Rank; goal: string }>
  >;
  postDraft: { content: string; type: string };
  setPostDraft: React.Dispatch<
    React.SetStateAction<{ content: string; type: string }>
  >;
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
  setPasswordDraft: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;

  signupEmail: string;
  setSignupEmail: (value: string) => void;
  signupPassword: string;
  setSignupPassword: (value: string) => void;
  signupConfirmPassword: string;
  setSignupConfirmPassword: (value: string) => void;
  signupAccountName: string;
  setSignupAccountName: (value: string) => void;
  signupFullName: string;
  setSignupFullName: (value: string) => void;
  signupPhone: string;
  setSignupPhone: (value: string) => void;
  signupCaptchaChecked: boolean;
  setSignupCaptchaChecked: (value: boolean) => void;
  signupAgreePolicy: boolean;
  setSignupAgreePolicy: (value: boolean) => void;
  signupAgreeNews: boolean;
  setSignupAgreeNews: (value: boolean) => void;

  selectedPayment: "card" | "crypto" | "escrow";
  setSelectedPayment: (value: "card" | "crypto" | "escrow") => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  agreedToTerms: boolean;
  setAgreedToTerms: (value: boolean) => void;
  showCvv: boolean;
  setShowCvv: (value: boolean) => void;

  clans: Clan[];
  selectedClanId: string;
  setSelectedClanId: (value: string) => void;
  clanTierFilter: string;
  setClanTierFilter: (value: string) => void;
  clanRegionFilter: string;
  setClanRegionFilter: (value: string) => void;
  joinedClans: string[];
  setJoinedClans: React.Dispatch<React.SetStateAction<string[]>>;

  communityTypeFilter: string;
  setCommunityTypeFilter: (value: string) => void;
  communitySortOrder: string;
  setCommunitySortOrder: (value: string) => void;
  communitySearchQuery: string;
  setCommunitySearchQuery: (value: string) => void;
  broadcastDraft: string;
  setBroadcastDraft: (value: string) => void;

  trustTab: string;
  setTrustTab: (value: string) => void;
  incidents: any[];
  setIncidents: React.Dispatch<React.SetStateAction<any[]>>;
  brokersList: any[];
  setBrokersList: React.Dispatch<React.SetStateAction<any[]>>;

  notifFilter: string;
  setNotifFilter: (value: string) => void;
  unreadOnly: boolean;
  setUnreadOnly: (value: boolean) => void;

  tourTab: string;
  setTourTab: (value: string) => void;
  selectedTour: string;
  setSelectedTour: (value: string) => void;
  tournaments: Tournament[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  registeredTournamentIds: string[];

  listings: Listing[];
  myListings: Listing[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  trustSort: "none" | "desc" | "asc";
  setTrustSort: (value: "none" | "desc" | "asc") => void;
  gameFilter: string;
  setGameFilter: (value: string) => void;

  currentUser: User;
  revenue: number;
  engagement: number;
  premiumUsers: number;
  matches: Array<User & { matchScore: number }>;
  filteredNotifications: NotificationItem[];
  filteredClans: Clan[];
  activeClan?: Clan;
  filteredPosts: Post[];
  filteredListings: Listing[];
  groupedNotifs: Record<string, NotificationItem[]>;

  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  logout: () => void;
  switchRole: (role: Role) => Promise<void>;
  saveProfile: () => Promise<void>;
  publishPost: () => Promise<void>;
  buyCart: (item: CartItem) => void;
  completeCheckout: () => Promise<void>;
  joinClan: (id: string) => Promise<void>;
  leaveClan: (id: string) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  dismissNotification: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  commentPost: (postId: string, content: string) => Promise<void>;
  publishBroadcast: () => Promise<void>;
}

export const AppStateContext = createContext<AppContextType | undefined>(
  undefined
);

const seedAccounts: Partial<Record<Role, string>> = {
  gamer: "gamer@gametrust.dev",
  creator: "creator@gametrust.dev",
  shop: "seller@gametrust.dev",
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unexpected API error.";
}

function toPostType(value: string): ApiPostType {
  const type = value.toUpperCase() as ApiPostType;
  const allowed: ApiPostType[] = [
    "TRADE",
    "TOURNAMENT",
    "ALERT",
    "LISTING",
    "RECRUIT",
    "ACHIEVEMENT",
    "HIGHLIGHT",
  ];
  return allowed.includes(type) ? type : "HIGHLIGHT";
}

export function useAppStateInternal(): AppContextType {
  const [hydrated, setHydrated] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [dbState, setDbState] = useState<AppState>(() => cloneSeed());
  const [clanItems, setClanItems] = useState<Clan[]>(fallbackClans);
  const [listingItems, setListingItems] =
    useState<Listing[]>(fallbackListings);
  const [myListingItems, setMyListingItems] = useState<Listing[]>([]);
  const [tournaments, setTournaments] =
    useState<Tournament[]>(initialTournaments);
  const [registrations, setRegistrations] = useState<RegistrationDto[]>([]);
  const [matchItems, setMatchItems] = useState<
    Array<User & { matchScore: number }>
  >([]);

  const auth = useAuthStore();
  const ui = useUIStore();
  const checkout = useCheckoutStore();
  const filters = useFiltersStore();

  const [profileDraft, setProfileDraft] = useState({
    name: "",
    game: games[0],
    rank: "Diamond" as Rank,
    goal: goals[0],
  });
  const [postDraft, setPostDraft] = useState({
    content: "",
    type: "highlight",
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
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
  const [incidents, setIncidents] = useState(initialIncidents);
  const [brokersList, setBrokersList] = useState(initialBrokers);
  const [notifFilter, setNotifFilter] = useState("ALL");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const currentUser = auth.getCurrentUser();

  const loadPrivateData = async () => {
    const [
      notificationResult,
      matchResult,
      registrationResult,
      myListingsResult,
    ] =
      await Promise.allSettled([
        gameTrustApi.notifications.list(),
        gameTrustApi.users.matches(),
        gameTrustApi.tournaments.myRegistrations(),
        gameTrustApi.listings.mine(),
      ]);

    if (notificationResult.status === "fulfilled") {
      ui.setNotifications(notificationResult.value.map(mapNotification));
    }
    if (matchResult.status === "fulfilled") {
      setMatchItems(matchResult.value.map(mapMatch));
    }
    if (registrationResult.status === "fulfilled") {
      setRegistrations(registrationResult.value);
    }
    if (myListingsResult.status === "fulfilled") {
      setMyListingItems(myListingsResult.value.map(mapListing));
    }
  };

  const loadPublicData = async () => {
    const [tournamentResult, clanResult, postResult, listingResult] =
      await Promise.allSettled([
        gameTrustApi.tournaments.list(),
        gameTrustApi.clans.list(),
        gameTrustApi.posts.list(),
        gameTrustApi.listings.list(),
      ]);

    if (tournamentResult.status === "fulfilled") {
      const mapped = tournamentResult.value.map(mapTournament);
      setTournaments(mapped);
      if (mapped.length) filters.setSelectedTour(mapped[0].id);
    }
    if (clanResult.status === "fulfilled") {
      const mapped = clanResult.value.map(mapClan);
      setClanItems(mapped);
      filters.setJoinedClans(
        mapped.filter((clan) => clan.joined).map((clan) => clan.id)
      );
      if (mapped.length) filters.setSelectedClanId(mapped[0].id);
    }
    if (postResult.status === "fulfilled") {
      setDbState((state) => ({
        ...state,
        posts: postResult.value.map(mapPost),
      }));
    }
    if (listingResult.status === "fulfilled") {
      setListingItems(listingResult.value.map(mapListing));
    }

    const failed = [
      tournamentResult,
      clanResult,
      postResult,
      listingResult,
    ].some((result) => result.status === "rejected");
    if (failed) {
      ui.notify("Some live data could not be loaded. Showing cached demo data.");
    }
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("gametrust-token")
          : null;
      if (token) {
        try {
          const user = mapUser(await gameTrustApi.users.me());
          if (active) auth.setCurrentUser(user);
        } catch {
          if (active) auth.logout();
        }
      }

      await loadPublicData();
      if (useAuthStore.getState().isLoggedIn) {
        await loadPrivateData();
      }
      if (active) setHydrated(true);
    };

    void bootstrap();
    return () => {
      active = false;
    };
    // Bootstrap is intentionally run once for the persisted browser session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setProfileDraft({
      name: currentUser.name,
      game: currentUser.game,
      rank: currentUser.rank,
      goal: currentUser.goal,
    });
  }, [
    currentUser.id,
    currentUser.name,
    currentUser.game,
    currentUser.rank,
    currentUser.goal,
  ]);

  const appState: AppState = useMemo(
    () => ({
      currentUserId: currentUser.id,
      cart: checkout.cart,
      users: auth.users,
      posts: dbState.posts,
      sponsors: dbState.sponsors,
      transactions: dbState.transactions,
      notifications: ui.notifications,
    }),
    [
      currentUser.id,
      checkout.cart,
      auth.users,
      dbState.posts,
      dbState.sponsors,
      dbState.transactions,
      ui.notifications,
    ]
  );

  const updateDbState = (updater: (draft: AppState) => void) => {
    setDbState((state) => {
      const copy = structuredClone(state);
      updater(copy);
      return copy;
    });
  };

  const applyAuth = async (authData: AuthDto) => {
    const user = mapUser(authData.user);
    auth.setSession(user, authData.token);
    await Promise.all([loadPrivateData(), loadPublicData()]);
    ui.setView("overview");
    return user;
  };

  const signIn = async () => {
    if (!emailDraft.trim() || !passwordDraft) {
      ui.notify("Email and password are required.");
      return;
    }
    setIsBusy(true);
    try {
      const user = await applyAuth(
        await gameTrustApi.auth.signIn({
          email: emailDraft.trim(),
          password: passwordDraft,
        })
      );
      setPasswordDraft("");
      ui.notify(`Signed in successfully as ${user.name}.`);
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const signUp = async () => {
    setIsBusy(true);
    try {
      const user = await applyAuth(
        await gameTrustApi.auth.signUp({
          email: signupEmail.trim(),
          password: signupPassword,
          username: signupAccountName.trim(),
          fullName: signupFullName.trim(),
          role: "GAMER",
          gameProfile: {
            mainGame: "Arena of Valor",
            rank: "Platinum",
            goal: "Compete",
            preferredRole: "Flex",
            onlineTime: "Evening",
          },
        })
      );
      ui.notify(`Account ${user.username || user.name} registered successfully.`);
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const logout = () => {
    auth.logout();
    ui.setNotifications([]);
    setRegistrations([]);
    setMatchItems([]);
    setMyListingItems([]);
    ui.setView("signin");
    ui.notify("Signed out from GameTrust.");
  };

  const switchRole = async (role: Role) => {
    const email = seedAccounts[role];
    if (!email) {
      ui.notify("Admin API is not part of the current MVP.");
      return;
    }
    setIsBusy(true);
    try {
      const user = await applyAuth(
        await gameTrustApi.auth.signIn({ email, password: "123456" })
      );
      ui.notify(`Active API identity switched to ${user.role}.`);
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const saveProfile = async () => {
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before updating your profile.");
      return;
    }
    setIsBusy(true);
    try {
      const dto = await gameTrustApi.users.updateProfile({
        fullName: profileDraft.name.trim(),
        gameProfile: {
          mainGame: profileDraft.game,
          rank: profileDraft.rank,
          goal: profileDraft.goal,
          preferredRole: "Flex",
          onlineTime: "Evening",
          favoriteGames: [profileDraft.game],
        },
      });
      auth.setCurrentUser(mapUser(dto));
      ui.notify("Profile updated and trust score recalculated.");
    } catch (error) {
      ui.notify(errorMessage(error));
      throw error;
    } finally {
      setIsBusy(false);
    }
  };

  const publishPost = async () => {
    const content = postDraft.content.trim();
    if (!content) return;
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before publishing a post.");
      return;
    }
    setIsBusy(true);
    try {
      const post = mapPost(
        await gameTrustApi.posts.create({
          type: toPostType(postDraft.type),
          content,
          game: currentUser.game,
          clanTag: clanItems.find((clan) => clan.joined)?.tag,
        })
      );
      setDbState((state) => ({ ...state, posts: [post, ...state.posts] }));
      setPostDraft({ content: "", type: "highlight" });
      ui.notify("Post published to the social feed.");
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const publishBroadcast = async () => {
    const content = filters.broadcastDraft.trim();
    if (!content) {
      ui.notify("Cannot publish an empty message.");
      return;
    }
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before publishing a post.");
      return;
    }
    setIsBusy(true);
    try {
      const post = mapPost(
        await gameTrustApi.posts.create({
          type: "HIGHLIGHT",
          content,
          game: currentUser.game,
          clanTag: clanItems.find((clan) => clan.joined)?.tag,
        })
      );
      setDbState((state) => ({ ...state, posts: [post, ...state.posts] }));
      filters.setBroadcastDraft("");
      ui.notify("Message published successfully.");
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const likePost = async (postId: string) => {
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before liking a post.");
      return;
    }
    try {
      const post = mapPost(await gameTrustApi.posts.like(postId));
      setDbState((state) => ({
        ...state,
        posts: state.posts.map((item) => (item.id === post.id ? post : item)),
      }));
    } catch (error) {
      ui.notify(errorMessage(error));
    }
  };

  const commentPost = async (postId: string, content: string) => {
    if (!content.trim()) return;
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before commenting.");
      return;
    }
    try {
      const post = mapPost(
        await gameTrustApi.posts.comment(postId, content.trim())
      );
      setDbState((state) => ({
        ...state,
        posts: state.posts.map((item) => (item.id === post.id ? post : item)),
      }));
      ui.notify("Comment added.");
    } catch (error) {
      ui.notify(errorMessage(error));
    }
  };

  const buyCart = (item: CartItem) => {
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before starting checkout.");
      return;
    }
    checkout.buyCart(item);
  };

  const completeCheckout = async () => {
    const cart = checkout.cart;
    if (!cart) {
      ui.notify("Cart is empty.");
      return;
    }
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before making a payment.");
      return;
    }

    setIsBusy(true);
    try {
      if (cart.kind === "tournament") {
        const registration = await gameTrustApi.tournaments.join(
          cart.referenceId || cart.id.replace(/^tour-/, ""),
          { teamName: `${currentUser.username || currentUser.name} Squad` }
        );
        setRegistrations((items) => [registration, ...items]);
        if (registration.paymentUrl) {
          window.location.assign(registration.paymentUrl);
          return;
        }
        checkout.setLastPurchased(cart);
        checkout.setCart(null);
        checkout.setCheckoutStep(3);
        ui.notify(`Tournament registration status: ${registration.status}.`);
        return;
      }

      const purpose =
        cart.kind === "premium"
          ? "PREMIUM_PLAN"
          : cart.kind === "shop"
            ? "SHOP_PACKAGE"
            : "MARKETPLACE_ORDER";
      const payment = await gameTrustApi.payments.create({
        purpose,
        referenceId: cart.referenceId || cart.id,
        amount: Math.round(cart.price * 1.025),
        orderInfo: cart.name,
      });
      if (!payment.paymentUrl) {
        throw new Error("MoMo did not return a payment URL.");
      }
      window.location.assign(payment.paymentUrl);
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const joinClan = async (id: string) => {
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before joining a clan.");
      return;
    }
    setIsBusy(true);
    try {
      const updated = mapClan(await gameTrustApi.clans.join(id));
      setClanItems((items) =>
        items.map((item) => (item.id === id ? updated : item))
      );
      filters.setJoinedClans((ids) =>
        ids.includes(id) ? ids : [...ids, id]
      );
      ui.notify(`Joined [${updated.tag}] ${updated.name}.`);
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const leaveClan = async (id: string) => {
    if (!auth.isLoggedIn) {
      ui.setView("signin");
      ui.notify("Sign in before leaving a clan.");
      return;
    }
    setIsBusy(true);
    try {
      const updated = mapClan(await gameTrustApi.clans.leave(id));
      setClanItems((items) =>
        items.map((item) => (item.id === id ? updated : item))
      );
      filters.setJoinedClans((ids) => ids.filter((item) => item !== id));
      ui.notify(`Left [${updated.tag}] ${updated.name}.`);
    } catch (error) {
      ui.notify(errorMessage(error));
    } finally {
      setIsBusy(false);
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      await gameTrustApi.notifications.markRead(id);
      ui.setNotifications(
        ui.notifications.map((item) =>
          item.id === id ? { ...item, unread: false } : item
        )
      );
    } catch (error) {
      ui.notify(errorMessage(error));
    }
  };

  const dismissNotification = async (id: string) => {
    try {
      await gameTrustApi.notifications.dismiss(id);
      ui.setNotifications(ui.notifications.filter((item) => item.id !== id));
    } catch (error) {
      ui.notify(errorMessage(error));
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await gameTrustApi.notifications.markAllRead();
      ui.setNotifications(
        ui.notifications.map((item) => ({ ...item, unread: false }))
      );
      ui.notify("All notifications marked as read.");
    } catch (error) {
      ui.notify(errorMessage(error));
    }
  };

  const clearAllNotifications = async () => {
    try {
      await gameTrustApi.notifications.clearAll();
      ui.setNotifications([]);
      ui.notify("All notifications cleared.");
    } catch (error) {
      ui.notify(errorMessage(error));
    }
  };

  const filteredNotifications = useMemo(() => {
    let items = ui.notifications;
    if (notifFilter !== "ALL") {
      items = items.filter(
        (notification) =>
          notification.type.toUpperCase() === notifFilter.toUpperCase()
      );
    }
    return unreadOnly
      ? items.filter((notification) => notification.unread)
      : items;
  }, [ui.notifications, notifFilter, unreadOnly]);

  const filteredClans = useMemo(
    () =>
      clanItems.filter(
        (clan) =>
          (filters.clanTierFilter === "ALL" ||
            clan.tier === filters.clanTierFilter) &&
          (filters.clanRegionFilter === "ALL" ||
            clan.region === filters.clanRegionFilter)
      ),
    [clanItems, filters.clanTierFilter, filters.clanRegionFilter]
  );

  const activeClan = useMemo(
    () =>
      clanItems.find((clan) => clan.id === filters.selectedClanId) ||
      clanItems[0],
    [clanItems, filters.selectedClanId]
  );

  const filteredPosts = useMemo(() => {
    let items = [...dbState.posts];
    const search = filters.communitySearchQuery.trim().toLowerCase();
    if (search) {
      items = items.filter(
        (post) =>
          post.content.toLowerCase().includes(search) ||
          post.authorName?.toLowerCase().includes(search) ||
          post.game?.toLowerCase().includes(search)
      );
    }
    if (filters.communityTypeFilter !== "ALL") {
      items = items.filter(
        (post) =>
          post.type.toUpperCase() ===
          filters.communityTypeFilter.toUpperCase()
      );
    }
    if (filters.communitySortOrder === "TOP") {
      items.sort((a, b) => b.likes - a.likes);
    }
    return items;
  }, [
    dbState.posts,
    filters.communitySearchQuery,
    filters.communityTypeFilter,
    filters.communitySortOrder,
  ]);

  const filteredListings = useMemo(() => {
    let items = [...listingItems];
    if (filters.gameFilter !== "ALL") {
      items = items.filter(
        (listing) =>
          listing.title.toLowerCase() === filters.gameFilter.toLowerCase()
      );
    }
    const search = filters.searchQuery.trim().toLowerCase();
    if (search) {
      items = items.filter(
        (listing) =>
          listing.title.toLowerCase().includes(search) ||
          listing.server.toLowerCase().includes(search) ||
          listing.badge.toLowerCase().includes(search)
      );
    }
    const min = Number(filters.priceMin);
    const max = Number(filters.priceMax);
    if (filters.priceMin && Number.isFinite(min)) {
      items = items.filter((listing) => listing.price >= min);
    }
    if (filters.priceMax && Number.isFinite(max)) {
      items = items.filter((listing) => listing.price <= max);
    }
    if (filters.trustSort !== "none") {
      items.sort((a, b) =>
        filters.trustSort === "desc"
          ? parseFloat(b.trust) - parseFloat(a.trust)
          : parseFloat(a.trust) - parseFloat(b.trust)
      );
    }
    return items;
  }, [
    listingItems,
    filters.gameFilter,
    filters.searchQuery,
    filters.priceMin,
    filters.priceMax,
    filters.trustSort,
  ]);

  const groupedNotifs = useMemo(() => {
    const groups: Record<string, NotificationItem[]> = {
      TODAY: [],
      YESTERDAY: [],
      "2 DAYS AGO": [],
      "3 DAYS AGO": [],
    };
    filteredNotifications.forEach((notification) => {
      if (
        notification.time.includes("m") ||
        notification.time.includes("h") ||
        notification.time === "Just now"
      ) {
        groups.TODAY.push(notification);
      } else if (notification.time.includes("1d")) {
        groups.YESTERDAY.push(notification);
      } else if (notification.time.includes("2d")) {
        groups["2 DAYS AGO"].push(notification);
      } else {
        groups["3 DAYS AGO"].push(notification);
      }
    });
    return groups;
  }, [filteredNotifications]);

  const registeredTournamentIds = useMemo(
    () =>
      Array.from(
        new Set(
          registrations
            .filter((item) =>
              ["PENDING_PAYMENT", "REGISTERED", "WAITLISTED"].includes(
                item.status
              )
            )
            .map((item) => item.tournamentId)
        )
      ),
    [registrations]
  );

  const revenue = dbState.transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const engagement = dbState.posts.reduce(
    (sum, post) => sum + post.likes + post.comments.length,
    0
  );
  const premiumUsers = auth.users.filter((user) => user.premium).length;

  return {
    view: ui.view,
    setView: ui.setView,
    state: appState,
    setState: setDbState,
    hydrated,
    isBusy,
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
    clans: clanItems,
    selectedClanId: filters.selectedClanId,
    setSelectedClanId: filters.setSelectedClanId,
    clanTierFilter: filters.clanTierFilter,
    setClanTierFilter: filters.setClanTierFilter,
    clanRegionFilter: filters.clanRegionFilter,
    setClanRegionFilter: filters.setClanRegionFilter,
    joinedClans: filters.joinedClans,
    setJoinedClans: filters.setJoinedClans as React.Dispatch<
      React.SetStateAction<string[]>
    >,
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
    registeredTournamentIds,
    listings: listingItems,
    myListings: myListingItems,
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
    currentUser,
    revenue,
    engagement,
    premiumUsers,
    matches: matchItems,
    filteredNotifications,
    filteredClans,
    activeClan,
    filteredPosts,
    filteredListings,
    groupedNotifs,
    signIn,
    signUp,
    logout,
    switchRole,
    saveProfile,
    publishPost,
    buyCart,
    completeCheckout,
    joinClan,
    leaveClan,
    markNotificationRead,
    dismissNotification,
    markAllNotificationsRead,
    clearAllNotifications,
    likePost,
    commentPost,
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
