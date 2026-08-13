import { makeRequest } from "../api/requestBulider";

export const API = {
  get: <T>(
    url: string,
    params?: Record<string, unknown>,
    config?: {
      headers?: Record<string, string>;
      responseType?: "json" | "blob" | "text";
    }
  ) =>
    makeRequest<T>({
      method: "GET",
      url,
      ...(params !== undefined ? { params } : {}),
      ...(config?.headers !== undefined ? { headers: config.headers } : {}),
      ...(config?.responseType !== undefined
        ? { responseType: config.responseType }
        : {}),
    }),

  post: <T>(
    url: string,
    data?: unknown,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ) =>
    makeRequest<T>({
      method: "POST",
      url,
      data,
      ...(params !== undefined ? { params } : {}),
      ...(headers !== undefined ? { headers } : {}),
    }),

  put: <T>(
    url: string,
    data?: unknown,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ) =>
    makeRequest<T>({
      method: "PUT",
      url,
      data,
      ...(params !== undefined ? { params } : {}),
      ...(headers !== undefined ? { headers } : {}),
    }),

  patch: <T>(
    url: string,
    data?: unknown,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ) =>
    makeRequest<T>({
      method: "PATCH",
      url,
      data,
      ...(params !== undefined ? { params } : {}),
      ...(headers !== undefined ? { headers } : {}),
    }),

  delete: <T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ) =>
    makeRequest<T>({
      method: "DELETE",
      url,
      ...(params !== undefined ? { params } : {}),
      ...(headers !== undefined ? { headers } : {}),
    }),
};