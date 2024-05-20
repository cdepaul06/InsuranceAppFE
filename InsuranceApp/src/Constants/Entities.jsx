export const entities = [
  {
    entityName: "CustomerPolicy",
    buttonLabel: "Customer Policies",
    url: "/customer-policies",
    endpoint: "CustomerPolicies",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
  {
    entityName: "Customer",
    buttonLabel: "Customers",
    url: "/customers",
    endpoint: "Customers",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
  {
    entityName: "PolicyStatus",
    buttonLabel: "Policy Statuses",
    url: "/policy-statuses",
    endpoint: "PolicyStatuses",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        fetchId: "policyStatusId",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
  {
    entityName: "PolicyType",
    buttonLabel: "Policy Types",
    url: "/policy-types",
    endpoint: "PolicyTypes",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
  {
    entityName: "User",
    buttonLabel: "Users",
    url: "/users",
    endpoint: "Users",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
  {
    entityName: "UserStatus",
    buttonLabel: "User Statuses",
    endpoint: "UserStatuses",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
  {
    entityName: "UserType",
    buttonLabel: "User Types",
    endpoint: "UserTypes",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
      },
    },
  },
];
