import React, { useEffect, useState, useMemo, useCallback } from "react";
import { apiCall } from "../../API";
import { Button, TextBox, NumberBox, ValidationGroup } from "devextreme-react";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from "devextreme-react/responsive-box";

const AddVehicleForm = ({}) => {
  const [newVehicle, setNewVehicle] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState(null);

  console.log("newVehicle:", newVehicle);

  const handleChange = useCallback((field, value) => {
    setNewVehicle((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleVINLookup = useCallback(
    (e) => {
      const vin = encodeURIComponent(newVehicle?.vin);
      const year = encodeURIComponent(newVehicle?.year);
      apiCall(
        "GET",
        `CustomerPolicyLines/vin/${vin}/${year}`,
        e.validationGroup
      )
        .then((response) => {
          setVehicleInfo(response.Results[0]);
        })
        .catch((error) => {
          console.error("VIN lookup failed:", error);
        });
    },
    [newVehicle]
  );

  return (
    <ValidationGroup>
      <div className='flex flex-col items-center'>
        <ResponsiveBox>
          <Row ratio={1} />
          <Row ratio={1} />
          <Row ratio={1} />

          <Col ratio={1} />
          <Col ratio={1} />
          <Col ratio={1} />

          <Item>
            <Location row={0} col={0} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                value={newVehicle?.vin}
                label='VIN *'
                onValueChanged={({ value }) => handleChange("vin", value)}
              >
                <Validator>
                  <RequiredRule message='VIN is required' />
                </Validator>
              </TextBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={1} colspan={1} />
            <div className='p-2'>
              <NumberBox
                {...DefaultComponentConfig.NumberBox}
                value={newVehicle?.year}
                label='Year *'
                onValueChanged={({ value }) => handleChange("year", value)}
              >
                <Validator>
                  <RequiredRule message='Year is required' />
                </Validator>
              </NumberBox>
            </div>
          </Item>

          <Item>
            <Location row={0} col={2} colspan={1} />
            <div className='p-2 flex flex-col w-[50%] mt-5 h-full justify-center items-center'>
              <Button
                {...DefaultComponentConfig.Button}
                style={{
                  backgroundColor: "var(--cyan-500)",
                }}
                text='Lookup VIN'
                onClick={handleVINLookup}
              />
            </div>
          </Item>
        </ResponsiveBox>
      </div>
    </ValidationGroup>
  );
};

export default AddVehicleForm;
