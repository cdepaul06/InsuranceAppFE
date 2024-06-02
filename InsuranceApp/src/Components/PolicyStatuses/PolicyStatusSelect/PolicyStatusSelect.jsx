import React, { useEffect, useState, useRef } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule } from "devextreme-react/validator";

const fetchPolicyStatuses = (() => {
  let dataPromise = null;

  return async () => {
    if (!dataPromise) {
      dataPromise = apiCall("GET", "PolicyStatuses").catch((error) => {
        console.error("Get policy statuses failed:", error);
        throw error;
      });
    }
    return dataPromise;
  };
})();

const PolicyStatusSelect = ({
  value,
  onValueChanged,
  required = true,
  readOnly,
  setResultsData,
}) => {
  const [policyStatuses, setPolicyStatuses] = useState([]);
  const policyStatusSelectRef = useRef(null);

  useEffect(() => {
    fetchPolicyStatuses()
      .then((data) => {
        setPolicyStatuses(data);
        !!setResultsData && setResultsData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        ref={policyStatusSelectRef}
        dataSource={policyStatuses}
        style={{ ...(readOnly && { color: "red" }) }}
        label='Policy Status *'
        displayExpr='policyStatusName'
        valueExpr='policyStatusId'
        disabled={readOnly}
        value={value}
        placeholder='Select policy status'
        onValueChanged={onValueChanged}
      >
        {required && (
          <Validator>
            <RequiredRule message='Policy status is required' />
          </Validator>
        )}
      </SelectBox>
    </div>
  );
};

export default PolicyStatusSelect;
