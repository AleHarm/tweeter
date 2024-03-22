import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";
import { Status } from "../domain/Status";


export class Response {
  private _success: boolean;
  private _message: string | null;

  constructor(success: boolean, message: string | null = null) {
    this._success = success;
    this._message = message;
  }

  get success() {
    return this._success;
  }

  get message() {
    return this._message;
  }
}

interface ResponseJson {
  _success: boolean;
  _message: string;
}

export class AuthenticateResponse extends Response {
  private _user: User;
  private _token: AuthToken;

  constructor(
    success: boolean,
    user: User,
    token: AuthToken,
    message: string | null = null
  ) {
    super(success, message);
    this._user = user;
    this._token = token;
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }

  static fromJson(json: JSON): AuthenticateResponse {
    interface AuthenticateResponseJson extends ResponseJson {
      _user: JSON;
      _token: JSON;
    }

    const jsonObject: AuthenticateResponseJson =
      json as unknown as AuthenticateResponseJson;
    const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

    if (deserializedUser === null) {
      throw new Error(
        "AuthenticateResponse, could not deserialize user with json:\n" +
          JSON.stringify(jsonObject._user)
      );
    }

    const deserializedToken = AuthToken.fromJson(
      JSON.stringify(jsonObject._token)
    );

    if (deserializedToken === null) {
      throw new Error(
        "AuthenticateResponse, could not deserialize token with json:\n" +
          JSON.stringify(jsonObject._token)
      );
    }

    return new AuthenticateResponse(
      jsonObject._success,
      deserializedUser,
      deserializedToken,
      jsonObject._message
    );
  }
}

export class GetUserResponse extends Response {
  private _user: User;

  constructor(
    success: boolean,
    user: User,
    message: string | null = null
  ) {
    super(success, message);
    this._user = user;
  }

  get user() {
    return this._user;
  }


  static fromJson(json: JSON): GetUserResponse {
    interface GetUserResponseJson extends ResponseJson {
      _user: JSON;
    }

    const jsonObject: GetUserResponseJson =
      json as unknown as GetUserResponseJson;
    const deserializedUser = User.fromJson(JSON.stringify(jsonObject._user));

    if (deserializedUser === null) {
      throw new Error(
        "GetUserResponse, could not deserialize user with json:\n" +
          JSON.stringify(jsonObject._user)
      );
    }

    return new GetUserResponse(
      jsonObject._success,
      deserializedUser,
      jsonObject._message
    );
  }
}

export class GetNumberResponse extends Response {
  private _value: number;

  constructor(
    success: boolean,
    value: number,
    message: string | null = null
  ) {
    super(success, message);
    this._value = value;
  }

  get value() {
    return this._value;
  }


  static fromJson(json: JSON): GetNumberResponse {
    interface GetNumberResponseJson extends ResponseJson {
      _value: JSON;
    }

    const jsonObject: GetNumberResponseJson =
      json as unknown as GetNumberResponseJson;
    const deserializedNumber: number = parseInt(JSON.stringify(jsonObject._value));

    if (deserializedNumber === null) {
      throw new Error(
        "GetNumberResponse, could not deserialize user with json:\n" +
          JSON.stringify(jsonObject._value)
      );
    }

    return new GetNumberResponse(
      jsonObject._success,
      deserializedNumber,
      jsonObject._message
    );
  }
}



export class GetBooleanResponse extends Response {
  private _value: boolean;

  constructor(
    success: boolean,
    value: boolean,
    message: string | null = null
  ) {
    super(success, message);
    this._value = value;
  }

  get value() {
    return this._value;
  }


  static fromJson(json: JSON): GetBooleanResponse {
    interface GetBooleanResponseJson extends ResponseJson {
      _value: JSON;
    }

    const jsonObject: GetBooleanResponseJson =
      json as unknown as GetBooleanResponseJson;
    const deserializedBoolean: boolean = Boolean(jsonObject._value);

    if (deserializedBoolean === null) {
      throw new Error(
        "GetNumberResponse, could not deserialize user with json:\n" +
          JSON.stringify(jsonObject._value)
      );
    }

    return new GetBooleanResponse(
      jsonObject._success,
      deserializedBoolean,
      jsonObject._message
    );
  }
}


// export class StatusItemsResponse extends Response {
//   private _paginatedStatusItems: [Status[], boolean];

//   constructor(
//     success: boolean,
//     paginatedStatusItems: [Status[], boolean],
//     message: string | null = null
//   ) {
//     super(success, message);
//     this._paginatedStatusItems = paginatedStatusItems;
//   }

//   get paginatedStatusItems() {
//     return this._paginatedStatusItems;
//   }


//   static fromJson(json: JSON): StatusItemsResponse {
//     interface StatusItemsResponseJson extends ResponseJson {
//       _paginatedStatusItems: JSON;
//     }

//     const jsonObject: StatusItemsResponseJson =
//       json as unknown as StatusItemsResponseJson;
//     const deserializedPaginatedStatusItems: [Status[], boolean] = JSON.parse(JSON.stringify(jsonObject._paginatedStatusItems)); //MIGHT NOT WORK

//     if (deserializedPaginatedStatusItems === null) {
//       throw new Error(
//         "StatusItemsResponse, could not deserialize paginatedStatusItems with json:\n" +
//           JSON.stringify(jsonObject._paginatedStatusItems)
//       );
//     }

//     return new StatusItemsResponse(
//       jsonObject._success,
//       deserializedPaginatedStatusItems,
//       jsonObject._message
//     );
//   }
// }

export class StatusItemsResponse extends Response {
  private _paginatedStatusItems: [Status[], boolean];

  constructor(
    success: boolean,
    paginatedStatusItems: [Status[], boolean],
    message: string | null = null
  ) {
    super(success, message);
    this._paginatedStatusItems = paginatedStatusItems;
  }

  get paginatedStatusItems() {
    return this._paginatedStatusItems;
  }

  static fromJson(json: any): StatusItemsResponse {
    interface StatusItemsResponseJson extends ResponseJson {
      _paginatedStatusItems: [any[], boolean];
    }

    const jsonObject: StatusItemsResponseJson = json;
    const { _paginatedStatusItems } = jsonObject;

    if (!_paginatedStatusItems || !Array.isArray(_paginatedStatusItems)) {
      throw new Error("Invalid or missing paginated status items in JSON.");
    }

    const [statusArray, booleanValue] = _paginatedStatusItems;
    const statusItems: Status[] = statusArray.map((statusJson: any) => {
      return Status.fromJson(JSON.stringify(statusJson)) as Status;
    });

    return new StatusItemsResponse(
      jsonObject._success,
      [statusItems, booleanValue],
      jsonObject._message
    );
  }
}
