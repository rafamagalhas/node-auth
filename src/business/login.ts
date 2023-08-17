import { createToken } from "./jwt";

export function loginBusiness(data: any) {
  const { username, password } = data;

  if (username !== "rebels" || password !== "1138") {
    throw new Error("Unauthorized");
  }

  const token = createToken(username);

  return { token };
}
