import CustomerPoliciesList from "../Components/CustomerPoliciesList/CustomerPoliciesList";
import CustomersList from "../Components/CustomersList/CustomersList";
import PolicyStatusesList from "../Components/PolicyStatusesList/PolicyStatusesList";
import PolicyTypesList from "../Components/PolicyTypesList/PolicyTypesList";
import UsersList from "../Components/UsersList/UsersList";
import UserStatusesList from "../Components/UserStatusesList/UserStatusesList";
import UserTypesList from "../Components/UserTypesList/UserTypesList";
import UserEditForm from "../Components/UserEditForm/UserEditForm";

export const entities = [
  //#region CustomerPolicy
  {
    entityName: "CustomerPolicy",
    buttonLabel: "Customer Policies",
    url: "/customer-policies",
    endpoint: "CustomerPolicies",
    component: CustomerPoliciesList,
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: () => {
          console.log("Create Customer Policy");
        },
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        min: 1,
        max: 1,
        func: (customerPolicy) => {
          console.log("Edit Customer Policy");
        },
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        min: 1,
        func: (customerPolicy) => {
          console.log("Delete Customer Policy");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
  //#region Customer
  {
    entityName: "Customer",
    buttonLabel: "Customers",
    url: "/customers",
    endpoint: "Customers",
    component: CustomersList,
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: () => {
          console.log("Create Customer");
        },
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        min: 1,
        max: 1,
        func: (customer) => {
          console.log("Edit Customer");
        },
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        min: 1,
        icon: "trash",
        func: (customer) => {
          console.log("Delete Customer");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
  //#region Policy
  {
    entityName: "PolicyStatus",
    buttonLabel: "Policy Statuses",
    url: "/policy-statuses",
    endpoint: "PolicyStatuses",
    component: PolicyStatusesList,
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: (policyStatus) => {
          console.log("Create Policy Status");
        },
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        func: (policyStatus) => {
          console.log("Edit Policy Status");
        },
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        func: (policyStatus) => {
          console.log("Delete Policy Status");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
  //#region PolicyType
  {
    entityName: "PolicyType",
    buttonLabel: "Policy Types",
    url: "/policy-types",
    endpoint: "PolicyTypes",
    component: PolicyTypesList,
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: (policyType) => {
          console.log("Create Policy Type");
        },
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        func: (policyType) => {
          console.log("Edit Policy Type");
        },
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        func: (policyType) => {
          console.log("Delete Policy Type");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
  //#region User
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
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        min: 1,
        max: 1,
        func: (user, resetPopup, setRefetch, setToastMessage) => ({
          component: UserEditForm,
          props: { user, resetPopup, setRefetch, setToastMessage },
        }),
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        min: 1,
        func: (user) => {
          console.log("Delete User");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
  //#region UserStatus
  {
    entityName: "UserStatus",
    buttonLabel: "User Statuses",
    endpoint: "UserStatuses",
    component: UserStatusesList,
    url: "/user-statuses",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: () => {
          console.log("Create User Status");
        },
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        func: (userStatus) => {
          console.log("Edit User Status");
        },
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        func: (userStatus) => {
          console.log("Delete User Status");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
  //#region UserType
  {
    entityName: "UserType",
    buttonLabel: "User Types",
    endpoint: "UserTypes",
    component: UserTypesList,
    url: "/user-types",
    actions: {
      CREATE: {
        actionName: "Create",
        actionType: "POST",
        icon: "add",
        func: () => {
          console.log("Create User Type");
        },
        onClose: () => {},
      },
      EDIT: {
        actionName: "Edit",
        actionType: "PUT",
        icon: "edit",
        func: (userType) => {
          console.log("Edit User Type");
        },
        onClose: () => {},
      },
      DELETE: {
        actionName: "Delete",
        actionType: "DELETE",
        icon: "trash",
        func: (userType) => {
          console.log("Delete User Type");
        },
        onClose: () => {},
      },
    },
  },
  //#endregion
];
