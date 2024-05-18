import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Popup } from "devextreme-react/popup";

const EntityPopup = ({ selectedEntity, selectedAction, entity, onClose }) => {
  console.log(selectedEntity);

  return (
    <div>
      <Popup
        title={`${entity}: ${selectedAction.actionName}`}
        visible={true}
        onHiding={onClose}
      />
    </div>
  );
};

export default EntityPopup;
