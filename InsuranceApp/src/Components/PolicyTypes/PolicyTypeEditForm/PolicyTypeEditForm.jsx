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

const PolicyTypeEditForm = ({
  policyType,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [editPolicyType, setEditPolicyType] = useState(policyType[0]);

  const handleChange = useCallback((field, value) => {
    setEditPolicyType((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      apiCall(
        "PUT",
        `policytypes/${editPolicyType?.policyTypeId}`,
        e.validationGroup,
        "",
        editPolicyType
      )
        .then(() => {
          setToastMessage({
            message: `Policy Type ${editPolicyType?.policyTypeName} saved successfully`,
            type: "success",
          });
          resetPopup(null);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Save policy type failed: ${error}`,
            type: "error",
          });
          console.error("Save policy type failed:", error);
        });
    },
    [JSON.stringify(editPolicyType)]
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
                label='Policy Type Name *'
                value={editPolicyType?.policyTypeName}
                onValueChanged={({ value }) =>
                  handleChange("policyTypeName", value)
                }
                placeholder='Policy Type Name'
              >
                <Validator>
                  <RequiredRule message='Policy type name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />

            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Policy Type Description *'
                value={editPolicyType?.policyTypeDescription}
                onValueChanged={({ value }) =>
                  handleChange("policyTypeDescription", value)
                }
                placeholder='Policy Type Description'
              >
                <Validator>
                  <RequiredRule message='Policy type description is required' />
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
  }, [JSON.stringify(editPolicyType)]);

  const onHiding = useCallback(() => {
    resetPopup(null);
    setRefetch((prev) => !prev);
  }, [resetPopup, setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Edit Policy Type: ${editPolicyType?.policyTypeName}`}
        visible={true}
        onHiding={onHiding}
        contentRender={renderContent}
        width={600}
        height={600}
      />
    </div>
  );
};

export default PolicyTypeEditForm;
