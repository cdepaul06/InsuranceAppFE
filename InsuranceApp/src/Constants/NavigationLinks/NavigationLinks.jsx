const defaultActions = [
  {
    action: "View",
    icon: "find",
    isPopup: false,
    isDefault: true,
    gridView: ``,
  },
  { action: "Create", icon: "add", isPopup: true, isDefault: true },
  { action: "Edit", icon: "edit", isPopup: true, isDefault: true },
  { action: "Delete", icon: "close", isPopup: true, isDefault: true },
];

export const AdminNavigation = [
  {
    title: "Users",
    path: "/admin/users",
    actions: [...defaultActions],
  },
  {
    title: "Policy Types",
    path: "/admin/policy-types",
    actions: [...defaultActions],
  },
  {
    title: "Policy Statuses",
    path: "/admin/policy-statuses",
    actions: [...defaultActions],
  },
  {
    title: "User Statuses",
    path: "/admin/user-statuses",
    actions: [...defaultActions],
  },
  {
    title: "User Types",
    path: "/admin/user-types",
    actions: [...defaultActions],
  },
];
