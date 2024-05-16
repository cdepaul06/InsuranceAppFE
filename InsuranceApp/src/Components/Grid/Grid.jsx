import React, { useState, useEffect, useCallback } from "react";
import DataGrid, {
  LoadPanel,
  FilterRow,
  ColumnChooser,
  Selection,
} from "devextreme-react/data-grid";
import { apiCall } from "../../API";

const Grid = ({ entity, queryParams }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const columnDefinitions = {
    CustomerPolicies: [
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
    ],
    Customers: [
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
        dataField: "address",
        caption: "Address",
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
    ],
    PolicyStatuses: [
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
    ],
    PolicyTypes: [
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
    ],
    Users: [
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
        calculateCellValue: ({ userStatusId }) => {
          return userStatusId === 1 ? "Active" : "Inactive";
        },
      },
      {
        alignment: "left",
        dataField: "userTypeId",
        caption: "User Type",
        dataType: "number",
        calculateCellValue: ({ userTypeId }) => {
          return userTypeId === 1 ? "Admin" : "User";
        },
      },
    ],
    UserStatuses: [
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
    ],
    UserTypes: [
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
    ],
  };

  const fetchData = async () => {
    setError(null);
    try {
      const fetchedData = await apiCall("GET", `${entity}`, null, queryParams);
      setData(fetchedData);
    } catch (err) {
      setError(`Error fetching data for ${entity}`);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entity, queryParams]);

  return (
    <div className='h-full'>
      <DataGrid
        id={`${entity}-Grid`}
        dataSource={data}
        showBorders={true}
        showRowLines={true}
        columns={columnDefinitions[entity] || []}
        noDataText={error || "No data available"}
        // rowAlternationEnabled={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        columnAutoWidth={true}
        selection={{ mode: "single" }}
      >
        <Selection mode='single' showCheckBoxesMode='always' />
        <ColumnChooser enabled={true} mode='select' />
        <FilterRow visible={true} />
        <LoadPanel enabled={true} />
      </DataGrid>
    </div>
  );
};

export default Grid;
