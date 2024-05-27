import React, { useEffect, useState, useRef } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule } from "devextreme-react/validator";

const fetchUserTypes = (() => {
  let dataPromise = null;

  return async () => {
    if (!dataPromise) {
      dataPromise = apiCall("GET", "UserTypes").catch((error) => {
        console.error("Get user types failed:", error);
        throw error;
      });
    }
    return dataPromise;
  };
})();

const UserTypeSelect = ({ value, onValueChanged, required = true }) => {
  const [userTypes, setUserTypes] = useState([]);
  const userTypeSelectRef = useRef(null);

  useEffect(() => {
    fetchUserTypes()
      .then((data) => {
        setUserTypes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        ref={userTypeSelectRef}
        dataSource={userTypes}
        label='User Type *'
        displayExpr='userTypeName'
        valueExpr='userTypeId'
        value={value}
        placeholder='Select user type'
        onValueChanged={onValueChanged}
      >
        {required && (
          <Validator>
            <RequiredRule message='User type is required' />
          </Validator>
        )}
      </SelectBox>
    </div>
  );
};

export default UserTypeSelect;
