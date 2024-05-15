import React, { useState, useEffect } from "react";
import { DataGrid } from "devextreme-react";
import { LoadPanel } from "devextreme-react/cjs/data-grid";
import { apiCall } from "../../API";

const Grid = ({ entity, columns, queryParams }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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
    <div>
      <DataGrid
        id={`${entity}-Grid`}
        dataSource={data}
        showBorders={true}
        columns={columns}
        noDataText={error}
        rowAlternationEnabled={true}
      >
        <LoadPanel enabled={true} />
      </DataGrid>
    </div>
  );
};

export default Grid;
