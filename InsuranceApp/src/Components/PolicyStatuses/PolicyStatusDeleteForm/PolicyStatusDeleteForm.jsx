import React, { useCallback } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { apiCall } from "../../../API";

const PolicyStatusDeleteForm = ({
  policyStatuses,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const handleDelete = useCallback(() => {
    const policyStatusIds = policyStatuses.map(
      (policyStatus) => policyStatus.policyStatusId
    );
    apiCall("DELETE", "PolicyStatuses", null, "", policyStatusIds)
      .then(() => {
        setToastMessage({
          message: `Policy Status${
            policyStatuses.length > 1 ? "es" : ""
          } deleted successfully`,
          type: "success",
        });
        resetPopup(null);
        setRefetch((prev) => !prev);
      })
      .catch((error) => {
        setToastMessage({
          message: `Delete Policy Status${
            policyStatuses.length > 1 ? "es" : ""
          } failed: ${error}`,
          type: "error",
        });
        console.error("Delete policy status failed:", error);
      });
  }, [JSON.stringify(policyStatuses)]);

  return (
    <div>
      <ConfirmationDialog
        endpoint={"Users"}
        apiCall={handleDelete}
        message={`Are you sure you want to delete ${
          policyStatuses.length > 1
            ? `these ${policyStatuses.length} policy statuses`
            : "this policy status"
        }?`}
        onClose={() => {
          resetPopup(null);
          setRefetch((prev) => !prev);
        }}
      />
    </div>
  );
};

export default PolicyStatusDeleteForm;
