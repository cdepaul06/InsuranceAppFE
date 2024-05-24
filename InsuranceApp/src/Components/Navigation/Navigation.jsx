import React, { useMemo } from "react";
import { entities } from "../../Constants/Entities";
import { Button } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";

const Navigation = ({ layout, setGridList }) => {
  const memoEntities = useMemo(() => {
    return entities
      .map((entity, index) => (
        <div key={index} className='flex flex-col'>
          <Button
            {...DefaultComponentConfig.Button}
            text={entity.buttonLabel}
            type='normal'
            onClick={() => setGridList(() => entity.component)}
          />
        </div>
      ))
      .sort((a, b) => a.key - b.key);
  }, [layout]);

  return <div className='w-full'>{memoEntities}</div>;
};

export default React.memo(Navigation);
