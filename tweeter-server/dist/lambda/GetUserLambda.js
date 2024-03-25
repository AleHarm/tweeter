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
exports.handler = void 0;
const UserService_1 = require("../model/service/UserService");
const Response_1 = require("tweeter-shared/dist/model/net/Response");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let response = new Response_1.GetUserResponse(...yield new UserService_1.UserService().getUser(event.authToken, event.alias));
    return response;
});
exports.handler = handler;
