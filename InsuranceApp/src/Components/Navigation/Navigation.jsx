import React, { useCallback, useMemo } from "react";
import { Accordion, Button } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";
import { AdminNavigation } from "../../Constants/NavigationLinks/NavigationLinks";

const Navigation = ({ layout }) => {
  const navLinks = useMemo(() => {
    switch (layout) {
      case "admin":
        return AdminNavigation;
      case "user":
      // return UserNavigation;
      default:
        return [];
    }
  }, [layout]);

  const renderItem = useCallback((data) => {
    return (
      <div>
        <div className='flex flex-col space-y-2 mt-2'>
          {data.actions.map((action, index) => (
            <Button
              key={index}
              text={action.action}
              icon={action.icon}
              onClick={() => console.log(action.action)}
            />
          ))}
        </div>
      </div>
    );
  }, []);

  const titleRender = useCallback((data) => {
    return (
      <div className='flex items-center space-x-2 text-sm'>
        <span className={`icon-${data.icon}`} />
        <span className='font-bold'>{data.title.toUpperCase()}</span>
      </div>
    );
  }, []);

  return (
    <>
      <div className='flex flex-col w-full'>
        <Accordion
          {...DefaultComponentConfig.Accordion}
          dataSource={navLinks.sort((a, b) => a.title.localeCompare(b.title))}
          collapsible={true}
          multiple={true}
          itemTitleRender={titleRender}
          itemRender={renderItem}
        />
      </div>
    </>
  );
};

export default Navigation;
