"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Packages
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '1mb' }));
app.use(body_parser_1.default.json());
//DB Connection
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DATABASE_URL);
const db = mongoose_1.default.connection;
db.on('error', error => { console.error(error); });
db.once('open', () => { console.log('Connected to mongo DB'); });
//Routes
const post_route_1 = __importDefault(require("./routes/post_route"));
const message_route_1 = __importDefault(require("./routes/message_route"));
app.use(express_1.default.static('public'));
app.use('/post', post_route_1.default);
app.use('/messages', message_route_1.default);
//Export app object for server.js
exports.default = app;
//# sourceMappingURL=server.js.map