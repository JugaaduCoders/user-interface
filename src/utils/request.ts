import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Ref, ref } from "vue";
import { getItem } from "./storage/localStorage";

interface UseFetchReturn<T> {
  data: Ref<T | undefined>;
  error: Ref<string | undefined>;
  pending: Ref<boolean>;
  fetchData: () => Promise<void>;
}

export function useFetch<T = any>(
  url: string,
  config: AxiosRequestConfig = {}
): UseFetchReturn<T> {
  const data: Ref<T | undefined> = ref(undefined);
  const error: Ref<string | undefined> = ref(undefined);
  const pending: Ref<boolean> = ref(false);

  const fetchData = async () => {
    pending.value = true;
    error.value = undefined;

    try {
      const response: AxiosResponse<T> = await axios({ url, ...config });
      data.value = response.data;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || err.message || "An error occurred";
    } finally {
      pending.value = false;
    }
  };

  return { data, error, pending, fetchData };
}

async function request<T>(
  type: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  apiRoute: string,
  data: Record<string, any> = {}
) {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}${apiRoute}`;
  const token = getItem("token");

  // Configuring headers
  const headers: Record<string, string> = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const options: AxiosRequestConfig = {
    method: type.toUpperCase(),
    url,
    headers,
  };

  if (["POST", "PUT", "PATCH"].includes(type)) {
    options.data = data;
  } else {
    options.params = data;
  }

  try {
    const response: AxiosResponse<T> = await axios(options);

    if (response.data) {
      console.log(response);
      return response.data;
    }
  } catch (err: Error | unknown | AxiosError) {
    console.error("Request failed:", err);
  }
}

export { request };
