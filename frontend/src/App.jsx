import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
	const { user, checkAuth, checkingAuth, setNavigate } = useUserStore();
	const { getCartItems } = useCartStore();
	const navigate = useNavigate();

	useEffect(() => {
		setNavigate(navigate);
		checkAuth();
	}, [setNavigate, navigate, checkAuth]);

	useEffect(() => {
		if (user) {
			getCartItems();
		}
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gray-100 text-gray-800 font-sans'>
			<Navbar />
			<main className='pt-20'>
				{" "}
				{/* Added pt-20 to push content below the fixed navbar */}
				<Routes>
					<Route path='/' element={<HomePage />} />

					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />

					<Route
						path='/verify-email'
						element={
							!user && localStorage.getItem("pendingEmail") ? <VerifyEmailPage /> : <Navigate to='/signup' />
						}
					/>

					<Route
						path='/secret-dashboard'
						element={
							user?.role === "admin" || user?.role === "seller" ? <AdminPage /> : <Navigate to='/login' />
						}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />

					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
				</Routes>
			</main>
			<Footer /> {/* Added a consistent footer */}
			<Toaster position='bottom-right' />
		</div>
	);
}

export default App;