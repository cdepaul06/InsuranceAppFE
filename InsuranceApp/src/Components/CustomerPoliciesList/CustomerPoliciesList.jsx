import React, { useMemo, useState } from "react";
import Grid from "../Grid/Grid";

const CustomerPoliciesList = ({}) => {
  const [refetch, setRefetch] = useState(false);

  const fetchObject = useMemo(() => {
    return {
      endpoint: "CustomerPolicies",
    };
  }, []);

  const columnDefs = [
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
  ];

  return (
    <div>
      <Grid
        columnDefs={columnDefs}
        fetchObject={fetchObject}
        title={"Customer Policies"}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default CustomerPoliciesList;
