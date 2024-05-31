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

const UserStatusEditForm = ({
  userStatus,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [editUserStatus, setEditUserStatus] = useState(userStatus[0]);

  const handleChange = useCallback((field, value) => {
    setEditUserStatus((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      apiCall(
        "PUT",
        `userstatuses/${editUserStatus?.userStatusId}`,
        e.validationGroup,
        "",
        editUserStatus
      )
        .then(() => {
          setToastMessage({
            message: `User Status ${editUserStatus?.userStatusName} saved successfully`,
            type: "success",
          });
          resetPopup(null);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Save user status failed: ${error}`,
            type: "error",
          });
          console.error("Save user status failed:", error);
        });
    },
    [JSON.stringify(editUserStatus)]
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
                label='User Status Name *'
                value={editUserStatus?.userStatusName}
                onValueChanged={({ value }) =>
                  handleChange("userStatusName", value)
                }
                placeholder='User Status Name'
              >
                <Validator>
                  <RequiredRule message='User status name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />

            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='User Status Description *'
                value={editUserStatus?.userStatusDescription}
                onValueChanged={({ value }) =>
                  handleChange("userStatusDescription", value)
                }
                placeholder='User Status Description'
              >
                <Validator>
                  <RequiredRule message='User status description is required' />
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
  }, [JSON.stringify(editUserStatus)]);

  const onHiding = useCallback(() => {
    resetPopup(null);
    setRefetch((prev) => !prev);
  }, [resetPopup, setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Edit User Status: ${editUserStatus?.userStatusName}`}
        visible={true}
        onHiding={onHiding}
        contentRender={renderContent}
        width={600}
        height={600}
      />
    </div>
  );
};

export default UserStatusEditForm;
