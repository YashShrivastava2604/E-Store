import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// ============ GLOBAL ANALYTICS (ADMIN ONLY) ============

export const getAnalyticsData = async () => {
	const totalUsers = await User.countDocuments();
	const totalProducts = await Product.countDocuments();
	
	const salesData = await Order.aggregate([
		{
			$group: {
				_id: null, // groups all documents together
				totalSales: { $sum: 1 },
				totalRevenue: { $sum: "$totalAmount" },
			},
		},
	]);
	
	const { totalSales = 0, totalRevenue = 0 } = salesData[0] || {};
	
	return {
		users: totalUsers,
		products: totalProducts,
		totalSales,
		totalRevenue,
	};
};

export const getDailySalesData = async (startDate, endDate) => {
	try {
		const dailySalesData = await Order.aggregate([
			{
				$match: {
					createdAt: { $gte: startDate, $lte: endDate },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
					},
					sales: { $sum: 1 },
					revenue: { $sum: "$totalAmount" },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);
		
		const dateArray = getDatesInRange(startDate, endDate);
		
		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);
			return {
				date,
				sales: foundData?.sales || 0,
				revenue: foundData?.revenue || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

// ============ SELLER ANALYTICS (SELLERS ONLY) ============

// Get seller's products and sales count
export const getSellerAnalyticsData = async (sellerId) => {
	try {
		// Count products sold BY this seller
		const sellerProducts = await Product.countDocuments({ seller: sellerId });
		
		// Count orders that include this seller's products
		const sellerOrders = await Order.aggregate([
			{
				$lookup: {
					from: "products",
					localField: "products.product",
					foreignField: "_id",
					as: "productDetails",
				},
			},
			{
				$match: {
					"productDetails.seller": sellerId,
				},
			},
			{
				$group: {
					_id: null,
					totalSales: { $sum: 1 }, // Count of orders
					totalRevenue: { $sum: "$totalAmount" },
				},
			},
		]);
		
		const { totalSales = 0, totalRevenue = 0 } = sellerOrders[0] || {};
		
		return {
			users: 0, // Sellers don't see total users
			products: sellerProducts,
			totalSales,
			totalRevenue,
		};
	} catch (error) {
		throw error;
	}
};

// Get daily sales data for a specific seller
export const getSellerDailySalesData = async (sellerId, startDate, endDate) => {
	try {
		const dailySalesData = await Order.aggregate([
			{
				$lookup: {
					from: "products",
					localField: "products.product",
					foreignField: "_id",
					as: "productDetails",
				},
			},
			{
				$match: {
					createdAt: { $gte: startDate, $lte: endDate },
					"productDetails.seller": sellerId,
				},
			},
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
					},
					sales: { $sum: 1 },
					revenue: { $sum: "$totalAmount" },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);
		
		const dateArray = getDatesInRange(startDate, endDate);
		
		return dateArray.map((date) => {
			const foundData = dailySalesData.find((item) => item._id === date);
			return {
				date,
				sales: foundData?.sales || 0,
				revenue: foundData?.revenue || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

// ============ HELPER FUNCTION ============

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);
	
	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}
	
	return dates;
}