import UsersList from "../Components/UsersList/UsersList";

export const entities = [
  {
    entityName: "CustomerPolicy",
    buttonLabel: "Customer Policies",
    url: "/customer-policies",
    endpoint: "CustomerPolicies",
    actions: {
      createCustomerPolicy: {
        actionName: "CreateCustomerPolicy",
        actionType: "POST",
        icon: "add",
      },
      editCustomerPolicy: {
        actionName: "EditCustomerPolicy",
        actionType: "PUT",
        icon: "edit",
      },
      deleteCustomerPolicy: {
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
      createCustomer: {
        actionName: "CreateCustomer",
        actionType: "POST",
        icon: "add",
      },
      editCustomer: {
        actionName: "EditCustomer",
        actionType: "PUT",
        icon: "edit",
      },
      deleteCustomer: {
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
        function: () => {},
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
