import { User, AuthToken, FakeData } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { MutableRefObject } from "react";
import { NavigateFunction } from "react-router-dom";

export interface LoginView{
  navigate: NavigateFunction;
  updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter{

  private service: UserService;
  private _view: LoginView;

  public constructor(view: LoginView){

    this._view = view;
    this.service = new UserService();
  }

  public async doLogin(alias: string, password: string, rememberMeRef: MutableRefObject<boolean>, originalUrl?: string){
    try {
      let [user, authToken] = await this.service.login(alias, password);

      this._view.updateUserInfo(user, user, authToken, rememberMeRef.current);

      if (!!originalUrl) {
        this._view.navigate(originalUrl);
      } else {
        this._view.navigate("/");
      }
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    }
  };
}