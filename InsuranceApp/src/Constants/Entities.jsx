const defaultActions = [
  {
    actionName: "View",
    actionType: "GET",
    icon: "find",
  },
  {
    actionName: "Create",
    actionType: "POST",
    icon: "add",
  },
  {
    actionName: "Edit",
    actionType: "PUT",
    icon: "edit",
  },
  {
    actionName: "Delete",
    actionType: "DELETE",
    icon: "trash",
  },
];

export const entities = [
  {
    entityName: "CustomerPolicy",
    buttonLabel: "Customer Policies",
    url: "/customer-policies",
    endpoint: "CustomerPolicies",
    actions: [...defaultActions],
  },
  {
    entityName: "Customer",
    buttonLabel: "Customers",
    url: "/customers",
    endpoint: "Customers",
    actions: [...defaultActions],
  },
  {
    entityName: "PolicyStatus",
    buttonLabel: "Policy Statuses",
    url: "/policy-statuses",
    endpoint: "PolicyStatuses",
    actions: [...defaultActions],
  },
  {
    entityName: "PolicyType",
    buttonLabel: "Policy Types",
    url: "/policy-types",
    endpoint: "PolicyTypes",
    actions: [...defaultActions],
  },
  {
    entityName: "User",
    buttonLabel: "Users",
    url: "/users",
    endpoint: "Users",
    actions: [...defaultActions],
  },
  {
    entityName: "UserStatus",
    buttonLabel: "User Statuses",
    endpoint: "UserStatuses",
    actions: [...defaultActions],
  },
  {
    entityName: "UserType",
    buttonLabel: "User Types",
    endpoint: "UserTypes",
    actions: [...defaultActions],
  },
];
