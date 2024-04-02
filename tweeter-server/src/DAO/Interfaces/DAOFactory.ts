import { authTokenDAO } from "./authTokenDAO";
import { feedDAO } from "./feedDAO";
import { followsDAO } from "./followsDAO";
import { storyDAO } from "./storyDAO";
import { userDAO } from "./userDAO";

export interface DAOFactory {

  authTokenDAO: authTokenDAO;
  feedDAO: feedDAO;
  followsDAO: followsDAO;
  storyDAO: storyDAO;
  userDAO: userDAO;
}