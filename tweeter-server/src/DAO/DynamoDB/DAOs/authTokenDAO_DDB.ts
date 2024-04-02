import { authTokenDAO } from "../../Interfaces/authTokenDAO";

export class authTokenDAO_DDB implements authTokenDAO{
  getToken(): string {
    throw new Error("Method not implemented.");
  }
  putToken(token: string): void {
    throw new Error("Method not implemented.");
  }
  deleteToken(token: string): void {
    throw new Error("Method not implemented.");
  }
}