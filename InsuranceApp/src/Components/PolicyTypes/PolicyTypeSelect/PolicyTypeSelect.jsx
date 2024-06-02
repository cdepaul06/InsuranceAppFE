import React, { useEffect, useState, useRef } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule } from "devextreme-react/validator";

const fetchPolicyTypes = (() => {
  let dataPromise = null;

  return async () => {
    if (!dataPromise) {
      dataPromise = apiCall("GET", "PolicyTypes").catch((error) => {
        console.error("Get policy types failed:", error);
        throw error;
      });
    }
    return dataPromise;
  };
})();

const PolicyTypeSelect = ({
  value,
  onValueChanged,
  required = true,
  setResultsData,
}) => {
  const [policyTypes, setPolicyTypes] = useState([]);
  const policyTypeSelectRef = useRef(null);

  useEffect(() => {
    fetchPolicyTypes()
      .then((data) => {
        setPolicyTypes(data);
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
        ref={policyTypeSelectRef}
        dataSource={policyTypes}
        label='Policy Type *'
        displayExpr='policyTypeName'
        valueExpr='policyTypeId'
        value={value}
        placeholder='Select policy type'
        onValueChanged={onValueChanged}
      >
        {required && (
          <Validator>
            <RequiredRule message='Policy type is required' />
          </Validator>
        )}
      </SelectBox>
    </div>
  );
};

export default PolicyTypeSelect;
