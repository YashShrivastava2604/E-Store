import { BarChart, PlusCircle, ShoppingBasket, Users } from "lucide-react"; // Import Users icon
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import UsersTab from "../components/UsersTab"; // Import the new component
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore"; // Import useUserStore

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("products"); // Default to 'products' as it's common
    const { user } = useUserStore(); // Get current user from store
	const { fetchAdminProducts, fetchSellerProducts } = useProductStore();

    const isAdmin = user?.role === 'admin';
    const isSeller = user?.role === 'seller';

    // Dynamically define tabs based on user role
    const tabs = useMemo(() => {
        const commonTabs = [
            { id: "create", label: "Create Product", icon: PlusCircle },
            { id: "products", label: isSeller ? "My Products" : "All Products", icon: ShoppingBasket },
        ];
        if (isAdmin) {
            return [
                ...commonTabs,
                { id: "analytics", label: "Analytics", icon: BarChart },
                { id: "users", label: "Users", icon: Users }, // Admin-only tab
            ];
        }
        return commonTabs; // Sellers only see create and their products
    }, [isAdmin, isSeller]);

    // Adjust active tab if the current one is not available for the role
    useEffect(() => {
        // If the current activeTab is not found in the newly computed tabs,
        // or if an admin-only tab is selected by a seller, default to 'products'
        if (!tabs.some(t => t.id === activeTab) || (isSeller && (activeTab === 'analytics' || activeTab === 'users'))) {
            setActiveTab('products');
        }
    }, [tabs, activeTab, isSeller]); // Depend on tabs, activeTab, and isSeller


	useEffect(() => {
        // Fetch the correct set of products based on role
		if (isAdmin) {
            fetchAdminProducts();
        } else if (isSeller) {
            fetchSellerProducts();
        }
        // No fetching for regular users if they somehow reach here (App.jsx prevents this)
	}, [isAdmin, isSeller, fetchAdminProducts, fetchSellerProducts]); // Re-run when roles change or fetch functions change


	return (
		<div className='min-h-screen relative overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<motion.h1
					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Dynamic Dashboard Title */}
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
                
                {/* Conditional Rendering of Tab Content */}
				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList isAdmin={isAdmin} />} {/* Pass isAdmin to ProductsList */}
				{isAdmin && activeTab === "analytics" && <AnalyticsTab />}
                {isAdmin && activeTab === "users" && <UsersTab />} {/* Admin-only Users Tab */}
			</div>
		</div>
	);
};
export default AdminPage;