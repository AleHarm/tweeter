import { MutableRefObject } from "react";
import { AuthView, AuthorizationPresenter } from "./AuthorizationPresenter";

export interface LoginView extends AuthView{
}

export class LoginPresenter extends AuthorizationPresenter<LoginView>{

  public async doLogin(alias: string, 
    password: string, 
    rememberMeRef: MutableRefObject<boolean>, 
    originalUrl?: string){
      
    this.authenticate(async() =>{return this.service.login(alias, password)}, rememberMeRef, originalUrl);
  };

  protected getActionDescription(): string {
    return "log user in";
  }
}