import BlacklistToken from "../models/BlackListToken.model.js";
import User from "../models/user.model.js";
import { createUser } from "../Services/user.service.js";

export const signup = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.setToken();
    res.cookie("token", token);

    return res.status(201).json({ user, token });
  } catch (e) {
    console.log(e);
    return res.json(e.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json("Invalid credentials");
    }
    const validUser = await user.comparePassword(password);
    if (!validUser) {
      return res.status(401).json("Invalid credentials");
    }

    const token = user.setToken();
    res.cookie("token", token);
    return res.status(200).json({ user, token });
  } catch (e) {
    console.log(e);
    return res.json(e.message);
  }
};

export const profile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (e) {
    console.log(e);
    return res.status(501).json({ message: e.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({ token });
    return res.status(200).json({ message: "Logged Out" });
  } catch (e) {
    console.log(e);
    return res.status(501).json({ message: e.message });
  }
};
