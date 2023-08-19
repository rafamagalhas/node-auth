import { User } from "../models/user";
import { createToken } from "./jwt";

export async function loginBusiness(data: any) {
  const { username, password } = data;

  const user: User = await User.findOne({ where: { name: username, password }})

  if (!user) {
    throw new Error("Unauthorized");
  }

  const token = createToken(username);
  return { token };
}
