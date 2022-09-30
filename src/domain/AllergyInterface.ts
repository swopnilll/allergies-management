export interface AllergyInterface {
  id: number;
  name: string;
  severity: string;
  isHighRisk: boolean;
}

export type AllergyToInsert = Omit<AllergyInterface, "id">;
