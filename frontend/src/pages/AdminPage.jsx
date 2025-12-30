import { useState, useEffect, useMemo } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useProductStore } from "../stores/useProductStore";
import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import UsersTab from "../components/UsersTab";
import { BarChart3, PlusCircle, ShoppingBasket, Users } from "lucide-react";

const AdminPage = () => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("products");
  const { fetchAdminProducts, fetchSellerProducts } = useProductStore();

  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";

  const tabs = useMemo(() => {
    const baseTabs = [
      { id: "create", label: "Create Product", icon: PlusCircle },
      {
        id: "products",
        label: isSeller ? "My Products" : "All Products",
        icon: ShoppingBasket,
      },
      { id: "analytics", label: "Analytics", icon: BarChart3 }, // visible to both
    ];

    if (isAdmin) {
      return [
        ...baseTabs,
        { id: "users", label: "Users", icon: Users }, // admin only
      ];
    }

    return baseTabs; // seller: no Users tab
  }, [isAdmin, isSeller]);

  // Reset active tab if it's no longer available
  useEffect(() => {
    if (!tabs.some((t) => t.id === activeTab)) {
      setActiveTab("products");
    }
  }, [tabs, activeTab]);

  // Fetch products on mount
  useEffect(() => {
    if (isAdmin) {
      fetchAdminProducts();
    } else if (isSeller) {
      fetchSellerProducts();
    }
  }, [isAdmin, isSeller, fetchAdminProducts, fetchSellerProducts]);

  // Protect route - only admin and seller can access
  if (!isAdmin && !isSeller) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Access Denied</h1>
          <p className='text-gray-600'>
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50/50 backdrop-blur-md py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            {isAdmin ? "Admin Dashboard" : "Seller Dashboard"}
          </h1>
          <p className='text-gray-600'>Manage your business</p>
        </div>

        {/* Tab Navigation */}
        <div className='bg-white rounded-lg shadow-md p-4 mb-8 overflow-x-auto'>
          <div className='flex gap-2 md:gap-4 justify-start md:justify-center'>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          {/* Create Product Tab */}
          {activeTab === "create" && <CreateProductForm />}

          {/* Products Tab */}
          {activeTab === "products" && <ProductsList isAdmin={isAdmin} />}

          {/* Analytics Tab (Admin + Seller, data filtered inside AnalyticsTab) */}
          {activeTab === "analytics" && <AnalyticsTab />}

          {/* Users Tab (Admin Only) */}
          {activeTab === "users" && isAdmin && <UsersTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
