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

const PolicyTypeCreateForm = ({ resetPopup, setRefetch, setToastMessage }) => {
  const [newPolicyType, setNewPolicyType] = useState({});
  const [visible, setVisible] = useState(true);

  const handleChange = useCallback((field, value) => {
    setNewPolicyType((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      const saveObject = { ...newPolicyType };
      apiCall("POST", `PolicyTypes`, e.validationGroup, "", saveObject)
        .then(() => {
          setToastMessage({
            message: `Policy Type ${saveObject?.policyTypeName} created successfully`,
            type: "success",
          });
          resetPopup(null);
          setVisible(false);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Create policy type failed: ${error}`,
            type: "error",
          });
          console.error("Create policy type failed:", error);
        });
    },
    [JSON.stringify(newPolicyType), setToastMessage]
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

            <TextBox
              {...DefaultComponentConfig.TextBox}
              label='Policy Type Name'
              value={newPolicyType?.policyTypeName}
              onValueChanged={(e) => handleChange("policyTypeName", e.value)}
            >
              <Validator>
                <RequiredRule message='Policy Type Name is required' />
              </Validator>
            </TextBox>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />

            <TextBox
              {...DefaultComponentConfig.TextBox}
              label='Policy Type Description'
              value={newPolicyType?.description}
              onValueChanged={(e) =>
                handleChange("policyTypeDescription", e.value)
              }
            >
              <Validator>
                <RequiredRule message='Policy Type Description is required' />
              </Validator>
            </TextBox>
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
  }, [JSON.stringify(newPolicyType)]);

  const onHiding = useCallback(() => {
    setRefetch((prev) => !prev);
    resetPopup(null);
  }, [setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Create Policy Type`}
        visible={visible}
        onHiding={onHiding}
        contentRender={renderContent}
      />
    </div>
  );
};

export default PolicyTypeCreateForm;
