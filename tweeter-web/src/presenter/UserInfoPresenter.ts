import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserInfoView extends View{
  setIsFollower: (value: boolean) => void;
  setFolloweesCount: (value: number) => void;
  setFollowersCount: (value: number) => void;
}

export class UserInfoPresenter extends Presenter{

  private service: UserService;


  public constructor(view: UserInfoView){

    super(view);
    this.service = new UserService();
  }

  public async setIsFollowerStatus (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    
    this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
        );
      }
    }, "determine follower status");
  };

  public async setNumbFollowees (
    authToken: AuthToken,
    displayedUser: User
  ) {

    this.doFailureReportingOperation(async () => {
      this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser));

    }, "get followees count");
  };

  public async setNumbFollowers (
    authToken: AuthToken,
    displayedUser: User
  ) {
    this.doFailureReportingOperation(async () => {
      this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser));

    }, "get followers count");
  };

  protected get view(): UserInfoView{
    return super.view as UserInfoView;
  }

  public async follow (
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    // Pause so we can see the following message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    let followersCount = await this.service.getFollowersCount(authToken, userToFollow);
    let followeesCount = await this.service.getFolloweesCount(authToken, userToFollow);

    return [followersCount, followeesCount];
  };

  public async unfollow (
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followersCount: number, followeesCount: number]> {
    // Pause so we can see the unfollowing message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    let followersCount = await this.service.getFollowersCount(authToken, userToUnfollow);
    let followeesCount = await this.service.getFolloweesCount(authToken, userToUnfollow);

    return [followersCount, followeesCount];
  };
}