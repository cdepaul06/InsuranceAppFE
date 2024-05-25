import React, { useCallback, useMemo, useState } from "react";
import Grid from "../Grid/Grid";

const UserStatusesList = ({}) => {
  const [refetch, setRefetch] = useState(false);

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
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default UserStatusesList;
