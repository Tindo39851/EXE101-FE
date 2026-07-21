import { create } from "zustand";

interface FiltersState {
  // Marketplace Filters
  searchQuery: string;
  priceMin: string;
  priceMax: string;
  trustSort: "none" | "desc" | "asc";
  gameFilter: string;

  setSearchQuery: (val: string) => void;
  setPriceMin: (val: string) => void;
  setPriceMax: (val: string) => void;
  setTrustSort: (val: "none" | "desc" | "asc") => void;
  setGameFilter: (val: string) => void;

  // Clan Filters
  selectedClanId: string;
  clanTierFilter: string;
  clanRegionFilter: string;
  joinedClans: string[];

  setSelectedClanId: (val: string) => void;
  setClanTierFilter: (val: string) => void;
  setClanRegionFilter: (val: string) => void;
  setJoinedClans: (val: string[] | ((prev: string[]) => string[])) => void;

  // Community Filters
  communityTypeFilter: string;
  communitySortOrder: string;
  communitySearchQuery: string;
  broadcastDraft: string;
  postDraft: { content: string; type: string };

  setCommunityTypeFilter: (val: string) => void;
  setCommunitySortOrder: (val: string) => void;
  setCommunitySearchQuery: (val: string) => void;
  setBroadcastDraft: (val: string) => void;
  setPostDraft: (val: { content: string; type: string }) => void;

  // Tournament Filters
  tourTab: string;
  selectedTour: string;

  setTourTab: (val: string) => void;
  setSelectedTour: (val: string) => void;

  // Admin Filters
  trustTab: string;
  setTrustTab: (val: string) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  // Marketplace Defaults
  searchQuery: "",
  priceMin: "",
  priceMax: "",
  trustSort: "none",
  gameFilter: "ALL",

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPriceMin: (priceMin) => set({ priceMin }),
  setPriceMax: (priceMax) => set({ priceMax }),
  setTrustSort: (trustSort) => set({ trustSort }),
  setGameFilter: (gameFilter) => set({ gameFilter }),

  // Clan Defaults
  selectedClanId: "c1",
  clanTierFilter: "ALL",
  clanRegionFilter: "ALL",
  joinedClans: [],

  setSelectedClanId: (selectedClanId) => set({ selectedClanId }),
  setClanTierFilter: (clanTierFilter) => set({ clanTierFilter }),
  setClanRegionFilter: (clanRegionFilter) => set({ clanRegionFilter }),
  setJoinedClans: (updater) =>
    set((state) => {
      const nextClans =
        typeof updater === "function" ? updater(state.joinedClans) : updater;
      return { joinedClans: nextClans };
    }),

  // Community Defaults
  communityTypeFilter: "ALL",
  communitySortOrder: "RECENT",
  communitySearchQuery: "",
  broadcastDraft: "",
  postDraft: { content: "", type: "highlight" },

  setCommunityTypeFilter: (communityTypeFilter) => set({ communityTypeFilter }),
  setCommunitySortOrder: (communitySortOrder) => set({ communitySortOrder }),
  setCommunitySearchQuery: (communitySearchQuery) =>
    set({ communitySearchQuery }),
  setBroadcastDraft: (broadcastDraft) => set({ broadcastDraft }),
  setPostDraft: (postDraft) => set({ postDraft }),

  // Tournament Defaults
  tourTab: "ALL",
  selectedTour: "t1",

  setTourTab: (tourTab) => set({ tourTab }),
  setSelectedTour: (selectedTour) => set({ selectedTour }),

  // Admin Defaults
  trustTab: "OVERVIEW",
  setTrustTab: (trustTab) => set({ trustTab }),
}));
