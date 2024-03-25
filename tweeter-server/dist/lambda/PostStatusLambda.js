"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const StatusService_1 = require("../model/service/StatusService");
const handler = (event) => {
    return new StatusService_1.StatusService().postStatus(event.authToken, event.newStatus);
};
exports.handler = handler;
