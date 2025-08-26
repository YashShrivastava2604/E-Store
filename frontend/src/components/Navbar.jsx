import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout, requestSellerAccess, loading: userStoreLoading } = useUserStore();
	const isPrivilegedUser = user?.role === "admin" || user?.role === "seller";
	const isRegularVerifiedUser = user?.role === "user" && user?.isVerified;
	const { cart } = useCartStore();

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
		<header className='fixed top-0 left-0 w-full bg-white/10 backdrop-blur-sm shadow-sm z-50'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-20'>
					<Link to='/#categories' className='text-3xl font-bold text-emerald-600'>
						E-Store
					</Link>

					<nav className='flex items-center gap-2 md:gap-4'>
						{user && (
							<Link to={"/cart"} className='relative p-2 text-gray-600 hover:text-emerald-600 transition-colors'>
								<ShoppingCart size={24} />
								{cart.length > 0 && (
									<span className='absolute top-0 right-0 bg-emerald-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs'>
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{isPrivilegedUser && (
							<Link
								className='hidden sm:flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out'
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
										className={`hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium
                                            transition duration-300 ease-in-out
                                            ${disableRequestButton ? "opacity-50 cursor-not-allowed" : ""}`}
										title={ isSellerRequestPending ? `Request already sent. ${getRemainingTimeMessage(user.sellerRequestExpires)}` : "Request to become a seller" }
									>
										<Store className='h-4 w-4' /> Become a Seller
									</button>
								)}
								{isSellerRequestPending && !canRequestAgain && (
									<span className='hidden sm:flex items-center text-gray-500 text-sm px-3 py-1'>Request Pending</span>
								)}
							</>
						)}

						{!user ? (
							<div className="flex items-center gap-2">
								<Link
									to={"/login"}
									className='bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out text-sm font-medium'
								>
									<LogIn className='mr-2' size={18} /> Login
								</Link>
								<Link
									to={"/signup"}
									className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out text-sm font-medium'
								>
									<UserPlus className='mr-2' size={18} /> Sign Up
								</Link>
							</div>
						) : (
							<button
								className='bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out text-sm font-medium'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;