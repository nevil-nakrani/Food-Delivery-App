import User from "../models/user.model.js";

export const createUser = async ({ email, name, password }) => {
  if (!email || !name || !password) {
    throw new Error("Please provide the all details");
  }

  const user = await User.create({
    email,
    name,
    password,
  });

  return user;
};
