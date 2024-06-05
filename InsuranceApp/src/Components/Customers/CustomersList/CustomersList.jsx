import React, { useMemo } from "react";
import Grid from "../../Grid/Grid";

const CustomersList = ({}) => {
  const fetchObject = useMemo(() => {
    return {
      endpoint: "Customers",
    };
  }, []);

  const columnDefs = [
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
      dataField: "address1",
      caption: "Address1",
      dataType: "string",
    },
    {
      alignment: "left",
      dataField: "address2",
      caption: "Address2",
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
  ];

  return (
    <div>
      <Grid
        fetchObject={fetchObject}
        title={"Customers"}
        columns={columnDefs}
      />
    </div>
  );
};

export default CustomersList;
