import React, { useMemo } from "react";
import Grid from "../../Grid/Grid";

const UserStatusesList = ({}) => {
  const fetchObject = useMemo(() => {
    return {
      endpoint: "UserStatuses",
    };
  }, []);

  const columnDefs = [
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
  ];

  return (
    <div>
      <Grid
        fetchObject={fetchObject}
        title='User Statuses'
        columns={columnDefs}
      />
    </div>
  );
};

export default UserStatusesList;
