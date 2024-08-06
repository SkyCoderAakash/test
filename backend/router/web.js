import express from 'express';
import { register, login, logout, verifyUser, changePassword } from '../controller/userController.js';
import verifyToken from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/productController.js';

const router = express.Router();

router.post("/api/v1/register", register);
router.post("/api/v1/login", login);
router.get("/api/v1/logout", logout);
router.get("/api/v1/verify", verifyToken, verifyUser);
router.post("/api/v1/change-password", changePassword);

router.post("/api/v1/products", createProduct);
router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:id", getProductById);
router.put("/api/v1/products/:id", updateProduct);
router.delete("/api/v1/products/:id", deleteProduct);

export default router;
