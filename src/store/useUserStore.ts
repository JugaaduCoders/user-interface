import { request } from "@/utils/request";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMessageStore } from "./useMessageStore";

// Define types for state
interface User {
  _id?: string;
  [key: string]: any; // For additional dynamic properties
}

interface UserState {
  user: User;
  token: string;
}

// Define types for payloads
interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  [key: string]: any; // For additional fields
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
        const token = localStorage.getItem("token");

        if (token) {
          await request("get", "/api/user").then((res) => {
            if (res) {
              this.user = { ...res };
              this.token = token;
              localStorage.setItem("user", JSON.stringify(this.user));
            } else {
              this.logout();
            }
          });
        }
      }
    },

    async login(payload: LoginPayload): Promise<boolean> {
      let response = false;

      await request("post", "/api/auth/signin", payload).then((res) => {
        if (res) {
          this.user = { ...res };
          localStorage.setItem("user", JSON.stringify(this.user));

          if (res?.accessToken) {
            localStorage.setItem("token", res.accessToken);
            this.token = res.accessToken;
            response = true;
          }
        }
      });

      return response;
    },

    async logout() {
      this.token = "";
      this.user = {} as User;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    async signup(payload: SignupPayload): Promise<boolean> {
      let response = false;

      await request("post", "/api/auth/signup", payload).then((res) => {
        if (res) {
          response = true;
        }
      });

      return response;
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

      await request("put", "/api/user/update", payload).then((res) => {
        if (res) {
          response = true;
          this.token = res;
          localStorage.setItem("token", res);
        }
      });

      return response;
    },
  },
});
