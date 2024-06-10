import React, { useEffect, useState, useMemo, useCallback } from "react";
import { apiCall } from "../../API";
import {
  Button,
  TextBox,
  NumberBox,
  ValidationGroup,
  Accordion,
} from "devextreme-react";
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
          setNewVehicle((prev) => ({
            ...prev,
            ...response.Results[0],
            BasePrice: Number(response.Results[0].BasePrice).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            ),
          }));
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
                  height: "33px",
                }}
                text='Lookup VIN'
                onClick={handleVINLookup}
              />
            </div>
          </Item>

          <Item>
            <Location row={1} col={1} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                value={newVehicle?.BasePrice}
                stylingMode='filled'
                readOnly={true}
                label='MSRP'
                onValueChanged={({ value }) => handleChange("BasePrice", value)}
              />
            </div>
          </Item>

          <Item>
            <Location row={2} col={0} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                value={newVehicle?.Make}
                stylingMode='filled'
                readOnly={true}
                label='Make'
                onValueChanged={({ value }) => handleChange("Make", value)}
              />
            </div>
          </Item>

          <Item>
            <Location row={2} col={1} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                value={newVehicle?.Model}
                stylingMode='filled'
                readOnly={true}
                label='Model'
                onValueChanged={({ value }) => handleChange("Model", value)}
              />
            </div>
          </Item>

          <Item>
            <Location row={2} col={2} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                value={newVehicle?.Series}
                stylingMode='filled'
                readOnly={true}
                label='Series'
                onValueChanged={({ value }) => handleChange("Series", value)}
              />
            </div>
          </Item>
        </ResponsiveBox>
      </div>
    </ValidationGroup>
  );
};
export default AddVehicleForm;
