import { createUserDto, UpdateUserDto, UserDto } from "../../dtos/user.dto";


export interface IUserService {
    getUserById(personalId: string): Promise<UserDto>;
    createUser(user: createUserDto): Promise<UserDto>;
    updateUser(user: UpdateUserDto): Promise<UserDto>;
    deleteUser(personalId: string): Promise<void>;
}