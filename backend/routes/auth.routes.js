import express from "express";
import { login, logout, signup, refreshToken, getProfile, setUserRole, getAllUsers  } from "../controllers/auth.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);
router.get("/users", protectRoute, adminRoute, getAllUsers);
router.patch("/users/:id/role", protectRoute, adminRoute, setUserRole);

export default router;