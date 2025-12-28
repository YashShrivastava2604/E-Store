import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.accessToken;
		if (!token) {
			return res.status(401).json({ message: "Not authenticated" });
		}

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Access token expired" });
		}
		console.error("Auth middleware error:", error.message);
		return res.status(401).json({ message: "Invalid token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user.role === "admin") return next();
	return res.status(403).json({ message: "Admin access required" });
};

export const sellerRoute = (req, res, next) => {
	if (req.user.role === "seller") return next();
	return res.status(403).json({ message: "Seller access required" });
};

export const sellerOrAdminRoute = (req, res, next) => {
	if (["seller", "admin"].includes(req.user.role)) return next();
	return res.status(403).json({ message: "Seller or Admin access required" });
};
