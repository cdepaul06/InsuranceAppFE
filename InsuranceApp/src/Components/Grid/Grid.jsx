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
import { Toast } from "devextreme-react/toast";
import { apiCall } from "../../API/index";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";
import { entities } from "../../Constants/Entities";
import notify from "devextreme/ui/notify";

/**
 * Main Grid component used in the application.
 * @param {Object} fetchObject - The object containing the fetch method and endpoint.
 * @param {String} title - The title of the grid.
 * @param {Array} columns - The columns to display in the grid.
 * @param {Boolean} refetch - The state to trigger a refetch of the data.
 * @returns {JSX.Element}
 */
const Grid = ({ fetchObject, title, columns, ...props }) => {
  const dataGridRef = useRef(null);
  const initialFetch = useRef(false);
  const [gridData, setGridData] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    message: "",
    type: "",
  });

  // * Fetch data from the API
  const fetchData = async () => {
    await apiCall("GET", fetchObject.endpoint)
      .then((data) => {
        setGridData(data);
        setToastMessage({
          message: `Successfully fetched data for ${title}`,
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Fetch data failed:", error);
      });
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
      dataGridRef.current.instance.deselectAll();
    }

    return () => {
      setRefetch(false);
    };
  }, [refetch]);

  useEffect(() => {
    setToastMessage({ message: "", type: "" });
  }, [title]);

  // * Handle when the selection changes
  const handleSelectionChanged = useCallback(() => {
    const selectedRows = dataGridRef.current.instance.getSelectedRowsData();
    setSelectedEntities(selectedRows);
  }, []);

  const handleActionClick = useCallback(
    (action) => {
      const { component, props } = action.func(
        selectedEntities,
        setSelectedPopup,
        setRefetch,
        setToastMessage
      );
      if (component) {
        setSelectedPopup({ component, props });
      } else {
        setSelectedPopup(null);
      }
    },
    [selectedEntities]
  );

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
            style={{ backgroundColor: "#06b6d4" }}
            disabled={
              selectedEntities?.length < action.min ||
              selectedEntities?.length > action.max
            }
            icon={action.icon}
            onClick={() => handleActionClick(action)}
          />
        </Item>
      );
    });
  }, [fetchObject, selectedEntities]);

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
                dataGridRef.current.instance.clearSelection();
                dataGridRef.current.instance.state({
                  filterValue: [],
                  sort: [],
                });
                fetchData();
              }}
            />
          </Item>
        </Toolbar>
        {selectedPopup && (
          <div>
            {React.createElement(selectedPopup.component, selectedPopup.props)}
          </div>
        )}
      </DataGrid>

      <Toast
        visible={!!toastMessage?.message}
        width={300}
        message={toastMessage?.message}
        duration={3000}
        type={toastMessage?.type}
        onHiding={() => setToastMessage({ message: "", type: "" })}
      />
    </div>
  );
};

export default Grid;
