import React, { useMemo, useState } from "react";
import Grid from "../Grid/Grid";

const PolicyTypesList = ({}) => {
  const [refetch, setRefetch] = useState(false);

  const fetchObject = useMemo(() => {
    return {
      endpoint: "Users",
    };
  }, []);

  const columnDefs = [
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
  ];

  return (
    <div>
      <Grid
        fetchObject={fetchObject}
        title='Policy Types'
        columns={columnDefs}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default PolicyTypesList;
