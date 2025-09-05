import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies, "cookies in verify token");

  if (!token) {
    return res.status(401).json({ message: "No token provided, please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message, `error in verify token`);
    return res.status(401).json({ message: "Invalid token" });
  }
};