"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const message_1 = __importDefault(require("../controllers/message"));
router.get('/', message_1.default.getMessages);
router.post('/', message_1.default.sendMessage);
module.exports = router;
//# sourceMappingURL=message_route.js.map