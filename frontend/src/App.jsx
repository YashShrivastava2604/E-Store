import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
	const { user, checkAuth, checkingAuth, setNavigate } = useUserStore();
	const { getCartItems } = useCartStore();
    const navigate = useNavigate();

	useEffect(() => {
		// Set the navigate function in the user store so it can be used anywhere
		setNavigate(navigate);
		// Check auth status on initial load
		checkAuth();
	}, [setNavigate, navigate, checkAuth]);

	useEffect(() => {
		if (user) {
			// Only fetch cart if user is logged in
			getCartItems();
		}
	}, [getCartItems, user]);


	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<Navbar />
				<Routes>
					<Route path='/' element={<HomePage />} />
					
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />

                    <Route
                        path="/verify-email"
						// Protect this route: only accessible if no user is logged in but an email is pending verification
                        element={!user && localStorage.getItem("pendingEmail") ? <VerifyEmailPage /> : <Navigate to="/signup" />}
                    />

					{/* Dashboard accessible by Admin or Seller */}
					<Route
						path='/secret-dashboard'
						element={
							user?.role === "admin" || user?.role === "seller" ? (
								<AdminPage />
							) : (
								<Navigate to='/login' />
							)
						}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />
					
					{/* Cart and purchase pages require user to be logged in */}
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;