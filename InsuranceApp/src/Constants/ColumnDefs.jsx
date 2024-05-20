export const columnDefs = {
  //#region CustomerPolicies
  CustomerPolicies: [
    {
      alignment: "left",
      dataField: "policyStatusId",
      caption: "Status",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "customerPolicyId",
      caption: "Policy ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "policyTypeId",
      caption: "Policy Type",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "policyPremium",
      caption: "Premium",
      dataType: "currency",
    },
    {
      alignment: "left",
      dataField: "policyStartDate",
      caption: "Start Date",
      dataType: "date",
    },
    {
      alignment: "left",
      dataField: "policyEndDate",
      caption: "End Date",
      dataType: "date",
    },
  ],
  //#endregion
  //#region Customers
  Customers: [
    {
      alignment: "left",
      dataField: "customerId",
      caption: "ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "firstName",
      caption: "First Name",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "lastName",
      caption: "Last Name",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "email",
      caption: "Email",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "phone",
      caption: "Phone",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "address",
      caption: "Address",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "city",
      caption: "City",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "state",
      caption: "State",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "zip",
      caption: "Zip",
      dataType: "string",
    },
  ],
  //#endregion
  //#region PolicyStatuses
  PolicyStatuses: [
    {
      alignment: "left",
      dataField: "policyStatusId",
      caption: "ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "policyStatusName",
      caption: "Status",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "policyStatusDescription",
      caption: "Description",
      dataType: "string",
    },
  ],
  //#endregion
  //#region PolicyTypes
  PolicyTypes: [
    {
      alignment: "left",
      dataField: "policyTypeId",
      caption: "ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "policyTypeName",
      caption: "Type",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "policyTypeDescription",
      caption: "Description",
      dataType: "string",
    },
  ],
  //#endregion
  //#region Users
  Users: [
    {
      alignment: "left",
      dataField: "userId",
      caption: "ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "email",
      caption: "Email",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "firstName",
      caption: "First Name",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "lastName",
      caption: "Last Name",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "lastLogin",
      caption: "Last Login",
      dataType: "dateTime",
      calculateDisplayValue: ({ lastLogin }) => {
        return new Date(lastLogin).toLocaleString();
      },
    },
    {
      alignment: "left",
      dataField: "userStatusId",
      caption: "User Status",
      dataType: "number",
      calculateDisplayValue: ({ userStatusId }) => {
        return userStatusId === 2 ? "Active" : "Inactive";
      },
    },
    {
      alignment: "left",
      dataField: "userTypeId",
      caption: "User Type",
      dataType: "number",
      calculateDisplayValue: ({ userTypeId }) => {
        return userTypeId === 1 ? "Admin" : "User";
      },
    },
  ],
  //#endregion
  //#region UserStatuses
  UserStatuses: [
    {
      alignment: "left",
      dataField: "userStatusId",
      caption: "ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "userStatusName",
      caption: "Status",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "userStatusDescription",
      caption: "Description",
      dataType: "string",
    },
  ],
  //#endregion
  //#region UserTypes
  UserTypes: [
    {
      alignment: "left",
      dataField: "userTypeId",
      caption: "ID",
      dataType: "number",
    },
    {
      alignment: "left",
      dataField: "userTypeName",
      caption: "Type",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "userTypeDescription",
      caption: "Description",
      dataType: "string",
    },
  ],
  //#endregion
};
