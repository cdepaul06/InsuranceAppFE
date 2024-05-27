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

const PolicyStatusCreateForm = ({
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [newPolicyStatus, setNewPolicyStatus] = useState({});
  const [visible, setVisible] = useState(true);

  const handleChange = useCallback((field, value) => {
    setNewPolicyStatus((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      const saveObject = { ...newPolicyStatus };
      apiCall("POST", `PolicyStatuses`, e.validationGroup, "", saveObject)
        .then(() => {
          setToastMessage({
            message: `Policy Status ${saveObject?.policyStatusName} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setVisible(false);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Create policy status failed: ${error}`,
            type: "error",
          });
          console.error("Create policy status failed:", error);
        });
    },
    [JSON.stringify(newPolicyStatus), setToastMessage]
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
                label='Status Name'
                value={newPolicyStatus?.policyStatusName}
                onValueChanged={({ value }) =>
                  handleChange("policyStatusName", value)
                }
              >
                <Validator>
                  <RequiredRule message='Status Name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Description'
                value={newPolicyStatus?.policyStatusDescription}
                onValueChanged={({ value }) =>
                  handleChange("policyStatusDescription", value)
                }
              >
                <Validator>
                  <RequiredRule message='Description is required' />
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
  }, [JSON.stringify(newPolicyStatus)]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
  }, [setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Create Policy Status`}
        visible={visible}
        onHiding={onHiding}
        contentRender={renderContent}
      />
    </div>
  );
};

export default PolicyStatusCreateForm;
