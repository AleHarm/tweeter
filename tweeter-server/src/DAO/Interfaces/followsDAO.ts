import { User } from "tweeter-shared/src/model/domain/User";
import { DataPage } from "../entity/DataPage";
import { FollowObject } from "../entity/FollowObject";

export interface followsDAO{

  getIsFollowerStatus(user: User, possibleFollower: User): boolean;

  getPageOfFollowers(): DataPage<FollowObject>;
};