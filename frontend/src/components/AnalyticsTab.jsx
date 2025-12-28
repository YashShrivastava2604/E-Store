import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, IndianRupee } from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner";
import { useUserStore } from "../stores/useUserStore";

const AnalyticsTab = () => {
	const { user } = useUserStore();
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const isSeller = user?.role === "seller";
				const isAdmin = user?.role === "admin";

				// Determine endpoint based on user role
				const endpoint = isSeller ? "/analytics/seller" : "/analytics";
				const response = await axios.get(endpoint);

				const analytics = response.data.analyticsData || response.data.analytics;
				let daily = response.data.dailySalesData || response.data.daily || [];

				// Map daily sales data with proper field names
				daily = daily.map((d, idx) => {
					const name = d.name || d.date || `Day ${idx + 1}`;
					const sales = Number(d.sales ?? d.count ?? d.orders ?? 0);
					const revenue = Number(d.revenue ?? d.amount ?? d.total ?? 0);
					return {
						name,
						sales: isNaN(sales) ? 0 : sales,
						revenue: isNaN(revenue) ? 0 : revenue,
					};
				});

				setAnalyticsData({
					users: isSeller ? 0 : (analytics.users ?? analytics.totalUsers ?? 0), // Sellers don't see user count
					products: analytics.products ?? analytics.totalProducts ?? 0,
					totalSales: analytics.totalSales ?? analytics.sales ?? 0,
					totalRevenue: analytics.totalRevenue ?? analytics.revenue ?? 0,
				});
				setDailySalesData(daily);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, [user]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const hasDailyData = Array.isArray(dailySalesData) && dailySalesData.length > 0;
	const revenueMax = hasDailyData
		? Math.max(...dailySalesData.map((d) => d.revenue), 0)
		: 0;
	const salesMax = hasDailyData
		? Math.max(...dailySalesData.map((d) => d.sales), 0)
		: 0;

	const isAdmin = user?.role === "admin";
	const isSeller = user?.role === "seller";

	return (
		<div className='w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				{/* Show users only for admin */}
				{isAdmin && (
					<AnalyticsCard
						title='Total Users'
						value={analyticsData.users.toLocaleString()}
						icon={Users}
						color='emerald'
					/>
				)}

				<AnalyticsCard
					title={isSeller ? "My Products" : "Total Products"}
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='blue'
				/>

				<AnalyticsCard
					title={isSeller ? "Sales from My Products" : "Total Sales"}
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color='yellow'
				/>

				<AnalyticsCard
					title={isSeller ? "Revenue from My Products" : "Total Revenue"}
					value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
					icon={IndianRupee}
					color='red'
				/>
			</div>

			<motion.div
				className='bg-gray-50 rounded-lg p-6'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<h3 className='font-semibold text-lg text-gray-700 mb-4'>
					{isSeller ? "My Sales & Revenue (7 days)" : "Daily Sales & Revenue"}
				</h3>

				{!hasDailyData ? (
					<div className='text-center py-24 text-gray-500'>
						No sales data to display yet.
					</div>
				) : (
					<ResponsiveContainer width='100%' height={400}>
						<LineChart data={dailySalesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
							<CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
							<XAxis dataKey='name' stroke='#9ca3af' />
							<YAxis
								yAxisId='left'
								stroke='#9ca3af'
								allowDecimals={false}
								domain={[0, Math.max(1, Math.ceil(salesMax * 1.2))]}
							/>
							<YAxis
								yAxisId='right'
								orientation='right'
								stroke='#9ca3af'
								domain={[0, Math.max(1, Math.ceil(revenueMax * 1.1))]}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "white",
									border: "1px solid #e5e7eb",
									borderRadius: "0.5rem",
								}}
							/>
							<Legend />
							<Line
								yAxisId='left'
								type='monotone'
								dataKey='sales'
								stroke='#10B981'
								activeDot={{ r: 6 }}
								name='Sales'
							/>
							<Line
								yAxisId='right'
								type='monotone'
								dataKey='revenue'
								stroke='#3B82F6'
								activeDot={{ r: 6 }}
								name='Revenue'
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</motion.div>

			{/* Info box for sellers */}
			{isSeller && (
				<motion.div
					className='mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<p className='text-sm text-blue-800'>
						📊 <strong>Your Analytics:</strong> This tab shows only the sales and revenue from products you've created. 
						Admin can view global analytics across all sellers.
					</p>
				</motion.div>
			)}
		</div>
	);
};

const colorVariants = {
	emerald: "border-emerald-500",
	blue: "border-blue-500",
	yellow: "border-yellow-500",
	red: "border-red-500",
};

const iconColorVariants = {
	emerald: "text-emerald-500",
	blue: "text-blue-500",
	yellow: "text-yellow-500",
	red: "text-red-500",
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
	return (
		<motion.div
			className={`bg-white rounded-lg p-6 shadow-md border-t-4 ${colorVariants[color]}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex justify-between items-center'>
				<div>
					<p className='text-gray-500 text-sm mb-1 font-medium'>{title}</p>
					<h3 className='text-gray-900 text-3xl font-bold'>{value}</h3>
				</div>
				<div className={`p-3 rounded-full bg-gray-100 ${iconColorVariants[color]}`}>
					<Icon className='h-8 w-8' />
				</div>
			</div>
		</motion.div>
	);
};

export default AnalyticsTab;