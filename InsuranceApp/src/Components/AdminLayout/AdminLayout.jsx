import React, { useEffect, useState, useCallback } from "react";
import Navigation from "../Navigation/Navigation";
import { UserTypes } from "../../Constants/UserTypes/UserTypes";
import { apiCall } from "../../API";
import Grid from "../Grid/Grid";

const AdminLayout = ({}) => {
  const [entity, setEntity] = useState("CustomerPolicies");

  const colDefs = [
    {
      dataField: "userId",
      caption: "User ID",
      alignment: "left",
    },
    {
      dataField: "email",
      caption: "Email",
      alignment: "left",
    },
    {
      dataField: "userStatusId",
      caption: "User Status ID",
      alignment: "left",
    },
    {
      dataField: "userTypeId",
      caption: "User Type ID",
      alignment: "left",
      calculateDisplayValue: useCallback((rowData) => {
        return rowData.userTypeId === UserTypes.ADMIN ? "Admin" : "User";
      }, []),
    },
  ];

  return (
    <div className='flex h-screen w-full overflow-auto'>
      <div className='w-[15%] bg-cyan-800'>
        <div className='flex justify-center p-2 overflow-scroll'>
          <Navigation layout={"admin"} setEntity={setEntity} />
        </div>
      </div>
      <div className='w-[85%] p-3'>
        <div className='flex justify-center h-full'>
          {/* <span className='text-3xl'>Admin Dashboard</span> */}
          <Grid entity={entity} columns={colDefs} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
