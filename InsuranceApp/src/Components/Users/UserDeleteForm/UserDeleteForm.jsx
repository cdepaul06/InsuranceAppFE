import React, { useCallback } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { apiCall } from "../../../API";

const UserDeleteForm = ({ users, resetPopup, setRefetch, setToastMessage }) => {
  const handleDelete = useCallback(() => {
    const userIds = users.map((user) => user.userId);
    apiCall("DELETE", "Users", null, "", userIds)
      .then(() => {
        setToastMessage({
          message: `User${users.length > 1 ? "s" : ""} deleted successfully`,
          type: "success",
        });
        resetPopup(null);
        setRefetch((prev) => !prev);
      })
      .catch((error) => {
        setToastMessage({
          message: `Delete User${users.length > 1 ? "s" : ""} failed: ${error}`,
          type: "error",
        });
        console.error("Delete user failed:", error);
      });
  }, [JSON.stringify(users)]);

  return (
    <div>
      <ConfirmationDialog
        endpoint={"Users"}
        apiCall={handleDelete}
        message={`Are you sure you want to delete ${
          users.length > 1 ? `these ${users.length} users` : "this user"
        }?`}
        onClose={resetPopup}
      />
    </div>
  );
};

export default UserDeleteForm;
