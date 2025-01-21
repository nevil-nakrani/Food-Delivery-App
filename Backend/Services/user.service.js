import User from "../models/user.model.js";

export const createUser = async ({ email, firstname, lastname, password }) => {
  if (!email || !firstname || !password) {
    throw new Error("Please provide the all details");
  }

  const user = await User.create({
    email,
    fullname: { firstname, lastname },
    password,
  });

  return user;
};
