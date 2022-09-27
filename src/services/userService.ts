
import User from "../models/User";
import { Success } from "../domain/Success";
import { UserInterface } from "../domain/UserInterface";


export const getAllUsers = async(): Promise<Success<UserInterface[]>> => {
    const users = await User.getAllUsers();

    return {
        data: users,
        message: 'Users fetched successfully',
      };

};