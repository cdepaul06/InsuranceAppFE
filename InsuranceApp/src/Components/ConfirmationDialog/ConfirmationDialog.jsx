import React, { useState, useCallback } from "react";
import { Popup } from "devextreme-react/popup";
import { Button } from "devextreme-react/button";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const ConfirmationDialog = ({
  message,
  apiCall,
  onClose,
  confirmButtonText,
}) => {
  const contentRender = useCallback(() => {
    return (
      <div className='flex flex-col items-center justify-center h-[100%]'>
        <p>{message}</p>

        <div className='flex justify-between mt-14 w-[50%]'>
          <Button
            {...DefaultComponentConfig.Button}
            text='Cancel'
            type='danger'
            stylingMode='outlined'
            onClick={() => {
              onClose(null);
            }}
          />

          <Button
            {...DefaultComponentConfig.Button}
            text={confirmButtonText || "Confirm"}
            type='success'
            stylingMode='outlined'
            onClick={() => {
              apiCall();
              onClose(null);
            }}
          />
        </div>
      </div>
    );
  }, []);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Confirmation_Popup}
        title='Confirmation'
        visible={true}
        onHiding={() => {
          onClose(null);
        }}
        contentRender={contentRender}
      />
    </div>
  );
};

export default ConfirmationDialog;
