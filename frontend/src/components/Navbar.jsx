import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Store, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";

const Navbar = () => {
	const { user, logout, requestSellerAccess, loading: userStoreLoading } = useUserStore();
	const isPrivilegedUser = user?.role === "admin" || user?.role === "seller";
	const isRegularVerifiedUser = user?.role === "user" && user?.isVerified;
	const { cart } = useCartStore();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const isSellerRequestPending = user?.sellerRequestStatus === "pending";
	const canRequestAgain = user?.sellerRequestExpires ? new Date(user.sellerRequestExpires) < new Date() : true;
	const disableRequestButton = userStoreLoading || (isSellerRequestPending && !canRequestAgain);

	const getRemainingTimeMessage = (expiryDate) => {
		if (!expiryDate || new Date(expiryDate) < new Date()) return "";
		const remainingTimeMillis = new Date(expiryDate).getTime() - Date.now();
		const remainingDays = Math.ceil(remainingTimeMillis / (1000 * 60 * 60 * 24));
		return `(Can request again in ${remainingDays} day${remainingDays > 1 ? "s" : ""})`;
	};

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900/60 backdrop-blur-md shadow-sm z-50 border-b border-gray-100'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16 md:h-20'>
					<Link to='/' className='text-2xl md:text-3xl font-bold text-emerald-500 flex-shrink-0'>
						E-Store
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center gap-2 lg:gap-4'>
						{user && (
							<Link to={"/cart"} className='relative p-2 text-white/90 hover:text-emerald-600 transition-colors'>
								<ShoppingCart size={24} />
								{cart.length > 0 && (
									<span className='absolute top-0 right-0 bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold'>
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{isPrivilegedUser && (
							<Link
								className='flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition duration-300'
								to={"/secret-dashboard"}
							>
								<Lock size={18} /> Dashboard
							</Link>
						)}

						{isRegularVerifiedUser && (
							<>
								{(!isSellerRequestPending || canRequestAgain) && (
									<button
										onClick={requestSellerAccess}
										disabled={disableRequestButton}
										className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300 ${
											disableRequestButton ? "opacity-50 cursor-not-allowed" : ""
										}`}
										title={
											isSellerRequestPending
												? `Request already sent. ${getRemainingTimeMessage(user.sellerRequestExpires)}`
												: "Request to become a seller"
										}
									>
										<Store className='h-4 w-4' /> Become a Seller
									</button>
								)}
								{isSellerRequestPending && !canRequestAgain && (
									<span className='flex items-center text-gray-500 text-sm px-3 py-1'>Request Pending</span>
								)}
							</>
						)}

						{!user ? (
							<div className="flex items-center gap-2">
								<Link
									to={"/login"}
									className='bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center transition duration-300 text-sm font-medium'
								>
									<LogIn className='mr-2' size={18} /> Login
								</Link>
								<Link
									to={"/signup"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 text-sm font-medium'
								>
									<UserPlus className='mr-2' size={18} /> Sign Up
								</Link>
							</div>
						) : (
							<button
								className='bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center transition duration-300 text-sm font-medium'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden lg:inline ml-2'>Log Out</span>
							</button>
						)}
					</nav>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex items-center gap-2'>
						{user && (
							<Link to={"/cart"} className='relative p-2 text-gray-600 hover:text-emerald-600'>
								<ShoppingCart size={20} />
								{cart.length > 0 && (
									<span className='absolute top-0 right-0 bg-emerald-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs'>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='p-2'>
							{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className='md:hidden border-t border-gray-100 py-4 space-y-3'>
						{isPrivilegedUser && (
							<Link
								className='block bg-gray-800 text-white px-4 py-2 rounded-lg font-medium'
								to={"/secret-dashboard"}
								onClick={() => setMobileMenuOpen(false)}
							>
								Dashboard
							</Link>
						)}
						{isRegularVerifiedUser && !isSellerRequestPending && (
							<button
								onClick={() => {
									requestSellerAccess();
									setMobileMenuOpen(false);
								}}
								className='w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg font-medium'
							>
								Become a Seller
							</button>
						)}
						{!user ? (
							<>
								<Link
									to={"/login"}
									className='block bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium'
									onClick={() => setMobileMenuOpen(false)}
								>
									Login
								</Link>
								<Link
									to={"/signup"}
									className='block bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium'
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign Up
								</Link>
							</>
						) : (
							<button onClick={logout} className='w-full text-left bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium'>
								Log Out
							</button>
						)}
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;