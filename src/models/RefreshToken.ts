import db from "../db/db";
import {
  RefreshTokenInterface,
  RefreshTokenToInsertInterface,
} from "../domain/RefreshTokenInterface";

export class RefreshToken {
  private static table_name = "refresh_token";

  public static async getRefreshToken(
    token: string
  ): Promise<RefreshTokenInterface> {
    const refreshToken = await db(RefreshToken.table_name)
      .select()
      .where({ token: token })
      .first();

    return refreshToken;
  }

  public static async createReferenceToken(
    payload: RefreshTokenToInsertInterface
  ) {
    const newRefreshToken = await db(RefreshToken.table_name)
      .insert(payload)
      .returning(["id", "token", "user_id", "expires_at"]);

    return newRefreshToken;
  }

  public static async deleteReferenceToken(user_id: number) {
    const deletedUserReferenceToken = await db(RefreshToken.table_name)
      .where({ user_id })
      .delete();

    return {
      data: deletedUserReferenceToken,
      message: "successfully logout",
    };
  }
}
