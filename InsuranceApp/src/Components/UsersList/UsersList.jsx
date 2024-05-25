import React, { useCallback, useMemo, useState } from "react";
import { Button } from "devextreme-react";
import Grid from "../Grid/Grid";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const UsersList = ({}) => {
  const [refetch, setRefetch] = useState(false);

  const columnDefs = [
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
      calculateDisplayValue: useCallback(({ lastLogin }) => {
        return new Date(lastLogin).toLocaleString();
      }, []),
    },
    {
      alignment: "left",
      dataField: "userStatusId",
      caption: "User Status",
      dataType: "number",
      calculateDisplayValue: useCallback(({ userStatusId }) => {
        return userStatusId === 2 ? "Active" : "Inactive";
      }, []),
    },
    {
      alignment: "left",
      dataField: "userTypeId",
      caption: "User Type",
      dataType: "number",
      calculateDisplayValue: useCallback(({ userTypeId }) => {
        return userTypeId === 1 ? "Admin" : "User";
      }, []),
    },
  ];

  const fetchObject = useMemo(() => {
    return {
      endpoint: "Users",
    };
  }, []);

  return (
    <div>
      <Grid
        fetchObject={fetchObject}
        title='Users'
        columns={columnDefs}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default UsersList;
