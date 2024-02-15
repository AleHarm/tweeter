import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface UserNavigationView{

  displayErrorToast: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter{

  private _view: UserNavigationView;
  private service: UserService;

  public constructor(view: UserNavigationView){

    this._view = view;
    this.service = new UserService();
  }

  public async navigateToUser (authToken: AuthToken, currentUser: User, event: string): Promise<void> {

    try {
      let alias = this.extractAlias(event);
      let user = await this.service.getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          this._view.setDisplayedUser(currentUser!);
        } else {
          this._view.setDisplayedUser(user);
        }
      }
    } catch (error) {
      this._view.displayErrorToast(`Failed to get user because of exception: ${error}`, 0);
    }
  };

  public extractAlias (value: string) {
    let index = value.indexOf("@");
    return value.substring(index);
  };
}