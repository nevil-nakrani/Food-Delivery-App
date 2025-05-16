import BlacklistToken from "../models/BlackListToken.model.js";
import User from "../models/user.model.js";
import { createUser } from "../Services/user.service.js";

export const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = user.setToken();
    res.cookie("token", token);

    return res.status(201).json({ user, token, success: true });
  } catch (e) {
    console.log(e);
    return res.json({ message: e.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const validUser = await user.comparePassword(password);
    if (!validUser) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = user.setToken();
    res.cookie("token", token);
    return res.status(200).json({ user, token, success: true });
  } catch (e) {
    console.log(e);
    return res.json({ message: e.message, success: false });
  }
};

export const profile = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user, success: true });
  } catch (e) {
    console.log(e);
    return res.status(501).json({ message: e.message, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({ token });
    return res.status(200).json({ message: "Logged Out", success: true });
  } catch (e) {
    console.log(e);
    return res.status(501).json({ message: e.message, success: false });
  }
};
