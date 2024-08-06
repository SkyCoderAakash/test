import jwt from "jsonwebtoken";
import apiResponce from "../utils/apiResponce.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).json(apiResponce(false, 403, "No token provided", []));
  }
  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRETcryh78wy378we@!#!$!$%^!&$%^$!&%^$!$$!CTYFTFTfgyfgyfgyfGHGHJFGHYcxfg");
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json(apiResponce(false, 401, "Invalid token", []));
  }
};

export default verifyToken;
