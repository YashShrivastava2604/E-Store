import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const FeaturedProducts = ({ featuredProducts }) => {
	const scrollContainer = useRef(null);

	const scroll = (direction) => {
		if (scrollContainer.current) {
			const scrollAmount = 320;
			scrollContainer.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	if (!featuredProducts || featuredProducts.length === 0) {
		return null;
	}

	return (
		<section className='w-full py-16 bg-gradient-to-br from-gray-50 to-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					className='mb-12'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Featured Collection</h2>
					<p className='text-gray-600 text-lg'>Handpicked items just for you</p>
				</motion.div>

				<div className='relative'>
					<motion.div
						ref={scrollContainer}
						className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
					>
						{featuredProducts.map((product, idx) => (
							<motion.div
								key={product._id}
								className='flex-shrink-0 w-full sm:w-80'
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ delay: idx * 0.1 }}
								viewport={{ once: true }}
							>
								<ProductCard product={product} />
							</motion.div>
						))}
					</motion.div>

					{/* Navigation Buttons */}
					{featuredProducts.length > 3 && (
						<>
							<motion.button
								onClick={() => scroll("left")}
								className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-2 rounded-full hover:bg-emerald-50 transition-colors z-10'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								<ChevronLeft size={24} className='text-emerald-600' />
							</motion.button>
							<motion.button
								onClick={() => scroll("right")}
								className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg p-2 rounded-full hover:bg-emerald-50 transition-colors z-10'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								<ChevronRight size={24} className='text-emerald-600' />
							</motion.button>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;