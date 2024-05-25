import React from "react";
import { Popup } from "devextreme-react/popup";

const UserEditForm = ({ user, onClose }) => {
  return (
    <div>
      <Popup
        title={`Edit User: ${user.firstName} ${user.lastName}`}
        visible={open}
        onHiding={onClose}
        width={300}
        height={300}
      />
    </div>
  );
};

export default UserEditForm;
