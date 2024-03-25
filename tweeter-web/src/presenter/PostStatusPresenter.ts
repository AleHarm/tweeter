import { Status } from "tweeter-shared/src/model/domain/Status";
import { Dispatch, SetStateAction } from "react";
import { User } from "tweeter-shared/src/model/domain/User";
import { StatusService } from "../model/service/StatusService";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";

export interface PostStatusView{

  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
  setPost: Dispatch<SetStateAction<string>>;
  clearLastInfoMessage: () => void;
}

export class PostStatusPresenter{

  private _service: StatusService;
  private _view: PostStatusView;

  public constructor(view: PostStatusView){

    this._view = view;
    this._service = new StatusService();
  }

  public get service(){

    return this._service;
  }

  public async submitPost (event: React.MouseEvent, post: string, currentUser: User, authToken: AuthToken) {
    event.preventDefault();

    try {
      this._view.displayInfoMessage("Posting status...", 0);

      let status = new Status(post, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this._view.clearLastInfoMessage();
      this._view.setPost("");
      this._view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to post the status because of exception: ${(error as Error).message}`
      );
    }
  };
}