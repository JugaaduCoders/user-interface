import { defineStore } from "pinia";

interface MessageState {
  error: string | null;
  isSuccess: string | null;
  errorTime: number;
  successTime: number;
}

interface Payload {
  error?: string;
  message?: string;
  time?: number;
}

export const useMessageStore = defineStore("message", {
  state: (): MessageState => ({
    error: null,
    isSuccess: null,
    errorTime: 5000,
    successTime: 5000,
  }),

  getters: {
    getError(state): string | null {
      return state.error;
    },
    getIsSuccess(state): string | null {
      return state.isSuccess;
    },
  },

  actions: {
    setErrorClear(payload: Payload) {
      this.error = payload?.error || null;

      const time = payload?.time !== undefined ? payload.time : this.errorTime;

      setTimeout(() => {
        this.error = null;
      }, time);
    },

    setIsSuccessClear(payload: Payload) {
      try {
        this.error = null;
        this.isSuccess = payload?.message || null;

        const time =
          payload?.time !== undefined ? payload.time : this.successTime;

        setTimeout(() => {
          this.isSuccess = null;
        }, time);
      } catch (error) {
        this.setErrorClear({ error: (error as Error).message });
      }
    },

    setIsSuccess(payload: Payload) {
      try {
        this.error = null;
        this.setIsSuccessClear(payload);
      } catch (error) {
        this.setErrorClear({ error: (error as Error).message });
      }
    },

    setError(payload: Payload) {
      try {
        this.isSuccess = null;
        this.setErrorClear(payload);
      } catch (error) {
        this.setErrorClear({ error: (error as Error).message });
      }
    },
  },
});
