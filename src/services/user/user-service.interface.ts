import { UserType } from "../../types/user.type";
import { CreateUserDto, CreateUserResponseDto, UpdateUserDto, UserResponseDto } from "../../dtos/user.dto";
import { RequestWithUser } from "../../types/express";
import { Request } from "express";

export interface IUserService {
    getUserById(id: string): Promise<UserType>;
    createUser(username: string, userId: string, password: string, role: string): Promise<CreateUserResponseDto>;
    updateUser(id: string, user: UpdateUserDto): Promise<UserType>;
    deleteUser(id: string): Promise<void>;
    getAllUsers(): Promise<UserType[]>;
    loginUser(req: Request): Promise<string>;
}