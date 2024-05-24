import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import DataGrid, {
  LoadPanel,
  FilterRow,
  Selection,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import { apiCall } from "../../API/index";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const Grid = ({ fetchObject, title, columns, refetch, ...props }) => {
  const dataGridRef = useRef(null);
  const [gridData, setGridData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await apiCall("GET", fetchObject.endpoint);
      setGridData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchObject, refetch]);

  return (
    <div>
      <div className='p-3'>
        <h3>{title}</h3>
      </div>
      <DataGrid
        ref={dataGridRef}
        columns={columns}
        dataSource={gridData}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        allowColumnHiding={true}
        showRowLines={true}
        {...props}
      >
        <LoadPanel enabled={true} />
        <FilterRow visible={true} />
        <Selection mode='single' />
        <Toolbar>
          <Item name='refresh' location='after'>
            <Button
              {...DefaultComponentConfig.Button}
              icon='refresh'
              onClick={() => {
                fetchData();
              }}
            />
          </Item>
        </Toolbar>
      </DataGrid>
    </div>
  );
};

export default React.memo(Grid);
