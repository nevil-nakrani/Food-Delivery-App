import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import BlacklistToken from "../models/BlackListToken.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlacklistToken.findOne({ token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(501).json({ message: "Unauthorized" });
  }
};
