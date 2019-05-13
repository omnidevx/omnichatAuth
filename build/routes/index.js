"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
var user_1 = require("./user");
exports.routes = express_1.Router();
exports.routes.use('/auth', auth_1.authRouter);
exports.routes.use('/user', user_1.userRouter);
//# sourceMappingURL=index.js.map