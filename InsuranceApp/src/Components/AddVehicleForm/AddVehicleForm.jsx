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
import { v1 } from "uuid";

const AddVehicleForm = ({ setNewCustomerPolicy }) => {
  const [newVehicle, setNewVehicle] = useState({});

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
            policyLineId: v1(),
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
    [JSON.stringify(newVehicle)]
  );

  const handleAddVehicle = useCallback(() => {
    setNewCustomerPolicy((prev) => ({
      ...prev,
      policyLines: [...prev.policyLines, newVehicle],
    }));
  }, [JSON.stringify(newVehicle)]);

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
              />
            </div>
          </Item>

          <Item>
            <Location row={2} col={2} colspan={1} />
            <div className='p-2'>
              <TextBox
                {...DefaultComponentConfig.TextBox}
                value={newVehicle?.Trim}
                stylingMode='filled'
                readOnly={true}
                label='Trim'
              />
            </div>
          </Item>

          <Item>
            <Location row={3} col={1} colspan={1} />
            <div className='p-2 flex justify-center'>
              <Button
                {...DefaultComponentConfig.Button}
                text='Add Vehicle'
                style={{
                  backgroundColor: "var(--cyan-500)",
                  height: "33px",
                }}
                disabled={!newVehicle?.Make}
                onClick={handleAddVehicle}
              />
            </div>
          </Item>
        </ResponsiveBox>
      </div>
    </ValidationGroup>
  );
};
export default AddVehicleForm;
