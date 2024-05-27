import axios from "axios";

/**
 *
 * @param {*} method method to be used for the API call
 * @param {*} endpoint endpoint to be called
 * @param {*} validationGroup validation group to be used for validation group of components
 * @param {*} queryParams optional query parameters
 * @param {*} body body of the API call
 * @param {*} headers any headers to be passed
 * @param  {...any} rest holds any other parameters
 * @returns
 */
export const apiCall = async (
  method,
  endpoint,
  validationGroup = null,
  queryParams = "",
  body = {},
  headers = {},
  ...rest
) => {
  const queryString = queryParams ? `?${new URLSearchParams(queryParams)}` : "";
  const config = {
    method: method,
    url: `https://localhost:5000/api/${endpoint}${queryString}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: body,
    ...rest,
  };

  try {
    let validation = validationGroup
      ? validationGroup.validate()
      : { isValid: true };
    if (validation.isValid) {
      const response = await axios(config);
      return response.data;
    } else {
      throw new Error("Validation failed");
    }
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
