import { useMessageStore } from "@/store/useMessageStore";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Ref, ref } from "vue";

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

async function request<T = any>(
  type: "get" | "post" | "put" | "patch" | "delete",
  pureUrl: string,
  params: Record<string, any> = {},
  time: number | undefined = undefined
): Promise<T | undefined> {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}${pureUrl}`;
  const token = localStorage.getItem("token");

  // Configuring headers
  const headers: Record<string, string> = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  // Configuring Axios request options
  const options: AxiosRequestConfig = {
    method: type.toUpperCase(),
    url,
    headers,
  };

  // Attach request body for POST, PUT, PATCH
  if (["post", "put", "patch"].includes(type)) {
    options.data = params;
  } else {
    options.params = params;
  }

  try {
    const response: AxiosResponse<T> = await axios(options);

    // Handle successful responses
    if (response.data) {
      const message = (response.data as any)?.message || "";

      if (!(response.data as any)?.isSuccess) {
        useMessageStore().setError({ error: message, time });
      } else {
        useMessageStore().setIsSuccess({ message, time });
        return (response.data as any)?.data;
      }
    }
  } catch (err: any) {
    console.error("Request failed:", err);
    useMessageStore().setError({
      error: err.response?.data?.message || "An unexpected error occurred.",
      time,
    });
  }
}

export { request };
