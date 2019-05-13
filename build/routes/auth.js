"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var checkJwt_1 = require("../middlewares/checkJwt");
exports.authRouter = express_1.Router();
exports.authRouter.post('/login', AuthController_1.default.login);
exports.authRouter.post('/change-password', [checkJwt_1.checkJwt], AuthController_1.default.changePassword);
//# sourceMappingURL=auth.js.map