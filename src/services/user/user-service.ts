import { inject, injectable } from "tsyringe";
import { IUserService } from "../../services/user/user-service-index";
import { IUserRepository } from "../../repositories/user/user-repository-index";
import { UserType } from "../../types/user.type";
import { CreateUserResponseDto, UserResponseDto } from "../../dtos/user.dto";
import jwt from "jsonwebtoken";


let bcrypt = require('bcrypt')

@injectable()
export class UserService implements IUserService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository) { }

    async createUser(user: UserType): Promise<CreateUserResponseDto> {
        const { userId, password } = user;
        const isUserExist = await this.userRepository.getUserById(userId);

        if (isUserExist) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newRegisterdUser = await this.userRepository.createUser({ userId, password: hashedPassword, role: user.role });
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
