import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import { Status } from "../domain/Status";

export interface Request{

  
}

export class GetUserRequest implements Request{

  alias: string;
  authToken: AuthToken;

  constructor(alias: string, authToken: AuthToken){

    this.alias = alias;
    this.authToken = authToken;
  }
}

export class LoginRequest implements Request{

  username: string;
  password: string;

  constructor(username: string, password: string){

    this.username = username;
    this.password = password;
  }
}

export class LogoutRequest implements Request{

  authToken: AuthToken;

  constructor(authToken: AuthToken){

    this.authToken = authToken;
  }
}

export class RegisterRequest implements Request{

  firstName: string;
  lastName: string;
  alias: string;
  password: string;
  imageStringBase64: string;

  constructor(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string
  ){

    this.firstName = firstName;
    this.lastName = lastName;
    this.alias = alias;
    this.password = password;
    this.imageStringBase64 = imageStringBase64;
  }
}

export class GetFolloweesCountRequest implements Request{

  authToken: AuthToken;
  user: User;

  constructor(authToken: AuthToken, user: User){

    this.authToken = authToken;
    this.user = user;
  }
}

export class GetFollowersCountRequest implements Request{

  authToken: AuthToken;
  user: User;

  constructor(authToken: AuthToken, user: User){

    this.authToken = authToken;
    this.user = user;
  }
}

export class GetIsFollowerStatusRequest implements Request{

  authToken: AuthToken;
  user: User;
  selectedUser: User;

  constructor(authToken: AuthToken, user: User, selectedUser: User){

    this.authToken = authToken;
    this.user = user;
    this.selectedUser = selectedUser;
  }
}

export class PostStatusRequest implements Request{

  authToken: AuthToken;
  newStatus: Status

  constructor(authToken: AuthToken, newStatus: Status){

    this.authToken = authToken;
    this.newStatus = newStatus;
  }
}

export class LoadStatusRequest implements Request{

  authToken: AuthToken;
  user: User;
  pageSize: number;
  lastItem: Status | null;

  constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null){

    this.authToken = authToken;
    this.user = user;
    this.pageSize = pageSize;
    this.lastItem = lastItem;
  }
}

export class LoadUserRequest implements Request{

  authToken: AuthToken;
  user: User;
  pageSize: number;
  lastItem: User | null;

  constructor(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null){

    this.authToken = authToken;
    this.user = user;
    this.pageSize = pageSize;
    this.lastItem = lastItem;
  }
}