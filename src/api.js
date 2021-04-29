import axios from "axios";

// TODO: Get this from env variable
const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "608a5754d2183eca83418c82";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "app-id": APP_ID,
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

const createRequest = (method) => async (
  url,
  data,
  { token, ...config } = {}
) => {
  const response = await axiosInstance({
    method,
    url,
    data,
    ...config,
  });
  return {
    success: response.status >= 200 && response.status < 300,
    status: response.status,
    data: response.data,
  };
};

const api = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  delete: createRequest("DELETE"),
  request: (url, method = "GET") => createRequest(method)(url),
  instance: axiosInstance,
};

export default api;
