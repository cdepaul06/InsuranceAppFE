import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { SelectBox } from "devextreme-react/select-box";
import { apiCall } from "../../../API";
import { DefaultComponentConfig } from "../../../DevExtreme/DefaultComponentConfig";
import Validator, { RequiredRule } from "devextreme-react/validator";
import CustomerCreateForm from "../CustomerCreateForm/CustomerCreateForm";

const fetchCustomers = (() => {
  let dataPromise = null;

  return async () => {
    if (!dataPromise) {
      dataPromise = apiCall("GET", "Customers")
        .then((data) => {
          // Reset the promise after data is fetched
          dataPromise = null;
          return data;
        })
        .catch((error) => {
          console.error("Get customers failed:", error);
          // Reset the promise even if there's an error
          dataPromise = null;
          throw error;
        });
    }
    return dataPromise;
  };
})();

const CustomerSelect = ({
  value,
  onValueChanged,
  required = true,
  setResultsData,
  setToastMessage,
}) => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const customerSelectRef = useRef(null);

  useEffect(() => {
    fetchCustomers()
      .then((data) => {
        setCustomers(data);
        !!setResultsData && setResultsData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem = useCallback(
    (data) => {
      if (!data) return null;

      return (
        <div className='border-l-4 border-cyan-500 rounded-lg p-1'>
          <p>
            {data?.lastName}, {data?.firstName} | {data?.email}
          </p>
          <p>{data?.phone}</p>
          <p>
            {data?.address} {data?.address2} {data?.city}, {data?.state}{" "}
            {data?.zipCode}
          </p>
        </div>
      );
    },
    [value]
  );

  const displayExpr = useCallback((data) => {
    if (!data) return null;
    return `${data?.lastName}, ${data?.firstName}`;
  }, []);

  const addButton = useMemo(
    () => ({
      name: "add",
      location: "after",
      options: {
        icon: "add",
        stylingMode: "text",
        onClick: () => {
          setOpen(true);
        },
      },
    }),
    []
  );

  const refreshButton = useMemo(
    () => ({
      name: "refresh",
      location: "after",
      options: {
        icon: "refresh",
        stylingMode: "text",
        onClick: () => {
          fetchCustomers()
            .then((data) => {
              setCustomers(data);
              !!setResultsData && setResultsData(data);
              setToastMessage({
                message: "Customer Select refreshed",
                type: "success",
              });
            })
            .catch((error) => {
              console.error(error);
              setToastMessage({
                message: `Customer Select refresh failed: ${error}`,
                type: "error",
              });
            });
        },
      },
    }),
    []
  );

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        ref={customerSelectRef}
        dataSource={customers}
        label='Customer *'
        displayExpr={displayExpr}
        valueExpr='customerId'
        value={value}
        itemRender={renderItem}
        placeholder='Select customer'
        onValueChanged={onValueChanged}
        dropDownOptions={{ minHeight: "10rem" }}
        buttons={[refreshButton, addButton, "dropDown"]}
      >
        {required && (
          <Validator>
            <RequiredRule message='Customer is required' />
          </Validator>
        )}
      </SelectBox>

      {open && (
        <CustomerCreateForm
          setToastMessage={setToastMessage}
          setOpen={setOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default CustomerSelect;
