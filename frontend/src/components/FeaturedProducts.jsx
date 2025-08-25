import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const variants = {
	enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
	center: { zIndex: 1, x: 0, opacity: 1 },
	exit: (direction) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const FeaturedProducts = ({ featuredProducts = [] }) => {
	const [[page, direction], setPage] = useState([0, 0]);
	const { addToCart } = useCartStore();

	const products = Array.isArray(featuredProducts) ? featuredProducts : [];
	const productIndex = wrap(0, products.length, page);

	const paginate = (newDirection) => {
		setPage([page + newDirection, newDirection]);
	};

	if (products.length === 0) return null;

	return (
		<section className='bg-gray-100 py-20 overflow-hidden'>
			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='text-center text-4xl sm:text-5xl font-bold text-gray-900 mb-12'>Featured Collection</h2>
				<div className='relative h-[550px] w-full flex items-center justify-center'>
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={page}
							custom={direction}
							variants={variants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
							drag='x'
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={(e, { offset, velocity }) => {
								const swipe = swipePower(offset.x, velocity.x);
								if (swipe < -swipeConfidenceThreshold) paginate(1);
								else if (swipe > swipeConfidenceThreshold) paginate(-1);
							}}
							className='absolute w-[80%] md:w-[45%]'
						>
							<ProductCard product={products[productIndex]} onAddToCart={addToCart} />
						</motion.div>
					</AnimatePresence>
					<div
						className='absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors'
						onClick={() => paginate(1)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
					</div>
					<div
						className='absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors'
						onClick={() => paginate(-1)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
					</div>
				</div>
			</div>
		</section>
	);
};

const ProductCard = ({ product, onAddToCart }) => (
	<div className='bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6' style={{ aspectRatio: '3/4.5' }}>
		<div className="w-full h-2/3 overflow-hidden rounded-lg">
			<img src={product.image} alt={product.name} className='w-full h-full object-cover'/>
		</div>
		<div className='text-center mt-4 flex-grow flex flex-col justify-between'>
			<div>
				<h3 className='text-xl font-bold text-gray-900'>{product.name}</h3>
				<p className='text-lg font-semibold text-emerald-600 mt-1'>
					${product.price?.toFixed ? product.price.toFixed(2) : product.price}
				</p>
			</div>
			<button
				onClick={() => onAddToCart(product)}
				className='mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center'
			>
				<ShoppingCart className='w-5 h-5 mr-2' />
				Add to Cart
			</button>
		</div>
	</div>
);

export default FeaturedProducts;