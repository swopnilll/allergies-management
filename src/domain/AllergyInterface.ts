export interface AllergyInterface {
  id?: number;
  name: string;
  severity: string;
  isHighRisk: boolean;
  symtoms: string;
  userId: number;
  isDeleted?: boolean;
}

export interface AllergyPatchRequestInterface {
  name: string;
  severity: string;
  isHighRisk: boolean;
  symtoms: string;
}