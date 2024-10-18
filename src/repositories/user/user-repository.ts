import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./user-repository.interface";
import { UserType } from "../../types/user.type"; // Assuming this is where your user type is defined.
import UserModel from "../../models/user.model"; // The Mongoose User model
import { CreateUserDto } from "../../../src/dtos/user.dto";

@injectable()
export class UserRepository implements IUserRepository {
    constructor() { }

    async createUser(userId: string, username: string, password: string, role: string): Promise<UserType> {
        return new Promise((resolve, reject) => {
            UserModel.register(
                new UserModel({ userId: userId, username: username, password: password, role: role }), password,
                (err, user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                }
            );
        });
    }



    async updateUser(userId: string, updateData: Partial<UserType>): Promise<UserType> {
        return UserModel.findOneAndDelete({ userId, updateData }, { new: true }).lean().exec();
    }

    async deleteUser(userId: string): Promise<UserType> {
        return UserModel.findOneAndDelete({ userId }).lean().exec();
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
