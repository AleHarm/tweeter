import { View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { StatusService } from "../model/service/StatusService";
import { Status } from "tweeter-shared/src/model/domain/Status";

export interface StatusItemView extends View{
  addItems: (items: Status[]) => void;
  displayErrorMessage: (message:string) => void;
}

export abstract class StatusItemPresenter extends PagedItemPresenter<Status, StatusService>{
  protected createService(): StatusService{

    return new StatusService();
  }
}