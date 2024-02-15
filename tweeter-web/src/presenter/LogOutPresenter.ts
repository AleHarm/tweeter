import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface LogOutView{

  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
  clearLastInfoMessage: () => void;
  clearUserInfo: () => void;
}

export class LogOutPresenter{

  private service: UserService;
  private _view: LogOutView;

  public constructor(view: LogOutView){

    this._view = view;
    this.service = new UserService();
  }

  public async logOut (authToken: AuthToken) {
    this._view.displayInfoMessage("Logging Out...", 0);

    try {
      await this.service.logout(authToken!);

      this._view.clearLastInfoMessage();
      this._view.clearUserInfo();
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`
      );
    }
  };
}