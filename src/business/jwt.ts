import createError from "http-errors";
import HttpStatus from "http-status-codes";
import jwt from "jwt-simple";
import moment from "moment";


export function createToken(username: string): string {
  const tokenExpire: number = Number(process.env.TOKEN_EXPIRE) || 5;
  const tokenExpireType: any = process.env.TOKEN_EXPIRE_TYPE || "minutes";

  const token = jwt.encode(
    {
      user: username,
      exp: moment().add(tokenExpire, tokenExpireType).valueOf(),
    },
    process.env.JWT_TOKEN_SECRET
  );

  return token;
}

export function verifyJwt(token) {
  if (!token) {
    throw createError(HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  try {
    const decoded = jwt.decode(token.toString(), process.env.JWT_TOKEN_SECRET);
    const isExpired = moment(decoded.exp).isBefore(new Date());
    if (isExpired) {
      throw createError(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }

    return decoded.user;
  } catch (err) {
    err.status = HttpStatus.UNAUTHORIZED;
    throw err;
  }
}
