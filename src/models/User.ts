import db from "../db/db";

import { UserToInsert } from "../domain/UserInterface";

class User {
  public static table = "users";

  public static async getAllUsers() {
    const users = await db(User.table).select(["id", "name", "email"]);

    return users;
  }

  public static async createUser(userPayload: UserToInsert) {
    const user = await db(User.table)
      .insert(userPayload)
      .returning(["id", "name", "email"]);

    return user;
  }

  public static async getUserByEmail(email: string) {
    const user = await db(User.table).where({ email }).first();

    return user;
  }
}

export default User;
