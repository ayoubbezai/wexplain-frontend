export interface Pagination {
  current_page: number;
  perPage: number;
  totalPages?: number;
  totalItems?: number;
  all?: number;
}

export interface BackendResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  errors?: string[]; // for multiple validation errors
  data?: T; // generic type for payload
  pagination?: Pagination;
}
