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
import Button from "devextreme-react/button";
import { Toast } from "devextreme-react";
import { columnDefs } from "../../Constants/ColumnDefs";
import { entities } from "../../Constants/Entities";
import { apiCall } from "../../API";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const Grid = ({ entity, queryParams }) => {
  const dataGridRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
  });

  const fetchData = async () => {
    try {
      const fetchedData = await apiCall("GET", entity, null, queryParams);
      setData(fetchedData);

      setToast({
        isVisible: true,
        type: "success",
        message: `Successfully fetched data for ${
          entities.find((x) => x.endpoint === entity)?.buttonLabel
        }`,
      });
    } catch (err) {
      setData([]);
      setToast({
        isVisible: true,
        type: "error",
        message: `Error fetching data for ${entity}: ${err.message}`,
      });
    }
    if (dataGridRef.current) {
      dataGridRef.current.instance.refresh();
    }
  };

  useEffect(() => {
    fetchData();
    setSelectedEntity(null);
  }, [entity, queryParams]);

  const onToastHiding = useCallback(() => {
    setToast({
      isVisible: false,
      message: "",
    });
  }, []);

  const positionConfig = useMemo(() => {
    return {
      at: "bottom right",
      my: "bottom right",
      offset: "-15 -15",
      of: window,
    };
  }, []);

  const onRowSelected = useCallback(({ selectedRowsData }) => {
    setSelectedEntity(selectedRowsData[0]);
  }, []);

  return (
    <div>
      <div className='h-full flex-col justify-center'>
        <div className='p-3'>
          <h2 className='text-2xl font-bold'>
            {entities.find((x) => x.endpoint === entity)?.buttonLabel} Grid
          </h2>
        </div>
        <DataGrid
          id={`${entity}-Grid`}
          ref={dataGridRef}
          dataSource={data}
          showBorders={true}
          showRowLines={true}
          columns={columnDefs[entity] || []}
          noDataText={""}
          allowColumnResizing={true}
          allowColumnReordering={true}
          columnAutoWidth={true}
          selection={{ mode: "single" }}
          onSelectionChanged={onRowSelected}
          remoteOperations={true}
        >
          <LoadPanel enabled={true} />
          <FilterRow visible={true} />
          <Selection mode='single' />
          <Toolbar>
            <Item name='columnChooser' location='before' locateInMenu='auto' />
            {Object.values(
              entities.find((e) => e.endpoint === entity).actions
            ).map((action, index) => (
              <Item key={index} location='before'>
                <Button
                  {...DefaultComponentConfig.Button}
                  disabled={selectedEntity === null}
                  stylingMode='contained'
                  type='default'
                  icon={action.icon || ""}
                  text={action.actionName}
                  onClick={() => {
                    setSelectedAction(action);
                  }}
                />
              </Item>
            ))}
            <Item name='refresh' locateInMenu='auto'>
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
      <div>
        <Toast
          {...DefaultComponentConfig.Toast}
          visible={toast.isVisible}
          type={toast.type}
          message={toast.message}
          onHiding={onToastHiding}
          displayTime={1500}
          width={300}
          position={positionConfig}
        />
      </div>
    </div>
  );
};

export default Grid;
