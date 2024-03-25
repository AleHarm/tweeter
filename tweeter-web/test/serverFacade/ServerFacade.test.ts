import { ServerFacade } from "../../src/net/ServerFacade";
import { GetFollowersCountRequest, GetUserRequest, RegisterRequest } from "tweeter-shared/src/model/net/Request";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import { User } from "tweeter-shared/src/model/domain/User";
import "isomorphic-fetch";

describe("ServerFacade", () => {
  let serverFacade: ServerFacade;

  beforeEach(() => {
    serverFacade = new ServerFacade();
  });

  it("registers a user", async () => {
    const request = new RegisterRequest("bill", "Stevens", "@BillyBoi", "a22ffododod", "");
    let value = await serverFacade.register(request);
    expect(value).not.toBeNull();
  });

  it("gets users", async () => {
    const request = new GetUserRequest("@allen", new AuthToken("a456699", Date.now()));
    let value = await serverFacade.getUser(request);
    expect(value).not.toBeNull();
  });

  it("gets a number of followers", async () => {
    const request = new GetFollowersCountRequest(new AuthToken("a456699", Date.now()), new User("bill", "Stevens", "@BillyBoi", ""));
    let value = await serverFacade.getFollowersCount(request);
    expect(value).not.toBeNull();
  });
});
