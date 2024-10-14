import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dto";
import { UserType } from "../../types/user.type";

export interface IUserRepository {
    createUser(userData: CreateUserDto): Promise<UserType>;
    updateUser(userId: string, updateData: UpdateUserDto): Promise<UserType>;
    deleteUser(userId: string): Promise<UserType>;
    getUserById(userId: string): Promise<UserType>;
    getAllUsers(): Promise<UserType[]>;
}
