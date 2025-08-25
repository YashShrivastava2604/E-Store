import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='py-8 md:py-16 bg-gray-100'>
			<div className='container mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<motion.h1
					className='text-3xl sm:text-4xl font-bold text-gray-800 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					Your Shopping Cart
				</motion.h1>

				<div className='lg:flex lg:items-start lg:gap-8'>
					<motion.div
						className='w-full flex-none lg:max-w-3xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className='space-y-6 bg-white p-6 rounded-2xl shadow-lg'>
								{cart.map((item, index) => (
									<CartItem
										key={item._id}
										item={item}
										isLastItem={index === cart.length - 1}
									/>
								))}
							</div>
						)}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mt-6 w-full flex-1 space-y-6 lg:mt-0'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
						</motion.div>
					)}
				</div>
				{cart.length > 0 && <PeopleAlsoBought />}
			</div>
		</div>
	);
};
export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16 bg-white rounded-2xl shadow-lg'
		initial={{ opacity: 0, scale: 0.95 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold text-gray-800'>Your cart is empty</h3>
		<p className='text-gray-500'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold transition-colors hover:bg-emerald-700 shadow-md hover:shadow-lg'
			to='/'
		>
			Start Shopping
		</Link>
	</motion.div>
);