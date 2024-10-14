import { UserType } from "src/types/user.type";
import { CreateUserDto, CreateUserResponseDto, UpdateUserDto, UserResponseDto } from "../../dtos/user.dto";


export interface IUserService {
    getUserById(id: string): Promise<UserType>;
    createUser(user: CreateUserDto): Promise<CreateUserResponseDto>;
    updateUser(id: string, user: UpdateUserDto): Promise<UserType>;
    deleteUser(id: string): Promise<void>;
    getAllUsers(): Promise<UserType[]>;
}