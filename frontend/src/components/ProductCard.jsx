import { ShoppingCart, Star } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = async () => {
		if (!user) {
			toast.error("Please login to add items to cart");
			return;
		}
		try {
			await addToCart(product._id);
			toast.success("Added to cart!");
		} catch (error) {
			toast.error("Failed to add item");
		}
	};

	return (
		<motion.div
			className='bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden h-full flex flex-col'
			whileHover={{ y: -4 }}
			transition={{ duration: 0.3 }}
		>
			{/* Image Container */}
			<div className='relative overflow-hidden h-48 sm:h-56 bg-gray-100 group'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
					loading="lazy"
				/>
				{product.isFeatured && (
					<div className='absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
						Featured
					</div>
				)}
			</div>

			{/* Content */}
			<div className='p-4 flex-1 flex flex-col'>
				<h3 className='font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 hover:text-emerald-600'>
					{product.name}
				</h3>

				<p className='text-gray-600 text-xs sm:text-sm line-clamp-2 flex-1 mb-3'>
					{product.description}
				</p>

				{/* Rating */}
				<div className='flex items-center gap-1 mb-3'>
					<div className='flex gap-0.5'>
						{[...Array(5)].map((_, i) => (
							<Star key={i} size={14} className='fill-yellow-400 text-yellow-400' />
						))}
					</div>
					<span className='text-xs text-gray-500'>(128)</span>
				</div>

				{/* Price and Button */}
				<div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-100'>
					<div className='text-lg sm:text-xl font-bold text-emerald-600'>
						₹{Math.round(product.price)}
					</div>
					<motion.button
						onClick={handleAddToCart}
						className='bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						title="Add to cart"
					>
						<ShoppingCart size={18} />
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;