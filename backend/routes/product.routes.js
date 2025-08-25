import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
	getSellerProducts,
	clearFeaturedProductsCache,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute, sellerOrAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//public routes
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);

// --- Admin Only Routes ---
router.get("/", protectRoute, adminRoute, getAllProducts); // Admin gets all products
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct); // ONLY Admin can feature

// --- Seller & Admin Routes ---
router.post("/", protectRoute, sellerOrAdminRoute, createProduct); // Seller & Admin can create
router.delete("/:id", protectRoute, sellerOrAdminRoute, deleteProduct); // Seller & Admin can delete

// --- Route for Sellers ---
router.get("/my-products", protectRoute, sellerOrAdminRoute, getSellerProducts);

router.delete("/featured/cache", protectRoute, adminRoute, clearFeaturedProductsCache);

export default router;