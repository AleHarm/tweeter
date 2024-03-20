"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const UserService_1 = require("../model/service/UserService");
const handler = (event) => {
    new UserService_1.UserService().logout(event.authToken);
};
exports.handler = handler;
