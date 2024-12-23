import { SignUpFormData } from "@/types/signup";
import { request } from "@/utils/request";
import { getItem, removeItem, setItem } from "@/utils/storage/localStorage";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMessageStore } from "./useMessageStore";

// Define types for state
interface User {
  _id?: string;
  [key: string]: any;
}

interface UserState {
  user: User;
  token: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UpdatePasswordPayload {
  password: string;
  repassword: string;
}

// Define the store
export const useUserStore = defineStore("user", {
  state: (): UserState =>
    reactive({
      user: {} as User,
      token: "",
    }),

  getters: {
    getUser: (state): User => state.user,
    getUserId: (state): string => state.user?._id || "",
    getToken: (state): string => state.token || "",
  },

  actions: {
    async init() {
      if (typeof window !== "undefined") {
        this.checkLocalToken();
      }
    },

    async checkLocalToken() {
      if (typeof window !== "undefined") {
        const token = getItem("token");

        if (token) {
          await request("GET", "/api/user").then((res) => {
            if (res) {
              // this.user = { ...res };
              this.token = token;
              setItem("user", JSON.stringify(this.user));
            } else {
              this.logout();
            }
          });
        }
      }
    },

    async login(payload: LoginPayload) {
      const resp = await request<{ authToken: string; user: User }>(
        "POST",
        "/api/auth/login",
        payload
      );
      return resp;
    },

    async logout() {
      this.token = "";
      this.user = {} as User;

      removeItem("token");
      removeItem("user");
    },

    async signup(payload: SignUpFormData) {
      const res = await request("POST", "/api/auth/signup", payload);
    },

    async updatePassword(
      payload: UpdatePasswordPayload
    ): Promise<boolean | void> {
      let response = false;
      let error = "";

      if (payload?.password !== payload?.repassword) {
        error = "Password and Re-password must be the same!";
      } else if (payload?.password.length < 5) {
        error = "Password must be at least 5 characters!";
      }

      if (error) {
        useMessageStore().setError({ error });
        return;
      }

      await request("PUT", "/api/user/update", payload).then((res) => {
        if (res) {
          response = true;
          this.token = "res";
          setItem("token", res);
        }
      });

      return response;
    },
  },
});
