import React, { useEffect, useState, useRef } from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule } from "devextreme-react/validator";

const fetchUserStatuses = (() => {
  let dataPromise = null;

  return async () => {
    if (!dataPromise) {
      dataPromise = apiCall("GET", "UserStatuses").catch((error) => {
        console.error("Get user statuses failed:", error);
        throw error;
      });
    }
    return dataPromise;
  };
})();

const UserStatusSelect = ({
  value,
  onValueChanged,
  required = true,
  setResultsData,
}) => {
  const [userStatuses, setUserStatuses] = useState([]);
  const userStatusSelectRef = useRef(null);

  useEffect(() => {
    fetchUserStatuses()
      .then((data) => {
        setUserStatuses(data);
        !!setResultsData && setResultsData(data);
      })
      .catch((error) => {
        console.error(error); // Error already logged in fetchUserStatuses
      });
  }, []);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        ref={userStatusSelectRef}
        dataSource={userStatuses}
        label='User Status *'
        displayExpr='userStatusName'
        valueExpr='userStatusId'
        value={value}
        onValueChanged={onValueChanged}
        placeholder='Select user status'
      >
        {required && (
          <Validator>
            <RequiredRule message='User status is required' />
          </Validator>
        )}
      </SelectBox>
    </div>
  );
};

export default UserStatusSelect;
