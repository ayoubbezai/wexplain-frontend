import { BackendResponse } from "@/types/api";
export function handleApiError(error: any): BackendResponse<null> {
  if (error.response) {
    const status = error.response.status;
    const backendMessage =
      error.response.data.error || error.response.data.message;
    const data = error.response.data;

    switch (status) {
      case 401:
        return { success: false, message: backendMessage || "unauthorized" };
      case 403:
        return { success: false, message: backendMessage || "forbidden" };
      case 404:
        return { success: false, message: backendMessage || "not_found" };
      case 409:
        return { success: false, message: backendMessage || "onflict" };
      case 422:
        return {
          success: false,
          message: "validation_error",
          errors: data.errors!,
        };
      case 500:
        return { success: false, message: backendMessage || "server_error" };
      default:
        return {
          success: false,
          message: backendMessage || "unexpected_error",
        };
    }
  }

  if (error.request) {
    return {
      success: false,
      message: "network_error",
    };
  }

  return {
    success: false,
    message: "unexpected_error",
  };
}
