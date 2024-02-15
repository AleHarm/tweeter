import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { MutableRefObject } from "react";
import { NavigateFunction } from "react-router-dom";

export interface RegisterView{
  navigate: NavigateFunction;
  updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
  displayErrorMessage: (message: string) => void;
}

export class RegisterPresenter{

  private service: UserService;
  private _view: RegisterView;

  public constructor(view: RegisterView){

    this._view = view;
    this.service = new UserService();
  }
  
  public async doRegister(firstName: string, 
    lastName: string, 
    alias: string, 
    password: string, 
    imageBytes: Uint8Array, 
    rememberMeRef: MutableRefObject<boolean>){
    try {
      let [user, authToken] = await this.service.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes
      );

      this._view.updateUserInfo(user, user, authToken, rememberMeRef.current);
      this._view.navigate("/");
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`
      );
    }
  };

}