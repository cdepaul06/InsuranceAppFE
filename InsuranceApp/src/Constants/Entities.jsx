import CustomerPoliciesList from "../Components/CustomerPolicies/CustomerPoliciesList/CustomerPoliciesList";
import CustomerPolicyCreateForm from "../Components/CustomerPolicies/CustomerPolicyCreateForm/CustomerPolicyCreateForm";
import CustomersList from "../Components/Customers/CustomersList/CustomersList";
import CustomerCreateForm from "../Components/Customers/CustomerCreateForm/CustomerCreateForm";
import CustomerDeleteForm from "../Components/Customers/CustomerDeleteForm/CustomerDeleteForm";
import PolicyStatusesList from "../Components/PolicyStatuses/PolicyStatusesList/PolicyStatusesList";
import PolicyStatusCreateForm from "../Components/PolicyStatuses/PolicyStatusCreateForm/PolicyStatusCreateForm";
import PolicyStatusEditForm from "../Components/PolicyStatuses/PolicyStatusEditForm/PolicyStatusEditForm";
import PolicyStatusDeleteForm from "../Components/PolicyStatuses/PolicyStatusDeleteForm/PolicyStatusDeleteForm";
import PolicyTypesList from "../Components/PolicyTypes/PolicyTypesList/PolicyTypesList";
import PolicyTypeCreateForm from "../Components/PolicyTypes/PolicyTypeCreateForm/PolicyTypeCreateForm";
import PolicyTypeEditForm from "../Components/PolicyTypes/PolicyTypeEditForm/PolicyTypeEditForm";
import PolicyTypeDeleteForm from "../Components/PolicyTypes/PolicyTypeDeleteForm/PolicyTypeDeleteForm";
import UsersList from "../Components/Users/UsersList/UsersList";
import UserStatusesList from "../Components/UserStatuses/UserStatusesList/UserStatusesList";
import UserStatusCreateForm from "../Components/UserStatuses/UserStatusCreateForm/UserStatusCreateForm";
import UserStatusEditForm from "../Components/UserStatuses/UserStatusEditForm/UserStatusEditForm";
import UserStatusDeleteForm from "../Components/UserStatuses/UserStatusDeleteForm/UserStatusDeleteForm";
import UserTypesList from "../Components/UserTypes/UserTypesList/UserTypesList";
import UserTypeCreateForm from "../Components/UserTypes/UserTypeCreateForm/UserTypeCreateForm";
import UserTypeEditForm from "../Components/UserTypes/UserTypeEditForm/UserTypeEditForm";
import UserTypeDeleteForm from "../Components/UserTypes/UserTypeDeleteForm/UserTypeDeleteForm";
import UserEditForm from "../Components/Users/UserEditForm/UserEditForm";
import UserCreateForm from "../Components/Users/UserCreateForm/UserCreateForm";
import UserDeleteForm from "../Components/Users/UserDeleteForm/UserDeleteForm";

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
        icon: "add",
        func: (
          customerPolicy = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: CustomerPolicyCreateForm,
            props: { customerPolicy, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (customerPolicy) => {
          console.log("Edit Customer Policy");
        },
      },
      DELETE: {
        actionName: "Delete",
        icon: "trash",
        min: 1,
        func: (customerPolicy) => {
          console.log("Delete Customer Policy");
        },
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
        icon: "add",
        func: (
          customer,
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {},
          open = true,
          setOpen = () => {}
        ) => ({
          component: CustomerCreateForm,
          props: {
            customer,
            resetPopup,
            setRefetch,
            setToastMessage,
            open,
            setOpen,
          },
        }),
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (
          customer,
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {},
          open = true,
          setOpen = () => {}
        ) => {
          return {
            component: {},
            props: {
              customer,
              resetPopup,
              setRefetch,
              setToastMessage,
              open,
              setOpen,
            },
          };
        },
      },
      DELETE: {
        actionName: "Delete",
        min: 1,
        icon: "trash",
        func: (
          customers = [],
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => ({
          component: CustomerDeleteForm,
          props: { customers, resetPopup, setRefetch, setToastMessage },
        }),
      },
    },
  },
  //#endregion
  //#region PolicyStatus
  {
    entityName: "PolicyStatus",
    buttonLabel: "Policy Statuses",
    url: "/policy-statuses",
    endpoint: "PolicyStatuses",
    component: PolicyStatusesList,
    actions: {
      CREATE: {
        actionName: "Create",
        icon: "add",
        func: (
          policyStatus = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => ({
          component: PolicyStatusCreateForm,
          props: { policyStatus, resetPopup, setRefetch, setToastMessage },
        }),
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (
          policyStatus = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => ({
          component: PolicyStatusEditForm,
          props: { policyStatus, resetPopup, setRefetch, setToastMessage },
        }),
      },
      DELETE: {
        actionName: "Delete",
        min: 1,
        icon: "trash",
        func: (
          policyStatuses = [],
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessages = () => {}
        ) => {
          return {
            component: PolicyStatusDeleteForm,
            props: { policyStatuses, resetPopup, setRefetch, setToastMessages },
          };
        },
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
        icon: "add",
        func: (
          policyType = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: PolicyTypeCreateForm,
            props: { policyType, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (
          policyType = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: PolicyTypeEditForm,
            props: { policyType, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      DELETE: {
        actionName: "Delete",
        icon: "trash",
        min: 1,
        func: (
          policyTypes = [],
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: PolicyTypeDeleteForm,
            props: { policyTypes, resetPopup, setRefetch, setToastMessage },
          };
        },
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
        icon: "add",
        func: (
          user = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => ({
          component: UserCreateForm,
          props: { user, resetPopup, setRefetch, setToastMessage },
        }),
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (
          user = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => ({
          component: UserEditForm,
          props: { user, resetPopup, setRefetch, setToastMessage },
        }),
      },
      DELETE: {
        actionName: "Delete",
        icon: "trash",
        min: 1,
        func: (
          users = [],
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => ({
          component: UserDeleteForm,
          props: { users, resetPopup, setRefetch, setToastMessage },
        }),
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
        icon: "add",
        func: (
          userStatus = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: UserStatusCreateForm,
            props: { userStatus, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (
          userStatus = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: UserStatusEditForm,
            props: { userStatus, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      DELETE: {
        actionName: "Delete",
        icon: "trash",
        min: 1,
        func: (
          userStatuses = [],
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: UserStatusDeleteForm,
            props: { userStatuses, resetPopup, setRefetch, setToastMessage },
          };
        },
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
        icon: "add",
        func: (
          userType = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: UserTypeCreateForm,
            props: { userType, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      EDIT: {
        actionName: "Edit",
        icon: "edit",
        min: 1,
        max: 1,
        func: (
          userType = {},
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: UserTypeEditForm,
            props: { userType, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
      DELETE: {
        actionName: "Delete",
        icon: "trash",
        min: 1,
        func: (
          userTypes = [],
          resetPopup = () => {},
          setRefetch = () => {},
          setToastMessage = () => {}
        ) => {
          return {
            component: UserTypeDeleteForm,
            props: { userTypes, resetPopup, setRefetch, setToastMessage },
          };
        },
      },
    },
  },
  //#endregion
];
