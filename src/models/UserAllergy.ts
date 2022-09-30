import db from "../db/db";
import { UserAllergyToInsert } from "../domain/UserAllergyInterface";

class UserAllergy {
  public static table = "user_allergy";

  public static async getAllergiesForUser(userId: number) {
    const users = await db(UserAllergy.table)
      .select([
        "allergies.id",
        "allergies.name",
        "allergies.severity",
        "allergies.is_high_risk",
        "user_id",
      ])
      .join("users", "user_allergy.user_id", "=", "users.id")
      .where({ user_id: userId })
      .join("allergies", "user_allergy.allergy_id", "=", "allergies.id")
      .where({ is_deleted: false });

    return users;
  }

  public static async createUserAllergy(payload: UserAllergyToInsert) {
    console.log("payload", payload);
    const newUserAllergy = await db(UserAllergy.table).insert(
      {
        user_id: payload.userId,
        allergy_id: payload.allergyId,
      },

      ["id", "user_id", "allergy_id"]
    );

    return newUserAllergy;
  }
}

export default UserAllergy;
