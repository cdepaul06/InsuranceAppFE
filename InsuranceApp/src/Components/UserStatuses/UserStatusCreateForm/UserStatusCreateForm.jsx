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

const UserStatusCreateForm = ({ resetPopup, setRefetch, setToastMessage }) => {
  const [newUserStatus, setNewUserStatus] = useState({});
  const [visible, setVisible] = useState(true);

  const handleChange = useCallback((field, value) => {
    setNewUserStatus((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      const saveObject = { ...newUserStatus };
      apiCall("POST", `UserStatuses`, e.validationGroup, "", saveObject)
        .then(() => {
          setToastMessage({
            message: `User Status ${saveObject?.userStatusName} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setVisible(false);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Create user status failed: ${error}`,
            type: "error",
          });
          console.error("Create user status failed:", error);
        });
    },
    [JSON.stringify(newUserStatus), setToastMessage]
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
                label='User Status Name'
                value={newUserStatus?.userStatusName}
                onValueChanged={({ value }) =>
                  handleChange("userStatusName", value)
                }
              >
                <Validator>
                  <RequiredRule message='User status Name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />

            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='User Status Description'
                value={newUserStatus?.userStatusDescription}
                onValueChanged={({ value }) =>
                  handleChange("userStatusDescription", value)
                }
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
  }, [JSON.stringify(newUserStatus)]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
    resetPopup(null);
  }, [setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Create User Status`}
        visible={visible}
        onHiding={onHiding}
        contentRender={renderContent}
      />
    </div>
  );
};

export default UserStatusCreateForm;
