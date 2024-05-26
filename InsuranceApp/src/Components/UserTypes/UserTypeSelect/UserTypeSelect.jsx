import React, { useEffect, useState } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";

const UserTypeSelect = ({ onValueChanged }) => {
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    apiCall("GET", "UserTypes")
      .then((data) => {
        setUserTypes(data);
      })
      .catch((error) => {
        console.error("Get user types failed:", error);
      });
  }, []);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        dataSource={userTypes}
        label='User Type *'
        displayExpr='userTypeName'
        valueExpr='userTypeId'
        placeholder='Select user type'
        onValueChanged={onValueChanged}
      />
    </div>
  );
};

export default UserTypeSelect;
