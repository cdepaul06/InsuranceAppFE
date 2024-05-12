import React, { useCallback, useMemo, useState } from "react";
import { Accordion, Button, Popup } from "devextreme-react";
import { DefaultComponentConfig } from "../../DevExtreme/DefaultComponentConfig";
import { AdminNavigation } from "../../Constants/NavigationLinks/NavigationLinks";
import GenericPopup from "../GenericPopup/GenericPopup";
import { useNavigate } from "react-router-dom";

const Navigation = ({ layout }) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({ action: "", entityName: "" });
  const navigate = useNavigate();

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

  const handleActionClick = useCallback((action) => {
    if (action.isPopup) {
      setOpen(true);
      setAction(action);
    } else {
      renderGridView(action.entityName);
    }
  }, []);

  const renderGridView = useCallback((entityName) => {
    navigate(`/admin/${entityName}`);
  }, []);

  const renderActionPopup = useCallback(() => {
    return (
      <GenericPopup
        action={action?.action}
        entityName={action?.entityName}
        open={open}
        setOpen={setOpen}
      />
    );
  }, [JSON.stringify(action), open]);

  const renderItem = useCallback((data) => {
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

      {open && renderActionPopup()}
    </>
  );
};

export default Navigation;
