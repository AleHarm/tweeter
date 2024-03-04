import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface AppNavbarView extends View{

  displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
  clearLastInfoMessage: () => void;
  clearUserInfo: () => void;
}

export class AppNavbarPresenter extends Presenter{

  private _service: UserService;

  public constructor(view: AppNavbarView){

    super(view);
    this._service = new UserService();
  }

  protected get view(): AppNavbarView{
    return super.view as AppNavbarView;
  }

  public get service(){

    return this._service;
  }

  public async logout (authToken: AuthToken) {
    this.view.displayInfoMessage("Logging Out...", 0);

    this.doFailureReportingOperation(async () => {
      await this.service.logout(authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    }, this.getActionDescription());
  };

  protected getActionDescription(): string {
    return "log user out";
  }
}