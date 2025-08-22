import { BarChart, PlusCircle, ShoppingBasket, Users } from "lucide-react"; // Import Users icon
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import UsersTab from "../components/UsersTab"; // Import the new component
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore"; // Import user store

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
    const { user } = useUserStore(); // Get current user
	const { fetchAdminProducts, fetchSellerProducts } = useProductStore();

    const isAdmin = user?.role === 'admin';

    // Dynamically define tabs based on user role
    const tabs = useMemo(() => {
        const baseTabs = [
            { id: "create", label: "Create Product", icon: PlusCircle },
            { id: "products", label: "My Products", icon: ShoppingBasket },
        ];
        if (isAdmin) {
            return [
                ...baseTabs,
                { id: "analytics", label: "Analytics", icon: BarChart },
                { id: "users", label: "Users", icon: Users },
            ];
        }
        return baseTabs;
    }, [isAdmin]);

    // Set a default active tab if the current one is not available for the role
    useEffect(() => {
        if (!tabs.find(t => t.id === activeTab)) {
            setActiveTab('create');
        }
    }, [tabs, activeTab]);

	useEffect(() => {
        // Fetch the correct set of products based on role
		if (isAdmin) {
            fetchAdminProducts();
        } else {
            fetchSellerProducts();
        }
	}, [isAdmin, fetchAdminProducts, fetchSellerProducts]);

	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Dynamic Title */}
                    {isAdmin ? "Admin Dashboard" : "Seller Dashboard"}
				</motion.h1>

				<div className='flex justify-center flex-wrap mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 m-1 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-emerald-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
                
                {/* Conditional Rendering of Tabs */}
				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{isAdmin && activeTab === "analytics" && <AnalyticsTab />}
                {isAdmin && activeTab === "users" && <UsersTab />}
			</div>
		</div>
	);
};
export default AdminPage;