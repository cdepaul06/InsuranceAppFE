import React, { useMemo } from "react";
import { entities } from "../../Constants/Entities";
import { Button } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const Navigation = ({ layout, setGridRender }) => {
  const memoEntities = useMemo(() => {
    return entities
      .map((entity, index) => (
        <div key={index} className='flex flex-col w-full'>
          <Button
            {...DefaultComponentConfig.Button}
            style={{ borderRadius: 0, border: "1px solid" }}
            text={entity.buttonLabel}
            onClick={() => setGridRender(() => entity.component)}
          />
        </div>
      ))
      .sort((a, b) => a.key - b.key);
  }, []);

  return <div className='w-full'>{memoEntities}</div>;
};

export default Navigation;
