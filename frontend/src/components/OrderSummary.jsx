import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
	"pk_test_51RhsiICumPwttJ1zscTvQU11LiAM255qH5DbnL2UH2oAkuzqaCdcTjFGLeoLrRFUbk4AWBeBStvfLE3xmIfk5XsQ00J38P9Mfm"
);

const OrderSummary = () => {
	const { total, subtotal, cart } = useCartStore();
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);

	const handlePayment = async () => {
		try {
			const stripe = await stripePromise;
			const res = await axios.post("/payments/create-checkout-session", { products: cart });
			const session = res.data;
			await stripe.redirectToCheckout({ sessionId: session.id });
		} catch (error) {
			console.error("Payment failed:", error);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-2xl border border-gray-200 bg-gray-50/10 backdrop-blur-md p-6 shadow-lg'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-gray-800'>Order summary</p>
			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-600'>Subtotal</dt>
						<dd className='text-base font-medium text-gray-900'>${formattedSubtotal}</dd>
					</dl>
					<dl className='flex items-center justify-between gap-4 pt-2 border-t border-gray-200'>
						<dt className='text-base font-bold text-gray-900'>Total</dt>
						<dd className='text-base font-bold text-emerald-600'>${formattedTotal}</dd>
					</dl>
				</div>
				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 shadow-md hover:shadow-lg focus:outline-none'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>
				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-500'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-500 hover:underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;