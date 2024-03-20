import { View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { FollowService } from "../model/service/FollowService";
import { User } from "tweeter-shared/src/model/domain/User";

export interface UserItemView extends View{
  addItems: (items: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService>{
  protected createService(): FollowService{

    return new FollowService();
  }
}