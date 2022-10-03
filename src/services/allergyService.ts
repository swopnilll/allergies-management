import { Success } from "../domain/Success";
import {
  AllergyInterface,
  AllergyPatchRequestInterface,
} from "../domain/AllergyInterface";

import Allergy from "../models/Allergy";

export const getAllergiesByUserId = async (
  userId: number
): Promise<Success<AllergyInterface>> => {
  const allergies = await Allergy.getAllergiesByUserId(userId);

  return {
    data: allergies,
    message: "Succesfully retrieved allergies",
  };
};

export const createAllergy = async (
  payload: AllergyInterface
): Promise<Success<AllergyInterface>> => {
  const newAllergy = await Allergy.createAllergy(payload);

  return {
    data: newAllergy,
    message: "Successfully created new allergy",
  };
};

export const updateAllergy = async (
  userId: number,
  payload: AllergyPatchRequestInterface
): Promise<Success<number>> => {
  const newAllergy = await Allergy.updateAllergy(userId, payload);

  return {
    data: newAllergy,
    message: "Successfully created new allergy",
  };
};

export const deleteAllergy = async (
  allergyId: number
): Promise<Success<number>> => {
  const deletedAllergy = await Allergy.deleteAllergy(allergyId);

  return {
    data: deletedAllergy,
    message: "Successfully Deleted the allergy",
  };
};
