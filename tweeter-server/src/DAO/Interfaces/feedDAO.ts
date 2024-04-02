import { Status } from "tweeter-shared/src/model/domain/Status";

export interface feedDAO{

  getFeed(): Status[];

  updateFeed(): void;
};