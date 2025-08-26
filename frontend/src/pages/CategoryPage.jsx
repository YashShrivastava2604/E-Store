import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryPage = () => {
	const { fetchProductsByCategory, products, isLoading } = useProductStore();
	const { category } = useParams();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='min-h-screen'>
			<div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					className='p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className='text-center text-4xl sm:text-5xl font-bold text-gray-800 mb-12'>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</h1>

					<motion.div
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, staggerChildren: 0.1 }}
					>
						{products?.length === 0 && (
							<div className='col-span-full text-center py-16'>
								<h2 className='text-2xl font-semibold text-gray-500'>No products found in this category.</h2>
							</div>
						)}

						{products?.map((product) => (
							<motion.div
								key={product._id}
								variants={{
									hidden: { opacity: 0, y: 20 },
									visible: { opacity: 1, y: 0 },
								}}
								initial='hidden'
								animate='visible'
							>
								<ProductCard product={product} />
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};
export default CategoryPage;