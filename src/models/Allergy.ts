import db from "../db/db";
import { AllergyInterface,AllergyPatchRequestInterface } from "../domain/AllergyInterface";

class Allergy {
  public static table = "allergies";

  public static allergyName = "allergies.name"

  public static async getAllergiesByUserId(userId: number, queryParam="") {
    const allergies = await db(Allergy.table)
      .select(["*"])
      .where({ user_id: userId })
      .where(Allergy.allergyName, "like", queryParam)

    return allergies;
  }

  public static async createAllergy(payload: AllergyInterface) {
    const newAllergy = await db(Allergy.table).insert(
      {
        name: payload.name,
        is_deleted: false,
        is_high_risk: payload.isHighRisk,
        severity: payload.severity,
        symtoms: payload.symtoms,
        user_id: payload.userId,
      },
      ["*"]
    );

    return newAllergy;
  }

  public static async deleteAllergy(allergyId: number) {
    const deletedAllergy = await db(Allergy.table)
      .where({id: allergyId})
      .del()
  
      return deletedAllergy;
  }

  public static async updateAllergy(allergyId: number, payload: AllergyPatchRequestInterface) {
    const updateAllergy = await db(Allergy.table)
      .where({id: allergyId})
      .update({
        name: payload?.name,
        severity: payload.severity,
        is_high_risk: payload.isHighRisk,
        symtoms: payload.symtoms,
      })

      return updateAllergy;

  }
}

export default Allergy;
