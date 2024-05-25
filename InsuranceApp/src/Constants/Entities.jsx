import UsersList from "../Components/UsersList/UsersList";

export const entities = [
  {
    entityName: "CustomerPolicy",
    buttonLabel: "Customer Policies",
    url: "/customer-policies",
    endpoint: "CustomerPolicies",
    actions: {
      CREATE: {
        actionName: "CreateCustomerPolicy",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "EditCustomerPolicy",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "DeleteCustomerPolicy",
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
        actionName: "CreateCustomer",
        actionType: "POST",
        icon: "add",
      },
      EDIT: {
        actionName: "EditCustomer",
        actionType: "PUT",
        icon: "edit",
      },
      DELETE: {
        actionName: "DeleteCustomer",
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
    component: UsersList,
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: () => {
          console.log("Create User");
        },
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        min: 1,
        max: 1,
        func: () => {
          console.log("Edit User");
        },
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        min: 1,
        func: () => {
          console.log("Delete User");
        },
      },
    },
  },
  {
    entityName: "UserStatus",
    buttonLabel: "User Statuses",
    endpoint: "UserStatuses",
    url: "/user-statuses",
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
    url: "/user-types",
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
