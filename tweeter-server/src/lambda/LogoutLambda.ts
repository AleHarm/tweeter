import { LogoutRequest } from "tweeter-shared/dist/model/net/Requests/LogoutRequest";
import { UserService } from "../model/service/UserService";

export const handler = (event: LogoutRequest): Promise<void> => {

  return new UserService().logout(event.authToken);
};