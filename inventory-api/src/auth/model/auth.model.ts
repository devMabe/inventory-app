export interface TokenData {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  docNumber?: string;
  doctType?: string;
  refreshToken?: string;
}

export interface Token {
  token: string;
  data: TokenData;
}
