import { AllergyInterface } from "../domain/AllergyInterface";

import { Success } from "../domain/Success";
import Allergy from "../models/Allergy";
import UserAllergy from "../models/UserAllergy";

export const getAllergy = async (
  userId: number
): Promise<Success<AllergyInterface[]>> => {
  console.log("get allergy service");
  const allergies = await UserAllergy.getAllergiesForUser(userId);
  console.log("------------");
  console.log(allergies);

  return {
    data: allergies,
    message: "Allergies fetched successfully",
  };
};

export const createAllergy = async (
  userId: number,
  payload: AllergyInterface
): Promise<Success<AllergyInterface>> => {
  const allergie = await Allergy.createAllergy(payload);

  const allergyId = allergie?.[0]?.id as number;

  await UserAllergy.createUserAllergy({
    userId,
    allergyId,
  });

  console.log("allergie", allergie);

  return {
    data: allergie,
    message: "Allergies fetched successfully",
  };
};
