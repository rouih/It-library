import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./user-repository.interface";
import { UserType } from "../../types/user.type"; // Assuming this is where your user type is defined.
import UserModel from "../../models/user.model"; // The Mongoose User model
import { CreateUserDto } from "../../../src/dtos/user.dto";

@injectable()
export class UserRepository implements IUserRepository {
    constructor() { }

    async createUser(userData: Partial<CreateUserDto>): Promise<UserType> {
        const user = new UserModel(userData);
        return user.save();
    }

    async updateUser(userId: string, updateData: Partial<UserType>): Promise<UserType> {
        return UserModel.findByIdAndUpdate(userId, updateData, { new: true }).lean().exec();
    }

    async deleteUser(userId: string): Promise<UserType> {
        return UserModel.findByIdAndDelete(userId).lean().exec();
    }

    async getUserById(userId: string): Promise<UserType> {
        return UserModel.findOne({ userId }).lean().exec();
    }

    async getUserByEmail(email: string): Promise<UserType> {
        return UserModel.findOne({ email }).lean().exec();
    }

    async getAllUsers(): Promise<UserType[]> {
        return UserModel.find({}).lean().exec();
    }
}
