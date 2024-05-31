import React, { useCallback, useState } from "react";
import { Popup } from "devextreme-react/popup";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from "devextreme-react/responsive-box";
import { TextBox, Button } from "devextreme-react/";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { apiCall } from "../../../API";

const UserTypeCreateForm = ({ resetPopup, setRefetch, setToastMessage }) => {
  const [newUserType, setNewUserType] = useState({});
  const [visible, setVisible] = useState(true);

  const handleChange = useCallback((field, value) => {
    setNewUserType((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      const saveObject = { ...newUserType };
      apiCall("POST", `UserTypes`, e.validationGroup, "", saveObject)
        .then(() => {
          setToastMessage({
            message: `User Type ${saveObject?.userTypeName} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setVisible(false);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Create user type failed: ${error}`,
            type: "error",
          });
          console.error("Create user type failed:", error);
        });
    },
    [JSON.stringify(newUserType), setToastMessage]
  );

  const renderContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center'>
        <ResponsiveBox>
          <Row ratio={1} />
          <Col ratio={1} />
          <Col ratio={1} />

          <Item>
            <Location row={0} col={0} colspan={1} />

            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='User Type Name *'
                value={newUserType?.userTypeName}
                onValueChanged={({ value }) =>
                  handleChange("userTypeName", value)
                }
              >
                <Validator>
                  <RequiredRule message='User type name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />

            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='User Type Description *'
                value={newUserType?.userTypeDescription}
                onValueChanged={({ value }) =>
                  handleChange("userTypeDescription", value)
                }
              >
                <Validator>
                  <RequiredRule message='User type description is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>
        </ResponsiveBox>

        <div className='fixed bottom-10 flex flex-row'>
          <div className='p-2'>
            <Button
              {...DefaultComponentConfig.Button}
              text='Cancel'
              stylingMode='outlined'
              type='danger'
              onClick={() => {
                setRefetch((prev) => !prev);
                resetPopup(null);
                setVisible(false);
              }}
            />
          </div>
          <div className='p-2'>
            <Button
              {...DefaultComponentConfig.Button}
              text='Save'
              stylingMode='outlined'
              type='success'
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    );
  }, [JSON.stringify(newUserType)]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
    resetPopup(null);
  }, [setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Create User Type`}
        visible={visible}
        onHiding={onHiding}
        contentRender={renderContent}
      />
    </div>
  );
};

export default UserTypeCreateForm;
