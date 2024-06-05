import React, { useCallback } from "react";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import { apiCall } from "../../../API";

const CustomerDeleteForm = ({
  customers,
  resetPopup,
  setRefetch,
  setToastMessage,
}) => {
  const handleDelete = useCallback(() => {
    const customerIds = customers.map((customer) => customer.customerId);
    apiCall("DELETE", "Customers", null, "", customerIds)
      .then(() => {
        setToastMessage({
          message: `Customer${
            customers.length > 1 ? "s" : ""
          } deleted successfully`,
          type: "success",
        });
        resetPopup(null);
        setRefetch((prev) => !prev);
      })
      .catch((error) => {
        setToastMessage({
          message: `Delete Customer${
            customers.length > 1 ? "s" : ""
          } failed: ${error}`,
          type: "error",
        });
        console.error("Delete customer failed:", error);
      });
  }, [JSON.stringify(customers)]);

  return (
    <div>
      <ConfirmationDialog
        endpoint={"Customers"}
        apiCall={handleDelete}
        message={`Are you sure you want to delete ${
          customers.length > 1
            ? `these ${customers.length} customers`
            : "this customer"
        }?`}
        onClose={() => {
          resetPopup(null);
          setRefetch((prev) => !prev);
        }}
      />
    </div>
  );
};

export default CustomerDeleteForm;
