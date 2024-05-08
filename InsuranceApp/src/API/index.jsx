import axios from "axios";

/**
 * General API call function to handle various types of requests.
 *
 * @param {string} method - The HTTP method to use (GET, POST, PUT, DELETE, etc.)
 * @param {string} endpoint - The API endpoint URL.
 * @param {Object} body - Optional data to be sent with the request (for POST, PUT).
 * @param {Object} headers - Optional headers to be included in the request.
 * @returns {Promise} - A Promise that resolves to the response of the API call.
 */
export const handleApiCall = async (
  method,
  endpoint,
  body = {},
  headers = {}
) => {
  const config = {
    method: method,
    url: `https://localhost:5000/api/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: body,
  };

  try {
    const response = await axios(config);
    return response.data; // Returning just the data from the response object
  } catch (error) {
    console.error("API call failed:", error);
    throw error; // Rethrowing the error to be handled by the caller
  }
};
