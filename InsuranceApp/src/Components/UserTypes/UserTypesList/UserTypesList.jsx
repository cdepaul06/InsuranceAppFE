import React, { useMemo } from "react";
import Grid from "../../Grid/Grid";

const UserTypesList = ({}) => {
  const fetchObject = useMemo(() => {
    return {
      endpoint: "UserTypes",
    };
  }, []);

  const columnDefs = [
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
  ];

  return (
    <div>
      <Grid fetchObject={fetchObject} title='User Types' columns={columnDefs} />
    </div>
  );
};

export default UserTypesList;
