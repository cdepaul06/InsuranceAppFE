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

const PolicyStatusEditForm = ({
  policyStatus,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const [editPolicyStatus, setEditPolicyStatus] = useState(policyStatus[0]);

  const handleChange = useCallback((field, value) => {
    setEditPolicyStatus((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      apiCall(
        "PUT",
        `policystatuses/${editPolicyStatus?.policyStatusId}`,
        e.validationGroup,
        "",
        editPolicyStatus
      )
        .then(() => {
          setToastMessage({
            message: `Policy Status ${editPolicyStatus?.policyStatusName} saved successfully`,
            type: "success",
          });
          resetPopup(null);
          setRefetch((prev) => !prev);
        })
        .catch((error) => {
          setToastMessage({
            message: `Save policy status failed: ${error}`,
            type: "error",
          });
          console.error("Save policy status failed:", error);
        });
    },
    [JSON.stringify(editPolicyStatus)]
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
                label='Policy Status Name *'
                value={editPolicyStatus?.policyStatusName}
                onValueChanged={({ value }) =>
                  handleChange("policyStatusName", value)
                }
                placeholder='Policy Status Name'
              >
                <Validator>
                  <RequiredRule message='Policy status name is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />

            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                label='Policy Status Description *'
                value={editPolicyStatus?.policyStatusDescription}
                onValueChanged={({ value }) =>
                  handleChange("policyStatusDescription", value)
                }
                placeholder='Policy Status Description'
              >
                <Validator>
                  <RequiredRule message='Policy status description is required' />
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
  }, [JSON.stringify(editPolicyStatus)]);

  const onHiding = useCallback(() => {
    resetPopup(null);
    setRefetch((prev) => !prev);
  }, [resetPopup, setRefetch]);

  return (
    <div>
      <Popup
        {...DefaultComponentConfig.Popup}
        title={`Edit Policy Status: ${editPolicyStatus?.policyStatusName}`}
        visible={true}
        onHiding={onHiding}
        contentRender={renderContent}
        width={600}
        height={600}
      />
    </div>
  );
};

export default PolicyStatusEditForm;
