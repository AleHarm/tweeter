import { Presenter, View } from "./Presenter";
import { NavigateFunction } from "react-router-dom";
import { UserService } from "../model/service/UserService";
import { MutableRefObject } from "react";
import { User } from "tweeter-shared/src/model/domain/User";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";

export interface AuthView extends View{

  navigate: NavigateFunction;
  updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class AuthorizationPresenter<T extends AuthView> extends Presenter{
  private _service: UserService;

  public constructor(view: T){

    super(view);
    this._service = new UserService;
  }

  public get service(){

    return this._service;
  }

  protected get view(): T{
    return super.view as T;
  }

  public async authenticate(callService: () => Promise<[User, AuthToken]>, rememberMeRef: MutableRefObject<boolean>, originalUrl?: string){
    
    this.doFailureReportingOperation(async () => {
      let[user, authToken] = await callService();
      this.view.updateUserInfo(user, user, authToken, rememberMeRef.current);
      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    }, this.getActionDescription());
  }

  protected abstract getActionDescription(): string;
}