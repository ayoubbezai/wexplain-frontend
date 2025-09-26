export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role : string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
}
