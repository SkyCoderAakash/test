import apiResponce from "../utils/apiResponce.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(apiResponce(false, 400, "Fill data properly", []));
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json(apiResponce(false, 400, "User already exists", []));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email: email.toLowerCase(), password: hashPassword });
    const newUser = await user.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(201).json(apiResponce(true, 201, "User created successfully", { token }));
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json(apiResponce(false, 500, "Internal server error", []));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(apiResponce(false, 400, "Fill data properly", []));
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json(apiResponce(false, 400, "Invalid credentials", []));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json(apiResponce(false, 400, "Invalid credentials", []));
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(200).json(apiResponce(true, 200, "Login successful", { token }));
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json(apiResponce(false, 500, "Internal server error", []));
  }
};

const logout = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json(apiResponce(false, 400, "User is already logged out", []));
    }

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: "strict",
    });

    return res.status(200).json(apiResponce(true, 200, "Logout successful", []));
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json(apiResponce(false, 500, "Internal server error", []));
  }
};

const verifyUser = (req, res) => {
  try {
    return res.status(200).json(apiResponce(true, 200, "User verified", []));
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json(apiResponce(false, 500, "Internal server error", []));
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(apiResponce(false, 400, "Fill data properly", []));
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json(apiResponce(false, 400, "User not found", []));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: "strict",
    });

    return res.status(200).json(apiResponce(true, 200, "Password changed successfully and user logged out", []));
  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json(apiResponce(false, 500, "Internal server error", []));
  }
};


export { register, login, logout, verifyUser, changePassword };
