import React, { useCallback } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { apiCall } from "../../../API";

const UserStatusDeleteForm = ({
  userStatuses,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const handleDelete = useCallback(() => {
    const userStatusIds = userStatuses.map(
      (userStatus) => userStatus.userStatusId
    );

    apiCall("DELETE", "UserStatuses", null, "", userStatusIds)
      .then(() => {
        setToastMessage({
          message: `User Status${
            userStatuses.length > 1 ? "s" : ""
          } deleted successfully`,
          type: "success",
        });
        resetPopup(null);
        setRefetch((prev) => !prev);
      })
      .catch((error) => {
        setToastMessage({
          message: `Delete User Status${
            userStatuses.length > 1 ? "s" : ""
          } failed: ${error}`,
          type: "error",
        });
        console.error("Delete user status failed:", error);
      });
  }, [JSON.stringify(userStatuses)]);

  return (
    <div>
      <ConfirmationDialog
        endpoint={"UserStatuses"}
        apiCall={handleDelete}
        message={`Are you sure you want to delete ${
          userStatuses.length > 1
            ? `these ${userStatuses.length} user statuses`
            : "this user status"
        }?`}
        onClose={() => {
          resetPopup(null);
          setRefetch((prev) => !prev);
        }}
      />
    </div>
  );
};

export default UserStatusDeleteForm;
