import { StatusService } from "../../src//model/service/StatusService"
import { User } from "tweeter-shared/src/model/domain/User";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import "isomorphic-fetch";

describe("StatusService", () => {
  let statusService: StatusService;
  statusService = new StatusService();

  it("gets feed items", async () => {
    let value = await statusService.loadMoreFeedItems(new AuthToken("a456699", Date.now()), new User("bill", "Stevens", "@BillyBoi", ""), 1, null)
    
    expect(value).not.toBeNull();
  });
});
