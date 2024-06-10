import React, { useState, useRef, useCallback } from "react";
import { TextBox } from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";
import { Popup } from "devextreme-react/popup";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from "devextreme-react/responsive-box";
import Validator, {
  RequiredRule,
  EmailRule,
  PatternRule,
} from "devextreme-react/validator";
import StateSelect from "../../StateSelect/StateSelect";
import { ValidationGroup } from "devextreme-react/validation-group";
import { getScreenSize } from "../../../Utilities";

const CustomerCreateForm = ({
  resetPopup,
  setRefetch,
  setToastMessage,
  setOpen,
  open,
}) => {
  const validatorRef = useRef(null);
  const [newCustomer, setNewCustomer] = useState(null);

  const onHiding = useCallback(() => {
    !!setOpen && setOpen(false);
    !!resetPopup && resetPopup();
    !!setRefetch && setRefetch((prev) => !prev);
    setNewCustomer(null);
  }, []);

  const handleNewCustomerChange = useCallback(
    (field, value) => {
      setNewCustomer({ ...newCustomer, [field]: value });
    },
    [JSON.stringify(newCustomer)]
  );

  const handleSave = useCallback(
    (e) => {
      apiCall("POST", "Customers", e.validationGroup, "", newCustomer)
        .then(() => {
          setToastMessage({
            message: `Customer ${newCustomer?.firstName} ${newCustomer?.lastName} created successfully`,
            type: "success",
          });
          onHiding();
        })
        .catch((error) => {
          setToastMessage({
            message: `Create customer failed: ${error}`,
            type: "error",
          });
          console.error("Create customer failed:", error);
        });
    },
    [JSON.stringify(newCustomer), setToastMessage]
  );

  const renderContent = useCallback(() => {
    return (
      <ValidationGroup ref={validatorRef}>
        <div className='flex flex-col items-center'>
          <ResponsiveBox screenByWidth={getScreenSize}>
            <Row ratio={1} />
            <Row ratio={1} />
            <Row ratio={1} />
            <Row ratio={1} />
            <Row ratio={1} />
            <Col ratio={1} />
            <Col ratio={1} />

            <Item>
              <Location row={0} col={0} colspan={1} />
              <div className='p-2 h-full'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.firstName}
                  label='First Name *'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("firstName", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='First name is required' />
                    <PatternRule
                      message='Only letters allowed'
                      pattern={`^[a-zA-Z]+$`}
                    />
                  </Validator>
                </TextBox>
              </div>
            </Item>

            <Item>
              <Location row={0} col={1} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.lastName}
                  label='Last Name *'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("lastName", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='Last name is required' />
                    <PatternRule
                      message='Only letters allowed'
                      pattern={`^[a-zA-Z]+$`}
                    />
                  </Validator>
                </TextBox>
              </div>
            </Item>

            <Item>
              <Location row={1} col={0} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.phone}
                  label='Phone *'
                  mode='tel'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("phone", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='Phone is required' />
                    <PatternRule
                      message='Invalid phone number'
                      pattern={`^\\d{3}-\\d{3}-\\d{4}$`}
                    />
                  </Validator>
                </TextBox>
              </div>
            </Item>

            <Item>
              <Location row={1} col={1} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.email}
                  label='Email *'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("email", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='Email is required' />
                    <EmailRule message='Invalid email' />
                  </Validator>
                </TextBox>
              </div>
            </Item>

            <Item>
              <Location row={2} col={0} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.address}
                  label='Address *'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("address1", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='Address is required' />
                  </Validator>
                </TextBox>
              </div>
            </Item>

            <Item>
              <Location row={2} col={1} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.address2}
                  label='Address 2'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("address2", value)
                  }
                />
              </div>
            </Item>

            <Item>
              <Location row={3} col={0} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.city}
                  label='City *'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("city", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='City is required' />
                    <PatternRule
                      message='Only letters allowed'
                      pattern={`^[a-zA-Z]+$`}
                    />
                  </Validator>
                </TextBox>
              </div>
            </Item>

            <Item>
              <Location row={3} col={1} colspan={1} />
              <div className='p-2'>
                <StateSelect
                  value={newCustomer?.state}
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("state", value)
                  }
                  required
                />
              </div>
            </Item>

            <Item>
              <Location row={4} col={0} colspan={1} />
              <div className='p-2'>
                <TextBox
                  {...DefaultComponentConfig.TextBox}
                  value={newCustomer?.zipCode}
                  label='Zip Code *'
                  onValueChanged={({ value }) =>
                    handleNewCustomerChange("zip", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='Zip code is required' />
                    <PatternRule
                      message='Invalid zip code'
                      pattern={`^\\d{5}$`}
                    />
                  </Validator>
                </TextBox>
              </div>
            </Item>
          </ResponsiveBox>

          <div className='fixed bottom-10 flex flex-row justify-center w-full'>
            <div className='p-2'>
              <Button
                {...DefaultComponentConfig.Button}
                text='Cancel'
                stylingMode='outlined'
                type='danger'
                onClick={onHiding}
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
      </ValidationGroup>
    );
  }, [JSON.stringify(newCustomer)]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        height={800}
        width={900}
        visible={open}
        contentRender={renderContent}
        onHiding={onHiding}
        title='Add Customer'
      />
    </div>
  );
};

export default CustomerCreateForm;
