import React, { useState, useEffect } from "react";
import { DataGrid } from "devextreme-react";
import { LoadPanel } from "devextreme-react/cjs/data-grid";
import { apiCall } from "../../API";

const Grid = ({ entity, columns, queryParams }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await apiCall("GET", `${entity}`, null, queryParams);
      setData(fetchedData);
    } catch (err) {
      setError(`Error fetching data for ${entity}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entity, queryParams]); // Refetch when entity or queryParams change

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
