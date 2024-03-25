import { LogoutRequest } from "tweeter-shared/dist/model/net/Request";
import { UserService } from "../model/service/UserService";

export const handler = (event: LogoutRequest): Promise<void> => {

  return new UserService().logout(event.authToken);
};