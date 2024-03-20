"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class UserService {
    login(alias, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling the server
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error("[BadRequest] Invalid alias or password");
            }
            return [true, user, tweeter_shared_1.FakeData.instance.authToken];
        });
    }
    ;
    logout(authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pause so we can see the logging out message. Delete when the call to the server is implemented.
            yield new Promise((res) => setTimeout(res, 1000));
        });
    }
    ;
    register(firstName, lastName, alias, password, imageStringBase64) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling the server
            let user = tweeter_shared_1.FakeData.instance.firstUser;
            if (user === null) {
                throw new Error("[BadRequest] Invalid registration");
            }
            return [true, user, tweeter_shared_1.FakeData.instance.authToken];
        });
    }
    getUser(authToken, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling the server
            let user = tweeter_shared_1.FakeData.instance.findUserByAlias(alias);
            if (user === null) {
                throw new Error("[BadRequest] Invalid alias or authToken");
            }
            return [true, user];
        });
    }
    ;
}
exports.UserService = UserService;
