import { MutableRefObject } from "react";
import { AuthView, AuthorizationPresenter } from "./AuthorizationPresenter";

export interface LoginView extends AuthView{
}

export class LoginPresenter extends AuthorizationPresenter<LoginView>{

  public async doLogin(alias: string, 
    password: string, 
    rememberMeRef: MutableRefObject<boolean>, 
    originalUrl?: string){
      
    let [user, authToken] = await this.service.login(alias, password);
    this.authenticate(authToken, user, rememberMeRef, originalUrl);
  };

  protected getItemDescription(): string {
    return "log user in";
  }
}