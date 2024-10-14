import { inject, injectable } from "tsyringe";
import { IUserController } from "../../controllers/user/user-controller-index";
import { IUserService } from "../../../services/user/user-service-index";
import { Request, Response, NextFunction } from "express";
import { CreateUserDto, UpdateUserDto } from "../../../dtos/user.dto";

@injectable()
export class UserController implements IUserController {
    constructor(@inject("IUserService") private userService: IUserService) { }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: CreateUserDto = req.body;
            const createdUser = await this.userService.createUser(user);
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
            const { userId } = req.params;
            await this.userService.deleteUser(userId);
            res.status(204).send();
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
