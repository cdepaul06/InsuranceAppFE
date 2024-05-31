import React, { useCallback } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { apiCall } from "../../../API";

const PolicyTypeDeleteForm = ({
  policyTypes,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const handleDelete = useCallback(() => {
    const policyTypeIds = policyTypes.map(
      (policyType) => policyType.policyTypeId
    );
    apiCall("DELETE", "PolicyTypes", null, "", policyTypeIds)
      .then(() => {
        setToastMessage({
          message: `Policy Type${
            policyTypes.length > 1 ? "s" : ""
          } deleted successfully`,
          type: "success",
        });
        resetPopup(null);
        setRefetch((prev) => !prev);
      })
      .catch((error) => {
        setToastMessage({
          message: `Delete Policy Type${
            policyTypes.length > 1 ? "s" : ""
          } failed: ${error}`,
          type: "error",
        });
        console.error("Delete policy type failed:", error);
      });
  }, [JSON.stringify(policyTypes)]);

  return (
    <div>
      <ConfirmationDialog
        endpoint={"PolicyTypes"}
        apiCall={handleDelete}
        message={`Are you sure you want to delete ${
          policyTypes.length > 1
            ? `these ${policyTypes.length} policy types`
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

export default PolicyTypeDeleteForm;
