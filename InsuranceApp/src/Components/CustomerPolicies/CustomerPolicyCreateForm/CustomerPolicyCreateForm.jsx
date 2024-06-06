import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { Popup } from "devextreme-react/popup";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from "devextreme-react/responsive-box";
import { DateBox, NumberBox, Button, Accordion } from "devextreme-react/";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { ValidationGroup } from "devextreme-react/validation-group";
import { apiCall } from "../../../API";
import PolicyTypeSelect from "../../PolicyTypes/PolicyTypeSelect/PolicyTypeSelect";
import PolicyStatusSelect from "../../PolicyStatuses/PolicyStatusSelect/PolicyStatusSelect";
import CustomerSelect from "../../Customers/CustomerSelect/CustomerSelect";

const CustomerPolicyCreateForm = ({
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [newCustomerPolicy, setNewCustomerPolicy] = useState({
    policyStatusId: 1, // * Active
    policyTypeId: 1, // * Auto
    policyStartDate: new Date(),
    policyEndDate: new Date(),
  });
  const [visible, setVisible] = useState(true);
  const [accordionTitle, setAccordionTitle] = useState(``);
  const validatorRef = useRef(null);

  const handleChange = useCallback((field, value) => {
    setNewCustomerPolicy((prev) => ({ ...prev, [field]: value }));
  }, []);

  const calculatePolicyEndDate = useCallback(() => {
    if (newCustomerPolicy?.policyTypeId === 1) {
      const policyStartDate = new Date(newCustomerPolicy?.policyStartDate);
      const policyEndDate = new Date(
        policyStartDate.setMonth(policyStartDate.getMonth() + 6)
      );
      handleChange("policyEndDate", policyEndDate);
    } else if (newCustomerPolicy?.policyTypeId === 2) {
      const policyStartDate = new Date(newCustomerPolicy?.policyStartDate);
      const policyEndDate = new Date(
        policyStartDate.setFullYear(policyStartDate.getFullYear() + 1)
      );
      handleChange("policyEndDate", policyEndDate);
    }
  }, [JSON.stringify(newCustomerPolicy)]);

  const handleSave = useCallback(
    (e) => {
      const saveObject = { ...newCustomerPolicy };
      apiCall("POST", `CustomerPolicies`, e.validationGroup, "", saveObject)
        .then(() => {
          setToastMessage({
            message: `Customer Policy ${saveObject?.customerPolicyName} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setVisible(false);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Create customer policy failed: ${error}`,
            type: "error",
          });
          console.error("Create customer policy failed:", error);
        });
    },
    [JSON.stringify(newCustomerPolicy), setToastMessage]
  );

  useEffect(() => {
    calculatePolicyEndDate();
  }, [newCustomerPolicy?.policyStartDate]);

  // determine the title of the accordion based on the policy type
  useEffect(() => {
    switch (newCustomerPolicy?.policyTypeId) {
      case 1:
        setAccordionTitle(`Auto Policy Details`);
        break;
      case 2:
        setAccordionTitle(`Home Policy Details`);
        break;
      default:
        setAccordionTitle(`Policy Details`);
        break;
    }
  }, [newCustomerPolicy?.policyTypeId]);

  const renderContent = useCallback(() => {
    return (
      <ValidationGroup ref={validatorRef}>
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
              <Location row={0} col={0} colspan={4} />
              <div className='p-2'>
                <CustomerSelect
                  value={newCustomerPolicy?.customerId}
                  setToastMessage={setToastMessage}
                  onValueChanged={({ value }) =>
                    handleChange("customerId", value)
                  }
                  required
                />
              </div>
            </Item>

            <Item>
              <Location row={1} col={0} colspan={2} />
              <div className='p-2'>
                <PolicyTypeSelect
                  value={newCustomerPolicy?.policyTypeId}
                  onValueChanged={({ value }) => {
                    handleChange("policyTypeId", value);
                  }}
                />
              </div>
            </Item>

            <Item>
              <Location row={1} col={2} colspan={2} />
              <div className='p-2'>
                <PolicyStatusSelect
                  value={newCustomerPolicy?.policyStatusId}
                  readOnly={true}
                  onValueChanged={({ value }) =>
                    handleChange("policyStatusId", value)
                  }
                />
              </div>
            </Item>

            <Item>
              <Location row={2} col={0} colspan={2} />
              <div className='p-2'>
                <DateBox
                  {...DefaultComponentConfig.DateBox}
                  label='Policy Start Date *'
                  value={newCustomerPolicy?.policyStartDate}
                  onValueChanged={({ value }) => {
                    handleChange("policyStartDate", value);
                    calculatePolicyEndDate();
                  }}
                >
                  <Validator>
                    <RequiredRule message='Policy start date is required' />
                  </Validator>
                </DateBox>
              </div>
            </Item>

            <Item>
              <Location row={2} col={2} colspan={2} />
              <div className='p-2'>
                <DateBox
                  {...DefaultComponentConfig.DateBox}
                  label='Policy End Date *'
                  value={newCustomerPolicy?.policyEndDate}
                  onValueChanged={({ value }) =>
                    handleChange("policyEndDate", value)
                  }
                >
                  <Validator>
                    <RequiredRule message='Policy end date is required' />
                  </Validator>
                </DateBox>
              </div>
            </Item>

            <Item>
              <Location row={3} col={0} colspan={4} />
              <div className='p-2'>
                <Accordion
                  collapsible={true}
                  dataSource={[{ title: `${accordionTitle}`, items: [] }]}
                  style={{
                    border: "1px solid var(--cyan-500)",
                  }}
                />
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
      </ValidationGroup>
    );
  }, [JSON.stringify(newCustomerPolicy), accordionTitle]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
    resetPopup(null);
  }, [setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Create Customer Policy`}
        visible={visible}
        height={800}
        width={800}
        onHiding={onHiding}
        contentRender={renderContent}
      />
    </div>
  );
};

export default CustomerPolicyCreateForm;
