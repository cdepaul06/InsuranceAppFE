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

const UserTypeEditForm = ({
  userType,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [editUserType, setEditUserType] = useState(userType[0]);

  const handleChange = useCallback((field, value) => {
    setEditUserType((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      apiCall(
        "PUT",
        `UserTypes/${editUserType?.userTypeId}`,
        e.validationGroup,
        "",
        editUserType
      )
        .then(() => {
          setToastMessage({
            message: `User Type ${editUserType?.userTypeName} saved successfully`,
            type: "success",
          });
          resetPopup(null);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Save user type failed: ${error}`,
            type: "error",
          });
          console.error("Save user type failed:", error);
        });
    },
    [JSON.stringify(editUserType)]
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
                value={editUserType?.userTypeName}
                onValueChanged={({ value }) =>
                  handleChange("userTypeName", value)
                }
                placeholder='User Type Name'
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
                value={editUserType?.userTypeDescription}
                onValueChanged={({ value }) =>
                  handleChange("userTypeDescription", value)
                }
                placeholder='User Type Description'
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
                resetPopup(null);
                setRefetch((prev) => !prev);
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
  }, [JSON.stringify(editUserType)]);

  const onHiding = useCallback(() => {
    resetPopup(null);
    setRefetch((prev) => !prev);
  }, [resetPopup, setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Edit User Type: ${editUserType?.userTypeName}`}
        visible={true}
        onHiding={onHiding}
        contentRender={renderContent}
        width={600}
        height={600}
      />
    </div>
  );
};

export default UserTypeEditForm;
