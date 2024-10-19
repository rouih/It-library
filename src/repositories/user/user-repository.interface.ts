import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dto";
import { UserType } from "../../types/user.type";

export interface IUserRepository {
    createUser(userId: string, username: string, password: string, role: string): Promise<UserType>;
    updateUser(userId: string, updateData: UpdateUserDto): Promise<UserType>;
    deleteUser(userId: string): Promise<UserType>;
    getUserById(userId: string): Promise<UserType>;
    getAllUsers(): Promise<UserType[]>;
}
