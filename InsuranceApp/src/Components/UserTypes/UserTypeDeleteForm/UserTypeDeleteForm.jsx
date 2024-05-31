import React, { useCallback } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { apiCall } from "../../../API";
const UserTypeDeleteForm = ({
  userTypes,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const handleDelete = useCallback(() => {
    const userTypeIds = userTypes.map((userType) => userType.userTypeId);
    apiCall("DELETE", "UserTypes", null, "", userTypeIds)
      .then(() => {
        setToastMessage({
          message: `User Type${
            userTypes.length > 1 ? "s" : ""
          } deleted successfully`,
          type: "success",
        });
        resetPopup(null);
        setRefetch((prev) => !prev);
      })
      .catch((error) => {
        setToastMessage({
          message: `Delete User Type${
            userTypes.length > 1 ? "s" : ""
          } failed: ${error}`,
          type: "error",
        });
        console.error("Delete user type failed:", error);
      });
  }, [JSON.stringify(userTypes)]);

  return (
    <div>
      <ConfirmationDialog
        endpoint={"UserTypes"}
        apiCall={handleDelete}
        message={`Are you sure you want to delete ${
          userTypes.length > 1
            ? `these ${userTypes.length} policy types`
            : "this policy type"
        }?`}
        onClose={() => {
          resetPopup(null);
          setRefetch((prev) => !prev);
        }}
      />
    </div>
  );
};

export default UserTypeDeleteForm;
