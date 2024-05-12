import React, { useEffect, useCallback } from "react";
import { Popup, TextBox, SelectBox, TextArea, Button } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";
import { apiCall } from "../../API";

const GenericPopup = ({ action, entityName, open, setOpen }) => {
  useEffect(() => {
    switch (action.toLowerCase()) {
      case "create":
        console.log("create");
        break;
      case "edit":
        console.log("edit");
        break;
      case "delete":
        console.log("delete");
        break;
      default:
    }
  }, []);

  const contentRender = useCallback(() => {
    return (
      <>
        <div className='flex flex-col space-y-2'>
          <TextBox
            {...DefaultComponentConfig.TextBox}
            style={{ margin: "0.8rem" }}
            label={"Name"}
            value={entityName}
          />

          <SelectBox
            {...DefaultComponentConfig.SelectBox}
            style={{ margin: "0.8rem" }}
            label='Type'
            items={["Type 1", "Type 2", "Type 3"]}
          />

          <TextArea
            {...DefaultComponentConfig.TextArea}
            style={{ margin: "0.8rem" }}
            label={"Description"}
          />

          <div className='flex justify-center'>
            <div className='flex space-x-2'>
              <Button
                {...DefaultComponentConfig.Button}
                text={"Cancel"}
                onClick={() => setOpen(false)}
                type='normal'
              />
              <Button
                {...DefaultComponentConfig.Button}
                text={"Save"}
                type='success'
              />
            </div>
          </div>
        </div>
      </>
    );
  }, [open]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={entityName}
        visible={open}
        onHiding={() => setOpen(false)}
        contentRender={contentRender}
      />
    </div>
  );
};

export default GenericPopup;
