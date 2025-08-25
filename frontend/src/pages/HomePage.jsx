import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SplineRobot from "../components/SplineRobot";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='bg-gray-100 text-gray-800'>
			<section className='relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-100'>
				<SplineRobot pageState='hero' />
				
				<motion.div
					className='relative z-10 text-center px-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className='text-5xl md:text-7xl font-extrabold text-gray-900 drop-shadow-lg'>
						The Future of Fashion
					</h1>
					<p className='mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto'>
						Discover cutting-edge trends and sustainable styles that redefine your wardrobe.
					</p>
					<motion.button 
						className='mt-8 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-700 transition-colors'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Shop Now
					</motion.button>
				</motion.div>

				<motion.div
					className='absolute bottom-10 z-10'
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
				>
					<ArrowDown className='text-gray-600 w-8 h-8' />
				</motion.div>
			</section>

			<section className='relative bg-white z-10 py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-center text-4xl sm:text-5xl font-bold text-gray-900 mb-4'>
						Explore Our Categories
					</h2>
					<p className='text-center text-lg text-gray-600 mb-12'>
						Discover the latest trends in eco-friendly fashion
					</p>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
						{categories.map((category) => (
							<CategoryItem category={category} key={category.name} />
						))}
					</div>
				</div>
			</section>

			{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
		</div>
	);
};
export default HomePage;