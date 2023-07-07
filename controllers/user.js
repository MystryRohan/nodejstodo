import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/features.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "Already Registed",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  genToken(res, 201, "User Created", user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({ success: false, message: "Register First" });

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(404).json({
      success: false,
      message: "Invalid Username or Password",
    });
  }
  genToken(res, 200, `Welcome Back, ${user.name}!`, user);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
};
