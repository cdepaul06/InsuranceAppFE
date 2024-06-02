import React, { useCallback, useState, useMemo } from "react";
import { Popup } from "devextreme-react/popup";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from "devextreme-react/responsive-box";
import { TextBox, DateBox, Button, Switch, NumberBox } from "devextreme-react/";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { apiCall } from "../../../API";
import PolicyTypeSelect from "../../PolicyTypes/PolicyTypeSelect/PolicyTypeSelect";
import PolicyStatusSelect from "../../PolicyStatuses/PolicyStatusSelect/PolicyStatusSelect";

const CustomerPolicyCreateForm = ({
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [newCustomerPolicy, setNewCustomerPolicy] = useState({
    policyStatusId: 1,
    policyTypeId: 1,
    policyStartDate: new Date(),
    policyEndDate: new Date(),
  });
  const [existingCustomer, setExistingCustomer] = useState(true);

  const [policyStatuses, setPolicyStatuses] = useState([]);
  const [visible, setVisible] = useState(true);

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

  const renderContent = useCallback(() => {
    return (
      <div className='flex flex-col items-center'>
        <div className='p-2 w-full'>
          <Switch
            defaultValue={false}
            style={{ width: "125px" }}
            switchedOffText='New Customer'
            value={existingCustomer}
            switchedOnText='Existing Customer'
            onValueChanged={({ value }) => setExistingCustomer(value)}
          />
        </div>
        <ResponsiveBox>
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />

          <Col ratio={1} />
          <Col ratio={1} />

          <Item>
            <Location row={0} col={0} colspan={1} />
          </Item>

          <Item>
            <Location row={3} col={0} colspan={1} />
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
            <Location row={3} col={1} colspan={1} />
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
            <Location row={4} col={0} colspan={1} />
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
            <Location row={4} col={1} colspan={1} />
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
            <Location row={5} col={0} colspan={1} />
            <div className='p-2'>
              <NumberBox
                {...DefaultComponentConfig.NumberBox_Decimal}
                label='Policy Premium *'
                min={0}
                value={newCustomerPolicy?.policyPremium}
                onValueChanged={({ value }) =>
                  handleChange("policyPremium", value)
                }
              >
                <Validator>
                  <RequiredRule message='Policy premium is required' />
                </Validator>
              </NumberBox>
            </div>
          </Item>
        </ResponsiveBox>
      </div>
    );
  }, [JSON.stringify(newCustomerPolicy)]);

  console.log("### newCustomerPolicy", newCustomerPolicy);

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
