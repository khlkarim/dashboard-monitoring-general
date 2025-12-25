import { create } from "zustand";
import { NavGroup, NavMainItem, NavSubItem } from "../types/navigation.types";
import { defaultSidebarItems } from "../sidebar/sidebar-items";

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

export const useNavigationStore = create<NavigationState & NavigationActions>((set) => ({
    sidebarItems: defaultSidebarItems,

    setSidebarItems: (items) => set({ sidebarItems: items }),

    addNavGroup: (group) => set((state) => ({
        sidebarItems: [...state.sidebarItems, group]
    })),

    addNavItem: (groupId, item) => set((state) => ({
        sidebarItems: state.sidebarItems.map((group) =>
            group.id === groupId
                ? { ...group, items: [...group.items, item] }
                : group
        )
    })),

    addSubNavItem: (groupId, itemTitle, subItem) => set((state) => {
        console.log("addSubNavItem: Attempting to add sub-item.", { groupId, itemTitle, subItem });
        console.log("addSubNavItem: Current state.sidebarItems before update:", JSON.parse(JSON.stringify(state.sidebarItems)));

        const updatedSidebarItems = state.sidebarItems.map((group) => {
            if (group.id === groupId) {
                console.log(`addSubNavItem: Found target group with ID: ${groupId} (Title: ${group.label})`);
                const updatedGroup = {
                    ...group,
                    items: group.items.map((item) => {
                        if (item.title === itemTitle) {
                            console.log(`addSubNavItem: Found target main item with title: ${itemTitle}`);

                            // Check if subitem already exists
                            const existingSubItem = item.subItems?.find(
                                (sub) => sub.title === subItem.title || sub.url === subItem.url
                            );

                            if (existingSubItem) {
                                console.log("addSubNavItem: SubItem already exists, skipping addition");
                                return item; // Return unchanged if duplicate found
                            }

                            const newSubItems = [...(item.subItems || []), subItem];
                            console.log("addSubNavItem: New sub-items array for item:", newSubItems);
                            return { ...item, subItems: newSubItems };
                        }
                        return item;
                    })
                };
                console.log("addSubNavItem: Group after item update:", JSON.parse(JSON.stringify(updatedGroup)));
                return updatedGroup;
            }
            return group;
        });

        console.log("addSubNavItem: New state.sidebarItems after update logic:", JSON.parse(JSON.stringify(updatedSidebarItems)));
        return { sidebarItems: updatedSidebarItems };
    }),

    removeSubNavItem: (groupId, itemTitle, subItemTitle) => set((state) => ({
        sidebarItems: state.sidebarItems.map((group) =>
            group.id === groupId
                ? {
                    ...group,
                    items: group.items.map((item) =>
                        item.title === itemTitle
                            ? { ...item, subItems: (item.subItems || []).filter(sub => sub.title !== subItemTitle) }
                            : item
                    )
                }
                : group
        )
    })),
}));
