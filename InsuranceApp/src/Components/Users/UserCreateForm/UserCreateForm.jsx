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
import Validator, {
  RequiredRule,
  CompareRule,
} from "devextreme-react/validator";
import { apiCall } from "../../../API";

const UserCreateForm = ({ resetPopup, setRefetch, setToastMessage }) => {
  const [editUser, setEditUser] = useState({});
  const [visible, setVisible] = useState(true);

  const handleChange = useCallback((field, value) => {
    setEditUser((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      apiCall("POST", `users`, e.validationGroup, "", editUser)
        .then(() => {
          setToastMessage({
            message: `User ${editUser?.email} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Create user failed: ${error}`,
            type: "error",
          });
          console.error("Create user failed:", error);
        });
    },
    [JSON.stringify(editUser)]
  );

  const renderContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center'>
        <ResponsiveBox>
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />

          <Col ratio={1} />
          <Col ratio={1} />
          <Col ratio={1} />
          <Col ratio={1} />

          <Item>
            <Location row={0} col={1} colspan={2} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Email *'
                value={editUser?.email}
                mode='email'
                onValueChanged={({ value }) => handleChange("email", value)}
              >
                <Validator>
                  <RequiredRule message='Email is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={1} col={0} colspan={2} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Password *'
                mode='password'
                value={editUser?.password}
                onKeyDown={() => {
                  handleChange("confirmPassword", null);
                }}
                onValueChanged={({ value }) => handleChange("password", value)}
              >
                <Validator>
                  <RequiredRule message='Password is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={1} col={2} colspan={2} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Confirm Password *'
                mode='password'
                value={editUser?.confirmPassword}
                onValueChanged={({ value }) =>
                  handleChange("confirmPassword", value)
                }
              >
                <Validator>
                  <RequiredRule message='Password is required' />
                  <CompareRule
                    message='Passwords do not match'
                    comparisonTarget={() => editUser?.password}
                  />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={2} col={0} colspan={2} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='First Name *'
                value={editUser?.firstName}
                onValueChanged={({ value }) => handleChange("firstName", value)}
              >
                <Validator>
                  <RequiredRule message='First Name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={2} col={2} colspan={2} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Last Name *'
                value={editUser?.lastName}
                onValueChanged={({ value }) => handleChange("lastName", value)}
              >
                <Validator>
                  <RequiredRule message='Last Name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={3} col={0} colspan={2} />
            <div className='p-2'>{/* UserTypeSelect goes here */}</div>
          </Item>

          <Item>
            <Location row={3} col={2} colspan={2} />
            <div className='p-2'>{/* UserStatusSelect goes here */}</div>
          </Item>
        </ResponsiveBox>
        <div className='fixed bottom-10 flex flex-row'>
          <div className='p-2'>
            <Button
              {...DefaultComponentConfig.Button}
              text='Cancel'
              onClick={() => {
                setVisible(false);
              }}
            />
          </div>
          <div className='p-2'>
            <Button
              {...DefaultComponentConfig.Button}
              text='Save'
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    );
  }, [JSON.stringify(editUser)]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
  }, [resetPopup, setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Create User`}
        visible={visible}
        onHiding={onHiding}
        contentRender={renderContent}
        width={600}
        height={600}
      />
    </div>
  );
};

export default UserCreateForm;
