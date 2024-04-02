import { Status } from "tweeter-shared/src/model/domain/Status";
import { storyDAO } from "../../Interfaces/storyDAO";

export class storyDAO_DDB implements storyDAO{
  getStory(): Status[] {
    throw new Error("Method not implemented.");
  }
  updateStory(): void {
    throw new Error("Method not implemented.");
  }
}