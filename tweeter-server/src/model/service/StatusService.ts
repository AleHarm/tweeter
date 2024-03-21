import { User, AuthToken, FakeData, Status } from "tweeter-shared";

export class StatusService{

  public async postStatus(authToken: AuthToken, newStatus: Status): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.

    if(authToken === null){

      throw new Error("[BadRequest] Invalid authtoken");
    }

    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server to post the status
  };

}