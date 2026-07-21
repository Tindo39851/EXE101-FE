import { create } from "zustand";
import type { View, NotificationItem } from "@/lib/types";

interface UIState {
  view: View;
  toast: string;
  showDemoPanel: boolean;
  notifications: NotificationItem[];
  setView: (view: View) => void;
  notify: (msg: string) => void;
  setShowDemoPanel: (show: boolean) => void;
  setNotifications: (notifications: NotificationItem[]) => void;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearAllNotifications: () => void;
}

const getInitialNotifications = (): NotificationItem[] => {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.notifications) return parsed.notifications;
      } catch {
        // ignore
      }
    }
  }
  return [];
};

export const useUIStore = create<UIState>((set, get) => ({
  view: "overview",
  toast: "",
  showDemoPanel: true,
  notifications: getInitialNotifications(),

  setView: (view) => set({ view }),

  notify: (msg) => {
    set({ toast: msg });
    setTimeout(() => {
      if (get().toast === msg) {
        set({ toast: "" });
      }
    }, 2400);
  },

  setShowDemoPanel: (show) => set({ showDemoPanel: show }),

  setNotifications: (notifications) => set({ notifications }),

  markNotificationRead: (id) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, unread: false } : n
      );
      saveNotifications(updated);
      return { notifications: updated };
    });
    get().notify("Notification marked as read.");
  },

  dismissNotification: (id) => {
    set((state) => {
      const updated = state.notifications.filter((n) => n.id !== id);
      saveNotifications(updated);
      return { notifications: updated };
    });
    get().notify("Notification dismissed.");
  },

  markAllNotificationsRead: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, unread: false }));
      saveNotifications(updated);
      return { notifications: updated };
    });
    get().notify("All notifications marked as read.");
  },

  clearAllNotifications: () => {
    set(() => {
      saveNotifications([]);
      return { notifications: [] };
    });
    get().notify("All notifications cleared.");
  },
}));

function saveNotifications(notifs: NotificationItem[]) {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem("gametrust-next-mvp-state") || "{}";
    try {
      const parsed = JSON.parse(raw);
      parsed.notifications = notifs;
      window.localStorage.setItem("gametrust-next-mvp-state", JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }
}
