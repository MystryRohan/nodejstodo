import jwt from "jsonwebtoken";

export const genToken = (res, status, message, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
