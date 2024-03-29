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
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class StatusService {
    postStatus(authToken, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pause so we can see the logging out message. Delete when the call to the server is implemented.
            if (authToken === null) {
                throw new Error("[BadRequest] Invalid authtoken");
            }
            yield new Promise((f) => setTimeout(f, 2000));
            // TODO: Call the server to post the status
        });
    }
    ;
    loadMoreFeedItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            const paginatedStatusItems = tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
            if (paginatedStatusItems === null) {
                throw new Error("[BadRequest] Invalid user or authToken");
            }
            return [true, paginatedStatusItems];
        });
    }
    loadMoreStoryItems(authToken, user, pageSize, lastItem) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Replace with the result of calling server
            const paginatedStatusItems = tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
            if (paginatedStatusItems === null) {
                throw new Error("[BadRequest] Invalid user or authToken");
            }
            return [true, paginatedStatusItems];
        });
    }
}
exports.StatusService = StatusService;
