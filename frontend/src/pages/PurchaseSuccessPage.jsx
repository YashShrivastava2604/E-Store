import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

	useEffect(() => {
		const handleResize = () => {
			setDimensions({ width: window.innerWidth, height: window.innerHeight });
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);


	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};
		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing your order...";
	if (error) return `Error: ${error}`;

	return (
		<div className='min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-100 p-4'>
			<Confetti
				width={dimensions.width}
				height={dimensions.height}
				gravity={0.1}
				recycle={false}
				numberOfPieces={300}
			/>

			<div className='max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center'>
				<div className='flex justify-center mb-4'>
					<CheckCircle className='text-emerald-500 w-20 h-20' />
				</div>
				<h1 className='text-3xl font-bold text-gray-800 mb-2'>
					Purchase Successful!
				</h1>

				<p className='text-gray-600 mb-6'>
					Thank you for your order. We are processing it now and you will receive an email confirmation shortly.
				</p>
				<div className='bg-gray-100 rounded-lg p-4 mb-6 text-left'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-sm text-gray-500'>Order number</span>
						<span className='text-sm font-semibold text-emerald-600'>#12345</span>
					</div>
					<div className='flex items-center justify-between'>
						<span className='text-sm text-gray-500'>Estimated delivery</span>
						<span className='text-sm font-semibold text-emerald-600'>3-5 business days</span>
					</div>
				</div>
				<div className='space-y-4'>
					<Link
						to={"/"}
						className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg'
					>
						Continue Shopping
						<ArrowRight className='ml-2' size={18} />
					</Link>
					<div className='flex items-center justify-center'>
						<HandHeart className='mr-2 text-gray-500' size={18} />
						<p className='text-gray-500'>Thanks for trusting us!</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;