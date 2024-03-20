import { LogoutRequest } from "tweeter-shared/dist/model/net/Requests/LogoutRequest";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LogoutRequest) => {

  await new UserService().logout(event.authToken);
};