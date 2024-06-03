import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { SelectBox } from "devextreme-react/select-box";
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
  PatternRule,
} from "devextreme-react/validator";
import StateSelect from "../../StateSelect/StateSelect";

const fetchCustomers = (() => {
  let dataPromise = null;

  return async () => {
    if (!dataPromise) {
      dataPromise = apiCall("GET", "Customers").catch((error) => {
        console.error("Get customers failed:", error);
        throw error;
      });
    }
    return dataPromise;
  };
})();

const CustomerSelect = ({
  value,
  onValueChanged,
  required = true,
  setResultsData,
  setToastMessage,
}) => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const customerSelectRef = useRef(null);

  useEffect(() => {
    fetchCustomers()
      .then((data) => {
        setCustomers(data);
        !!setResultsData && setResultsData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem = useCallback(
    (data) => {
      if (!data) return null;

      return (
        <div className='border-l-4 border-orange-500 p-1'>
          <p>
            {data?.lastName}, {data?.firstName} | {data?.phone} | {data?.email}
          </p>
          <p>
            {data?.address} {data?.address2} {data?.city}, {data?.state}{" "}
            {data?.zipCode}
          </p>
        </div>
      );
    },
    [value]
  );

  const displayExpr = useCallback((data) => {
    if (!data) return null;
    return `${data?.lastName}, ${data?.firstName}`;
  }, []);

  const addButton = useMemo(
    () => ({
      name: "add",
      location: "after",
      options: {
        icon: "add",
        stylingMode: "text",
        onClick: () => {
          setOpen(true);
        },
      },
    }),
    []
  );

  const onHiding = useCallback(() => {
    setOpen(false);
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
          setRefetch((prev) => !prev);
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
      <div className='flex flex-col items-center'>
        <ResponsiveBox>
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Col ratio={1} />
          <Col ratio={1} />

          <Item>
            <Location row={0} col={0} colspan={1} />
            <div className='p-2'>
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
                onValueChanged={({ value }) =>
                  handleNewCustomerChange("phone", value)
                }
              >
                <Validator>
                  <RequiredRule message='Phone is required' />
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
                  <PatternRule
                    message='Invalid email address'
                    pattern={`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}
                  />
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
                  handleNewCustomerChange("address", value)
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
                  handleNewCustomerChange("zipCode", value)
                }
              >
                <Validator>
                  <RequiredRule message='Zip code is required' />
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
                setOpen(false);
                setNewCustomer(null);
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
  }, [JSON.stringify(newCustomer)]);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        ref={customerSelectRef}
        dataSource={customers}
        label='Customer *'
        displayExpr={displayExpr}
        valueExpr='customerId'
        value={value}
        itemRender={renderItem}
        placeholder='Select customer'
        onValueChanged={onValueChanged}
        dropDownOptions={{ minHeight: "10rem" }}
        buttons={[addButton, "dropDown"]}
      >
        {required && (
          <Validator>
            <RequiredRule message='Customer is required' />
          </Validator>
        )}
      </SelectBox>

      {open && (
        <Popup
          {...DefaultComponentConfig.Popup}
          height={800}
          width={800}
          visible={open}
          contentRender={renderContent}
          onHiding={onHiding}
          title='Add Customer'
        />
      )}
    </div>
  );
};

export default CustomerSelect;
