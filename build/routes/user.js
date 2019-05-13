"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var checkJwt_1 = require("../middlewares/checkJwt");
var checkRole_1 = require("../middlewares/checkRole");
exports.userRouter = express_1.Router();
exports.userRouter.get('/', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.listAll);
exports.userRouter.get('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.getOneById);
exports.userRouter.post('/', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.newUser);
exports.userRouter.patch('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.editUser);
exports.userRouter.delete('/:id([0-9]+)', [checkJwt_1.checkJwt, checkRole_1.checkRole(['ADMIN'])], UserController_1.default.deleteUser);
//# sourceMappingURL=user.js.map