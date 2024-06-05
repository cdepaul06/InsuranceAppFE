export const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 576) {
    return "xs";
  } else if (width < 768) {
    return "sm";
  } else if (width < 992) {
    return "md";
  } else if (width < 1200) {
    return "lg";
  } else {
    return "xl";
  }
};
