import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { defaultSidebarItems } from "../sidebar/sidebar-items";
import { NavGroup, NavMainItem, NavSubItem } from "../types/navigation.types";

const iconRegistry: Record<string, any> = {};
defaultSidebarItems.forEach(group => {
    group.items.forEach(item => {
        if (item.icon) iconRegistry[item.title] = item.icon;
    });
});

interface NavigationState {
    sidebarItems: NavGroup[];
}

interface NavigationActions {
    setSidebarItems: (items: NavGroup[]) => void;
    addNavGroup: (group: NavGroup) => void;
    addNavItem: (groupId: number, item: NavMainItem) => void;
    addSubNavItem: (groupId: number, itemTitle: string, subItem: NavSubItem) => void;
    removeSubNavItem: (groupId: number, itemTitle: string, subItemTitle: string) => void;
}

export const useNavigationStore = create<NavigationState & NavigationActions>()(
    persist(
        (set, get) => ({
            sidebarItems: defaultSidebarItems,

            setSidebarItems: (items) => set({ sidebarItems: items }),

            addNavGroup: (group) =>
                set((state) => ({
                    sidebarItems: [...state.sidebarItems, group],
                })),

            addNavItem: (groupId, item) =>
                set((state) => ({
                    sidebarItems: state.sidebarItems.map((group) =>
                        group.id === groupId
                            ? { ...group, items: [...group.items, item] }
                            : group
                    ),
                })),

            addSubNavItem: (groupId, itemTitle, subItem) =>
                set((state) => ({
                    sidebarItems: state.sidebarItems.map((group) => {
                        if (group.id !== groupId) return group;

                        return {
                            ...group,
                            items: group.items.map((item) => {
                                if (item.title !== itemTitle) return item;

                                // avoid duplicates
                                const exists = item.subItems?.some(
                                    (sub) => sub.title === subItem.title || sub.url === subItem.url
                                );
                                if (exists) return item;

                                return {
                                    ...item,
                                    subItems: [...(item.subItems || []), subItem],
                                };
                            }),
                        };
                    }),
                })),

            removeSubNavItem: (groupId, itemTitle, subItemTitle) =>
                set((state) => ({
                    sidebarItems: state.sidebarItems.map((group) =>
                        group.id === groupId
                            ? {
                                ...group,
                                items: group.items.map((item) =>
                                    item.title === itemTitle
                                        ? {
                                            ...item,
                                            subItems: (item.subItems || []).filter(
                                                (sub) => sub.title !== subItemTitle
                                            ),
                                        }
                                        : item
                                ),
                            }
                            : group
                    ),
                })),
        }),
        {
            name: "navigation-storage",
            storage: createJSONStorage(() => localStorage),

            // intercept persisted state and restore icons
            merge: (persistedState, currentState) => {
                const typed = persistedState as NavigationState;

                const rebuiltSidebar = typed.sidebarItems.map((group) => {
                    const defaultGroup = defaultSidebarItems.find((g) => g.id === group.id);

                    return {
                        ...group,
                        items: group.items.map((item) => {
                            const defaultItem = defaultGroup?.items.find((i) => i.title === item.title);
                            return {
                                ...item,
                                icon: defaultItem?.icon, // restore original icon
                            };
                        }),
                    };
                });

                return {
                    ...currentState,
                    sidebarItems: rebuiltSidebar,
                };
            },
        }
    )
);

