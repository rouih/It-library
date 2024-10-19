import { Router } from "express";
import { container } from '../../config/container.config';
import { UserController } from "../controllers/user/user-controller-index";
import { authorizeRole } from "../../utils/middlewares/roleAuth.middleware";
import { authMiddleware } from "../../utils/middlewares/auth.middleware";
import { UserRole } from "../../types/user.type";
import { validateDto } from "../../utils/middlewares/dto-validator.middleware";
import { CreateUserDto } from "../../dtos/user.dto";

const router = Router();

let userController = container.resolve(UserController);

//Employee routs
router.post("/", validateDto(CreateUserDto), authMiddleware, authorizeRole(UserRole.EMPLOYEE), (req, res, next) => userController.createUser(req, res, next));
router.delete("/:id", authMiddleware, authorizeRole(UserRole.EMPLOYEE), (req, res, next) => userController.deleteUser(req, res, next));
router.put("/:id", authMiddleware, authorizeRole(UserRole.EMPLOYEE), (req, res, next) => userController.updateUser(req, res, next));

//Common routs
router.get("/login", (req, res, next) => userController.loginUser(req, res, next));
router.get("/", authMiddleware, authorizeRole(UserRole.EMPLOYEE), (req, res, next) => userController.getAllUsers(req, res, next));
router.get("/:id", authMiddleware, (req, res, next) => userController.getUserById(req, res, next));

export default router;