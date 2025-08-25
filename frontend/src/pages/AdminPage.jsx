import { BarChart, PlusCircle, ShoppingBasket, Users } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import UsersTab from "../components/UsersTab";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("products");
	const { user } = useUserStore();
	const { fetchAdminProducts, fetchSellerProducts } = useProductStore();

	const isAdmin = user?.role === "admin";
	const isSeller = user?.role === "seller";

	const tabs = useMemo(() => {
		const commonTabs = [
			{ id: "create", label: "Create Product", icon: PlusCircle },
			{ id: "products", label: isSeller ? "My Products" : "All Products", icon: ShoppingBasket },
		];
		if (isAdmin) {
			return [
				...commonTabs,
				{ id: "analytics", label: "Analytics", icon: BarChart },
				{ id: "users", label: "Users", icon: Users },
			];
		}
		return commonTabs;
	}, [isAdmin, isSeller]);

	useEffect(() => {
		if (!tabs.some((t) => t.id === activeTab) || (isSeller && (activeTab === "analytics" || activeTab === "users"))) {
			setActiveTab("products");
		}
	}, [tabs, activeTab, isSeller]);

	useEffect(() => {
		if (isAdmin) {
			fetchAdminProducts();
		} else if (isSeller) {
			fetchSellerProducts();
		}
	}, [isAdmin, isSeller, fetchAdminProducts, fetchSellerProducts]);

	return (
		<div className='min-h-screen bg-gray-100 py-10'>
			<div className='container mx-auto px-4'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-gray-800 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{isAdmin ? "Admin Dashboard" : "Seller Dashboard"}
				</motion.h1>

				<div className='flex justify-center flex-wrap gap-2 mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
								activeTab === tab.id
									? "bg-emerald-600 text-white shadow-md"
									: "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>

				<div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl">
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList isAdmin={isAdmin} />}
					{isAdmin && activeTab === "analytics" && <AnalyticsTab />}
					{isAdmin && activeTab === "users" && <UsersTab />}
				</div>
			</div>
		</div>
	);
};
export default AdminPage;