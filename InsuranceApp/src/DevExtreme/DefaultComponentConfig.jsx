export const DefaultComponentConfig = {
  Popup: {
    width: 500,
    height: 400,
    hideOnOutsideClick: false,
    showCloseButton: true,
  },

  Confirmation_Popup: {
    width: 400,
    height: 300,
    hideOnOutsideClick: false,
    showCloseButton: true,
  },

  Button: {
    type: "default",
    stylingMode: "contained",
  },

  TextBox: {
    showClearButton: true,
    valueChangeEvent: "focusout",
    inputAttr: { autocomplete: "new-password" },
    labelMode: "outside",
    showClearButton: true,
    validationMessageMode: "always",
    validationMessagePosition: "bottom",
  },

  TextArea: {
    valueChangeEvent: "focusout",
    height: 100,
    inputAttr: { autocomplete: "new-password" },
  },

  Accordion: {},

  Toast: {
    animation: {
      show: { type: "fade", from: 0, to: 1, duration: 1500 },
      hide: { type: "fade", from: 1, to: 0, duration: 1500 },
    },
  },

  SelectBox: {
    searchEnabled: true,
    showClearButton: true,
    labelMode: "outside",
  },
};
