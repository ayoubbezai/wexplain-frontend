import api from "@/utils/api";
import { BackendResponse } from "@/types/api";

import { handleApiError } from "@/utils/handleError";
import { User , AuthResponse} from "../types"

const AuthService = {
  login: async (
    email: string,
    password: string
  ): Promise<BackendResponse<User | null>> => {
    try {
      const res = await api.post<AuthResponse>("/v1/login", {
        email,
        password,
      });

      return {
        success: true,
        data: res.data.user,
        message: res.data.message ?? "auth.login_success",
      };
    } catch (err: any) {
      return handleApiError(err);
    }
  },

  me: async (): Promise<BackendResponse<User | null>> => {
    try {
      const res = await api.get<AuthResponse>("/v1/me");

      return {
        success: true,
        data: res.data.user,
        message: res.data.message ?? "auth.fetch_success",
      };
    } catch (err: any) {
      return handleApiError(err);
    }
  },

  logout: async (): Promise<BackendResponse<null>> => {
    try {
      await api.post("/v1/logout");

      return {
        success: true,
        message: "auth.logout_success",
      };
    } catch (err: any) {
      return handleApiError(err);
    }
  },

};

export default AuthService;
