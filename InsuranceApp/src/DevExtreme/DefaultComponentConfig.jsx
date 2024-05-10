export const DefaultComponentConfig = {
  Popup: {
    width: 500,
    height: 400,
    hideOnOutsideClick: false,
  },

  Button: {},

  TextBox: {
    showClearButton: true,
    valueChangeEvent: "focusout",
    inputAttr: { autocomplete: "new-password" },
  },

  TextArea: {
    valueChangeEvent: "focusout",
    height: 100,
  },
};
