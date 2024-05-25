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
import { entities } from "../../Constants/Entities";

/**
 * Main Grid component used in the application.
 * @param {Object} fetchObject - The object containing the fetch method and endpoint.
 * @param {String} title - The title of the grid.
 * @param {Array} columns - The columns to display in the grid.
 * @param {Boolean} refetch - The state to trigger a refetch of the data.
 * @returns {JSX.Element}
 */
const Grid = ({
  fetchObject = { method: "GET" },
  title,
  columns,
  refetch,
  setRefetch,
  ...props
}) => {
  const dataGridRef = useRef(null);
  const initialFetch = useRef(false);
  const [gridData, setGridData] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);

  // * Fetch data from the API
  const fetchData = async () => {
    try {
      const data = await apiCall("GET", fetchObject.endpoint);
      setGridData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // * This is to ensure we aren't double fetching data on initial render
    if (!initialFetch.current) {
      fetchData();
      initialFetch.current = true;
    }
  }, [fetchObject]);

  // * Refetch data when refetch state changes
  useEffect(() => {
    if (refetch) {
      fetchData();
    }
  }, [refetch]);

  // * Handle when the selection changes
  const handleSelectionChanged = useCallback(() => {
    const selectedRows = dataGridRef.current.instance.getSelectedRowsData();
    setSelectedEntities(selectedRows);
  }, []);

  // * Render actions based on the entity
  const renderActions = useCallback(() => {
    const entity = entities.find(
      (entity) => entity.endpoint === fetchObject.endpoint
    );

    if (!entity || !entity.actions) return null;

    return Object.keys(entity.actions).map((actionKey, index) => {
      const action = entity.actions[actionKey];

      return (
        <Item key={index} name={actionKey} location='before'>
          <Button
            {...DefaultComponentConfig.Button}
            text={action.actionName}
            disabled={
              selectedEntities?.length < action.min ||
              selectedEntities?.length > action.max
            }
            icon={action.icon}
            onClick={() => action.func(selectedEntities)}
          />
        </Item>
      );
    });
  }, [fetchObject, JSON.stringify(selectedEntities)]);

  return (
    <div>
      <div className='p-3'>
        <h3>{title}</h3>
      </div>
      <DataGrid
        ref={dataGridRef}
        key={title}
        columns={columns}
        dataSource={gridData}
        remoteOperations={"auto"}
        showBorders={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
        allowColumnHiding={true}
        showRowLines={true}
        noDataText={`No data available for ${title}`}
        onSelectionChanged={handleSelectionChanged}
        {...props}
      >
        <LoadPanel enabled={true} />
        <FilterRow visible={true} />
        <Selection mode='multiple' showCheckBoxesMode='always' />
        <Toolbar>
          {renderActions()}
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

export default Grid;
