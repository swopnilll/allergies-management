import db from "../db/db";
import { AllergyToInsert } from "../domain/AllergyInterface";

class Allergy {
  public static table = "allergies";

  public static async getAllergies() {
    const users = await db(Allergy.table).select(["*"]);

    return users;
  }

  public static async createAllergy(payload: AllergyToInsert) {
    const newAllergy = await db(Allergy.table).insert({
      name: payload.name,
      is_deleted: false,
      is_high_risk: payload?.isHighRisk,
      severity: payload?.severity,
    }, ["id", "name"]);

    return newAllergy;
  }
}

export default Allergy;
