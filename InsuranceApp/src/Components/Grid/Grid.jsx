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
import EntityPopup from "../EntityPopup/EntityPopup";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const Grid = ({ entity, queryParams }) => {
  const dataGridRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [selectedAction, setSelectedAction] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
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
    setSelectedEntity({});
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

  const renderEntityPopup = useCallback((action) => {
    setSelectedAction(action);
    setOpenPopup(true);
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
            {entities
              .find((e) => e.endpoint === entity)
              .actions.map((action, index) => (
                <Item key={index} location='before'>
                  <Button
                    {...DefaultComponentConfig.Button}
                    stylingMode='contained'
                    type='default'
                    icon={action.icon || ""}
                    text={action.actionName}
                    onClick={() => renderEntityPopup(action)}
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
      <div>
        {openPopup && (
          <EntityPopup
            selectedEntity={selectedEntity}
            selectedAction={selectedAction}
            entity={entities.find((e) => e.endpoint === entity)?.buttonLabel}
            onClose={() => {
              setOpenPopup(false);
              setSelectedAction(null);
              setSelectedEntity({});
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Grid;
