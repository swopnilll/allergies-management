export interface RefreshTokenInterface {
  id?: number;
  token: string;
  user_id: number;
  expires_at: Date;
}

export type RefreshTokenToInsertInterface = Omit<RefreshTokenInterface, "id">;
