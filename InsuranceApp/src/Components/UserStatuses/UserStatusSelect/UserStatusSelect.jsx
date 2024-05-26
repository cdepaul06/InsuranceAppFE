import React, { useEffect, useState } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";

const UserStatusSelect = ({ onValueChanged }) => {
  const [userStatuses, setUserStatuses] = useState([]);

  useEffect(() => {
    apiCall("GET", "UserStatuses")
      .then((data) => {
        setUserStatuses(data);
      })
      .catch((error) => {
        console.error("Get user types failed:", error);
      });
  }, []);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        dataSource={userStatuses}
        label='User Status *'
        displayExpr='userStatusName'
        valueExpr='userStatusId'
        onValueChanged={onValueChanged}
        placeholder='Select user status'
      />
    </div>
  );
};

export default UserStatusSelect;
