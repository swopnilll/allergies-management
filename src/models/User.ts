import db from '../db/db';

class User {
    public static table = "users";

    public static async getAllUsers(){
        const users = await db(User.table).select();

        return users;
    }
}

export default User;