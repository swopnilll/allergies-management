export interface UserAllergyInterface {
    id: number;
    userId: number; 
    allergyId: number;
  }
  
  export type UserAllergyToInsert = Omit<UserAllergyInterface, "id">;
  