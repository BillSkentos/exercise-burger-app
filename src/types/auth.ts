export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: string;
}

export interface Session {
  token: string;
  /** Unix time in ms when the token stops being valid */
  expiresAt: number;
}
