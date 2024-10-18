import { inject, injectable } from "tsyringe";
import { IUserController } from "../../controllers/user/user-controller-index";
import { IUserService } from "../../../services/user/user-service-index";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto, UpdateUserDto } from "../../../dtos/user.dto";
import { RequestWithUser } from "../../../types/express";
import logger from "../../../utils/winston-logger";

@injectable()
export class UserController implements IUserController {
    constructor(@inject("IUserService") private userService: IUserService) { }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info("User requested to login");
            const token = await this.userService.loginUser(req);
            logger.info("User logged in successfully");
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }


    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, userId, password, role } = req.body;
            const createdUser = await this.userService.createUser(username, userId, password, role);
            res.status(201).json(createdUser);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, password, role } = req.body;
            let userDto: UpdateUserDto = { userId, password, role };
            const updatedUser = await this.userService.updateUser(userId, userDto);
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(204).send(`Deleted user ${id}`);
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
}
