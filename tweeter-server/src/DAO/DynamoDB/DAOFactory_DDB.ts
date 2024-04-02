import { DAOFactory } from "../Interfaces/DAOFactory";
import { authTokenDAO_DDB } from "./DAOs/authTokenDAO_DDB";
import { feedDAO_DDB } from "./DAOs/feedDAO_DDB";
import { followsDAO_DDB } from "./DAOs/followsDAO_DDB";
import { storyDAO_DDB } from "./DAOs/storyDAO_DDB";
import { userDAO_DDB } from "./DAOs/userDAO_DDB";

export class DAOFactory_DDB implements DAOFactory{

  authTokenDAO: authTokenDAO_DDB = new authTokenDAO_DDB();
  feedDAO: feedDAO_DDB = new feedDAO_DDB();
  followsDAO: followsDAO_DDB = new followsDAO_DDB();
  storyDAO: storyDAO_DDB = new storyDAO_DDB();
  userDAO: userDAO_DDB = new userDAO_DDB();
}