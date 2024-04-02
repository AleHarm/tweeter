import { Status } from "tweeter-shared/src/model/domain/Status";
import { feedDAO } from "../../Interfaces/feedDAO";

export class feedDAO_DDB implements feedDAO{
  getFeed(): Status[] {
    throw new Error("Method not implemented.");
  }
  updateFeed(): void {
    throw new Error("Method not implemented.");
  }
}