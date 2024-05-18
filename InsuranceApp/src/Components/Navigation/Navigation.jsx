import React from "react";
import { useNavigate } from "react-router-dom";
import { entities } from "../../Constants/Entities";
import { Button } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const Navigation = ({ layout, setEntity }) => {
  const navigate = useNavigate();

  return (
    <div className='w-full'>
      {entities
        .map((entity, index) => (
          <div key={index} className='flex flex-col'>
            <Button
              {...DefaultComponentConfig.Button}
              text={entity.buttonLabel}
              type='normal'
              onClick={() => {
                setEntity(entity.endpoint);
              }}
            />
          </div>
        ))
        .sort((a, b) => a.key - b.key)}
    </div>
  );
};

export default Navigation;
