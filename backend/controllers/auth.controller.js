import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

/* =========================
   TOKEN HELPERS
========================= */

const generateTokens = (userId) => {
	try {
		const accessToken = jwt.sign(
			{ userId },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);

		const refreshToken = jwt.sign(
			{ userId },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "7d" }
		);

		return { accessToken, refreshToken };
	} catch (error) {
		throw new Error("Token generation failed");
	}
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		maxAge: 15 * 60 * 1000,
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};

/* =========================
   AUTH CONTROLLERS
========================= */

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		await User.create({
			name,
			email,
			password,
			otp,
			otpExpires: Date.now() + 10 * 60 * 1000,
		});

		await sendEmail(
			email,
			"Verify your email - OTP",
			`<h2>Your OTP is <b>${otp}</b></h2><p>Valid for 10 minutes</p>`
		);

		res.status(201).json({ message: "OTP sent to your email. Please verify." });
	} catch (error) {
		console.error("Signup error:", error.message);
		res.status(500).json({ message: "Signup failed" });
	}
};

export const verifyOtp = async (req, res) => {
	try {
		const { email, otp } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
			return res.status(400).json({ message: "Invalid or expired OTP" });
		}

		user.isVerified = true;
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();

		const { accessToken, refreshToken } = generateTokens(user._id);
		setCookies(res, accessToken, refreshToken);

		res.json({
			message: "Verified successfully",
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				isVerified: true,
			},
		});
	} catch (error) {
		console.error("Verify OTP error:", error.message);
		res.status(500).json({ message: "OTP verification failed" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		if (!user.isVerified) {
			return res.status(403).json({ message: "Please verify your email first" });
		}

		const { accessToken, refreshToken } = generateTokens(user._id);
		setCookies(res, accessToken, refreshToken);

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			isVerified: true,
		});
	} catch (error) {
		console.error("Login error:", error.message);
		res.status(500).json({ message: "Login failed" });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const token = req.cookies.refreshToken;
		if (!token) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

		const accessToken = jwt.sign(
			{ userId: decoded.userId },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.error("Refresh token error:", error.message);
		res.status(401).json({ message: "Session expired. Please login again." });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Logout error:", error.message);
		res.status(500).json({ message: "Logout failed" });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch profile" });
	}
};

/* =========================
   ADMIN / USER MGMT
========================= */

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).select("-password");
		res.json({ users });
	} catch (error) {
		console.error("Get users error:", error.message);
		res.status(500).json({ message: "Failed to fetch users" });
	}
};

export const setUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		if (!["user", "seller", "admin"].includes(role)) {
			return res.status(400).json({ message: "Invalid role" });
		}

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ role },
			{ new: true }
		).select("-password");

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({
			message: `User role updated to ${role}`,
			user: updatedUser,
		});
	} catch (error) {
		console.error("Set role error:", error.message);
		res.status(500).json({ message: "Failed to update role" });
	}
};

export const requestSellerAccess = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (user.role !== "user") {
			return res.status(400).json({ message: "Only users can request seller access" });
		}

		if (
			user.sellerRequestStatus === "pending" &&
			user.sellerRequestExpires &&
			new Date() < user.sellerRequestExpires
		) {
			return res.status(400).json({ message: "Request already pending" });
		}

		user.sellerRequestStatus = "pending";
		user.sellerRequestExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		await user.save();

		const safeUser = await User.findById(user._id).select("-password");

		res.json({
			message: "Seller access request submitted",
			user: safeUser,
		});
	} catch (error) {
		console.error("Seller request error:", error.message);
		res.status(500).json({ message: "Failed to request seller access" });
	}
};
