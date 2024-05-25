import React, { useMemo, useState } from "react";
import Grid from "../Grid/Grid";

const PolicyStatusesList = ({}) => {
  const [refetch, setRefetch] = useState(false);

  const fetchObject = useMemo(() => {
    return {
      endpoint: "PolicyStatuses",
    };
  }, []);

  const columnDefs = [
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
  ];

  return (
    <div>
      <Grid
        fetchObject={fetchObject}
        title='Policy Statuses'
        columns={columnDefs}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default PolicyStatusesList;
