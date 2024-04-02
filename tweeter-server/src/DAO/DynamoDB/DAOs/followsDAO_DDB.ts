import { User } from "tweeter-shared/src/model/domain/User";
import { followsDAO } from "../../Interfaces/followsDAO";
import { DataPage } from "../../entity/DataPage";
import { FollowObject } from "../../entity/FollowObject";

export class followsDAO_DDB implements followsDAO{
  getIsFollowerStatus(user: User, possibleFollower: User): boolean {
    throw new Error("Method not implemented.");
  }
  getPageOfFollowers(): DataPage<FollowObject> {
    throw new Error("Method not implemented.");
  }
}