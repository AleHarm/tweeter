import { Status } from "tweeter-shared/src/model/domain/Status";

export interface storyDAO{

  getStory(): Status[];

  updateStory(): void;
};