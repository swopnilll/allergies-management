import jwt from "jsonwebtoken";

import { RefreshToken } from "../models/RefreshToken";

export const getAccessToken = async (token: string) => {
  const existingToken = await RefreshToken.getRefreshToken(token);

  if (!existingToken) {
    throw new Error("Invalid refresh token");
  }

  if (existingToken.expires_at < new Date()) {
    throw new Error("Refresh token expired");
  }

  const { userId } = jwt.verify(
    existingToken.token,
    process.env.JWT_REFRESH_TOKEN_SECRET as string
  ) as { userId: number };

  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return {
    data: accessToken,
  };
};
