import React, { useMemo, useCallback } from "react";
import Grid from "../../Grid/Grid";

const CustomerPoliciesList = ({}) => {
  const fetchObject = useMemo(() => {
    return {
      endpoint: "CustomerPolicies",
    };
  }, []);

  const columnDefs = [
    {
      caption: "Policy Status",
      alignment: "left",
      dataField: "policyStatusId",
      calculateDisplayValue: useCallback((rowData) => {
        return rowData.policyStatusId === 1 ? "Active" : "Inactive";
      }, []),
    },
    {
      caption: "Customer Name",
      dataField: "customer.firstName",
      calculateDisplayValue: useCallback((rowData) => {
        return rowData.customer.lastName + ", " + rowData.customer.firstName;
      }, []),
    },
    {
      caption: "Policy Number",
      dataField: "policyNumber",
    },
    {
      caption: "Policy Start Date",
      dataField: "policyStartDate",
      dataType: "date",
    },
    {
      caption: "Policy End Date",
      dataField: "policyEndDate",
      dataType: "date",
    },
    {
      caption: "Policy Type",
      dataField: "policyTypeId",
      alignment: "left",
      calculateDisplayValue: useCallback((rowData) => {
        return rowData.policyTypeId === 1
          ? "Auto"
          : rowData.policyTypeId === 2
          ? "Home"
          : "Specialty";
      }, []),
    },
    {
      caption: "Policy Premium",
      dataField: "policyPremium",
      dataType: "currency",
    },
  ];

  return (
    <div>
      <Grid
        columns={columnDefs}
        fetchObject={fetchObject}
        title={"Customer Policies"}
      />
    </div>
  );
};

export default CustomerPoliciesList;
