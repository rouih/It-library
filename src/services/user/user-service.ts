import { inject, injectable } from "tsyringe";
import { IUserService } from "../../services/user/user-service-index";
import { IUserRepository } from "../../repositories/user/user-repository-index";
import { UserType } from "../../types/user.type";
import { CreateUserResponseDto, UserResponseDto } from "../../dtos/user.dto";
import jwt from "jsonwebtoken";
import { passport } from "../../utils/middlewares/passport.config";
import { RequestWithUser } from "../../types/express";
import { NextFunction, Response } from "express";


@injectable()
export class UserService implements IUserService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

    constructor(@inject("IUserRepository") private userRepository: IUserRepository) { }

    async loginUser(req: RequestWithUser): Promise<string> {
        return new Promise((resolve, reject) => {
            passport.authenticate("local", { session: false }, (err, user, info) => {
                if (err || !user) {
                    return reject(new Error("Unauthorized: Invalid Credentials"));
                }
                req.logIn(user, { session: false }, (err) => {
                    if (err) {
                        return reject(new Error("Unauthorized: Invalid Credentials"));
                    }
                    const token = this.generateToken(user.userId);
                    return resolve(token);
                });
            })(req, req.res as Response, req.next as NextFunction);
        });
    }

    async createUser(username: string, userId: string, password: string, role: string): Promise<CreateUserResponseDto> {
        const isUserExist = await this.userRepository.getUserById(userId);

        if (isUserExist) {
            throw new Error("User already exists");
        }
        const newRegisterdUser = await this.userRepository.createUser(userId, username, password, role);
        return new CreateUserResponseDto({
            userId: newRegisterdUser.userId,
            token: this.generateToken(newRegisterdUser.userId)
        })
    }

    private generateToken(userId: string): string {
        return jwt.sign({ userId: userId }, this.JWT_SECRET, { expiresIn: "1h" });
    }

    async getUserById(userId: string): Promise<UserType> {
        return this.userRepository.getUserById(userId);
    }

    async updateUser(userId: string, user: Partial<UserType>): Promise<UserType> {
        return this.userRepository.updateUser(userId, user);
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepository.deleteUser(userId);
    }

    async getAllUsers(): Promise<UserType[]> {
        return this.userRepository.getAllUsers();
    }
}
