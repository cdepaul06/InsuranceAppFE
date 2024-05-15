import axios from "axios";

export const apiCall = async (
  method,
  endpoint,
  validationGroup = null, // default to null if not provided
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
