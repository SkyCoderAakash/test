import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    "process.env.JWT_SECRETcryh78wy378we@!#!$!$%^!&$%^$!&%^$!$$!CTYFTFTfgyfgyfgyfGHGHJFGHYcxfg",
    {
      expiresIn: "1h",
    }
  );
};

export default generateToken;