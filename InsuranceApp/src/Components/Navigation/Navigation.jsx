import React, { useCallback, useMemo, useState } from "react";
import { Accordion, Button } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";
import { AdminNavigation } from "../../Constants/NavigationLinks/NavigationLinks";

const Navigation = ({ layout }) => {
  const [open, setOpen] = useState(true);

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

  const handleActionClick = (action) => {
    console.log(action);

    action.isPopup && setOpen(true);

    action.isPopup ? renderPopup(action.entityName, action.action, open) : "";
  };

  const renderPopup = (entityName, action, open) => {};

  const renderItem = (data) => {
    return (
      <div>
        <div className='flex flex-col space-y-2 mt-2'>
          {data.actions.map((action, index) => (
            <Button
              key={index}
              text={action.action}
              icon={action.icon}
              onClick={() => {
                action.entityName = data.title;
                handleActionClick(action);
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const titleRender = useCallback((data) => {
    return (
      <div className='flex items-center space-x-2 text-sm'>
        <span className={`icon-${data.icon}`} />
        <span className='font-bold'>{data.title.toUpperCase()}</span>
      </div>
    );
  }, []);

  // this can open the correct popup based off entity name, action

  const renderActionPopup = (component) => {
    // entity name
    // action name

    return (
      <Popup
        visible={open}
        onHiding={() => setOpen(false)}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title={component}
        width={400}
        height={400}
      />
    );
  };

  return (
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
  );
};

export default Navigation;
