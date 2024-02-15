import { AuthToken, User } from "tweeter-shared";


export interface UserItemView{

  addItems: (items: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter{

  private _view: UserItemView;
  private _hasMoreItems: boolean = true;


  protected constructor(view: UserItemView){

    this._view = view;
  }

  protected get view(){

    return this._view;
  }

  protected set hasMoreItems(value: boolean){

    this._hasMoreItems = value;
  }

  public get hasMoreItems(){

    return this._hasMoreItems;
  }

  public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}