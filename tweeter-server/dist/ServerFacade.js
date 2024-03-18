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
exports.ServerFacade = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const ClientCommunicator_1 = require("./ClientCommunicator");
class ServerFacade {
    constructor() {
        this.SERVER_URL = "TODO: Set this value.";
        this.clientCommunicator = new ClientCommunicator_1.ClientCommunicator(this.SERVER_URL);
    }
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = "/service/login";
            const response = yield this.clientCommunicator.doPost(request, endpoint);
            return tweeter_shared_1.AuthenticateResponse.fromJson(response);
        });
    }
}
exports.ServerFacade = ServerFacade;
