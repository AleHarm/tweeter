export interface authTokenDAO{

  getToken(): string;

  putToken(token: string): void;

  deleteToken(token: string): void;
};