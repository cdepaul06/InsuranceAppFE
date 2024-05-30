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
import UserTypeSelect from "../../UserTypes/UserTypeSelect/UserTypeSelect";
import UserStatusSelect from "../../UserStatuses/UserStatusSelect/UserStatusSelect";

const UserCreateForm = ({ resetPopup, setRefetch, setToastMessage }) => {
  const [newUser, setNewUser] = useState({});
  const [visible, setVisible] = useState(true);

  const handleChange = useCallback((field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      const saveObject = { ...newUser };
      saveObject.lastLogin = new Date(Date.now()).toISOString();
      apiCall("POST", `users`, e.validationGroup, "", saveObject)
        .then(() => {
          setToastMessage({
            message: `User ${saveObject?.email} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setVisible(false);
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
    [JSON.stringify(newUser), setToastMessage]
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
                value={newUser?.email}
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
                value={newUser?.password}
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
                value={newUser?.confirmPassword}
                onValueChanged={({ value }) =>
                  handleChange("confirmPassword", value)
                }
              >
                <Validator>
                  <RequiredRule message='Password is required' />
                  <CompareRule
                    message='Passwords do not match'
                    comparisonTarget={() => newUser?.password}
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
                value={newUser?.firstName}
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
                value={newUser?.lastName}
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
            <div className='p-2'>
              <UserTypeSelect
                onValueChanged={({ value }) =>
                  handleChange("userTypeId", value)
                }
              />
            </div>
          </Item>

          <Item>
            <Location row={3} col={2} colspan={2} />
            <div className='p-2'>
              <UserStatusSelect
                onValueChanged={({ value }) =>
                  handleChange("userStatusId", value)
                }
              />
            </div>
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
  }, [JSON.stringify(newUser)]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
    resetPopup(null);
  }, [setRefetch]);

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
