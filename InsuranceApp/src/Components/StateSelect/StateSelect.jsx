import React, { useEffect, useMemo } from "react";
import { SelectBox } from "devextreme-react/select-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const StateSelect = ({ onValueChanged, required = true, setResultsData }) => {
  const states = useMemo(
    () => [
      { abbr: "AL", text: "Alabama" },
      { abbr: "AK", text: "Alaska" },
      { abbr: "AZ", text: "Arizona" },
      { abbr: "AR", text: "Arkansas" },
      { abbr: "CA", text: "California" },
      { abbr: "CO", text: "Colorado" },
      { abbr: "CT", text: "Connecticut" },
      { abbr: "DE", text: "Delaware" },
      { abbr: "FL", text: "Florida" },
      { abbr: "GA", text: "Georgia" },
      { abbr: "HI", text: "Hawaii" },
      { abbr: "ID", text: "Idaho" },
      { abbr: "IL", text: "Illinois" },
      { abbr: "IN", text: "Indiana" },
      { abbr: "IA", text: "Iowa" },
      { abbr: "KS", text: "Kansas" },
      { abbr: "KY", text: "Kentucky" },
      { abbr: "LA", text: "Louisiana" },
      { abbr: "ME", text: "Maine" },
      { abbr: "MD", text: "Maryland" },
      { abbr: "MA", text: "Massachusetts" },
      { abbr: "MI", text: "Michigan" },
      { abbr: "MN", text: "Minnesota" },
      { abbr: "MS", text: "Mississippi" },
      { abbr: "MO", text: "Missouri" },
      { abbr: "MT", text: "Montana" },
      { abbr: "NE", text: "Nebraska" },
      { abbr: "NV", text: "Nevada" },
      { abbr: "NH", text: "New Hampshire" },
      { abbr: "NJ", text: "New Jersey" },
      { abbr: "NM", text: "New Mexico" },
      { abbr: "NY", text: "New York" },
      { abbr: "NC", text: "North Carolina" },
      { abbr: "ND", text: "North Dakota" },
      { abbr: "OH", text: "Ohio" },
      { abbr: "OK", text: "Oklahoma" },
      { abbr: "OR", text: "Oregon" },
      { abbr: "PA", text: "Pennsylvania" },
      { abbr: "RI", text: "Rhode Island" },
      { abbr: "SC", text: "South Carolina" },
      { abbr: "SD", text: "South Dakota" },
      { abbr: "TN", text: "Tennessee" },
      { abbr: "TX", text: "Texas" },
      { abbr: "UT", text: "Utah" },
      { abbr: "VT", text: "Vermont" },
      { abbr: "VA", text: "Virginia" },
      { abbr: "WA", text: "Washington" },
      { abbr: "WV", text: "West Virginia" },
      { abbr: "WI", text: "Wisconsin" },
      { abbr: "WY", text: "Wyoming" },
    ],
    []
  );

  useEffect(() => {
    !!setResultsData && setResultsData(states);
  }, [JSON.stringify(states)]);

  return (
    <div>
      <SelectBox
        {...DefaultComponentConfig.SelectBox}
        dataSource={states}
        label='State *'
        displayExpr='text'
        valueExpr='abbr'
        onValueChanged={onValueChanged}
      >
        {required && (
          <Validator>
            <RequiredRule message='State is required' />
          </Validator>
        )}
      </SelectBox>
    </div>
  );
};

export default StateSelect;
