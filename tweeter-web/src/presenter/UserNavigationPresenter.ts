import { User } from "tweeter-shared/src/model/domain/User";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";

export interface UserNavigationView extends View{

  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter{

  private service: UserService;

  public constructor(view: UserNavigationView){

    super(view);
    this.service = new UserService();
  }

  protected get view(): UserNavigationView{
    return super.view as UserNavigationView;
  }

  public async navigateToUser (authToken: AuthToken, currentUser: User, event: string): Promise<void> {

    this.doFailureReportingOperation(async () =>{
      let alias = this.extractAlias(event);
      let user = await this.service.getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          this.view.setDisplayedUser(currentUser!);
        } else {
          this.view.setDisplayedUser(user);
        }
      }
    }, this.getActionDescription());
  }

  public extractAlias (value: string) {
    let index = value.indexOf("@");
    return value.substring(index);
  };

  protected getActionDescription(): string {
    return "get user";
  }
}