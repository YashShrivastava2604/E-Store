import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-100 p-4'>
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden'
			>
				<div className='p-8 text-center'>
					<div className='flex justify-center mb-4'>
						<XCircle className='text-red-500 w-20 h-20' />
					</div>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>Purchase Cancelled</h1>
					<p className='text-gray-600 mb-6'>
						Your order has been cancelled. No charges have been made.
					</p>
					<div className='bg-gray-100 rounded-lg p-4 mb-6'>
						<p className='text-sm text-gray-500'>
							If you encountered any issues during the checkout process, please don&apos;t hesitate to
							contact our support team.
						</p>
					</div>
					<Link
						to={"/"}
						className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg'
					>
						<ArrowLeft className='mr-2' size={20} />
						Return to Shop
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;