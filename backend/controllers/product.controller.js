import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

/* =========================
   READ
========================= */

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({})
			.populate("seller", "name")
			.lean();
		res.json({ products });
	} catch (error) {
		console.error("getAllProducts:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getSellerProducts = async (req, res) => {
	try {
		const products = await Product.find({ seller: req.user._id }).lean();
		res.json({ products });
	} catch (error) {
		console.error("getSellerProducts:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		const products = await Product.find({ isFeatured: true }).lean();
		res.json(products);
	} catch (error) {
		console.error("getFeaturedProducts:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{ $sample: { size: 4 } },
			{
				$project: {
					name: 1,
					price: 1,
					image: 1,
					description: 1,
				},
			},
		]);
		res.json(products);
	} catch (error) {
		console.error("getRecommendedProducts:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const getProductsByCategory = async (req, res) => {
	try {
		const products = await Product.find({
			category: req.params.category,
		}).lean();
		res.json({ products });
	} catch (error) {
		console.error("getProductsByCategory:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

/* =========================
   WRITE
========================= */

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		let imageUrl = "";
		if (image) {
			const uploaded = await cloudinary.uploader.upload(image, {
				folder: "products",
			});
			imageUrl = uploaded.secure_url;
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: imageUrl,
			category,
			seller: req.user._id,
		});

		res.status(201).json(product);
	} catch (error) {
		console.error("createProduct:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (
			product.seller.toString() !== req.user._id.toString() &&
			req.user.role !== "admin"
		) {
			return res.status(403).json({ message: "Not authorized" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(`products/${publicId}`);
		}

		await product.deleteOne();
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("deleteProduct:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		product.isFeatured = !product.isFeatured;
		await product.save();

		res.json(product);
	} catch (error) {
		console.error("toggleFeaturedProduct:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

/* =========================
   CACHE COMPATIBILITY (NO-OP)
========================= */

export const clearFeaturedProductsCache = async (req, res) => {
	try {
		// Redis removed — endpoint kept for backward compatibility
		res.status(200).json({
			message: "Featured products cache cleared (no cache in use)",
		});
	} catch (error) {
		console.error("clearFeaturedProductsCache:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};
