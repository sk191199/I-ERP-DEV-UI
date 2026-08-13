import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  responseType?: AxiosRequestConfig["responseType"];
}

const buildRequest = (
  request: RequestConfig
): AxiosRequestConfig => {

  const {
    method,
    url,
    data,
    headers,
    params,
    responseType,
  } = request;

  const token = localStorage.getItem("accessToken");

  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  // Add token automatically
  if (token) {
   requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Don't manually set Content-Type for FormData
  if (!(data instanceof FormData)) {
    requestHeaders["Content-Type"] =
      requestHeaders["Content-Type"] ||
      "application/json";
  }

  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,

    method,

    url,

    data,

    params,

    headers: requestHeaders,
  };

  if (responseType) {
    config.responseType = responseType;
  }

  return config;
};

export const makeRequest = async <T>(
  request: RequestConfig
): Promise<AxiosResponse<T>> => {

  const requestConfig = buildRequest(request);

  try {

    const response =
      await axios.request<T>(requestConfig);

    return response;

  } catch (error) {

    if (axios.isAxiosError(error)) {

      throw {
        status: error.response?.status || 500,

        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",

        data: error.response?.data,
      };
    }

    throw {
      status: 500,
      message: "Unexpected error occurred",
      data: null,
    };
  }
};