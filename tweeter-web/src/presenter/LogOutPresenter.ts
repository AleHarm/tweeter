import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface LogOutView extends View{

  displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
  clearLastInfoMessage: () => void;
  clearUserInfo: () => void;
}

export class LogOutPresenter extends Presenter{

  private service: UserService;

  public constructor(view: LogOutView){

    super(view);
    this.service = new UserService();
  }

  protected get view(): LogOutView{
    return super.view as LogOutView;
  }

  public async logOut (authToken: AuthToken) {
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