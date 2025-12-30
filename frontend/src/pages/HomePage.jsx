import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import jeans from '../images/jeans.jpg';
import tshirts from '../images/tshirts.jpg';
import glasses from '../images/glasses.jpg';
import jackets from '../images/jackets.jpg';
import suits from '../images/suits.jpg';

// const categories = [
// 	{ href: "/jeans", name: "Jeans", imageUrl: `${jeans}?w=300&h=300&fit=crop` },
// 	{ href: "/t-shirts", name: "T-shirts", imageUrl:`${tshirts}?w=300&h=300&fit=crop` },
// 	{ href: "/shoes", name: "Shoes", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" },
// 	{ href: "/glasses", name: "Glasses", imageUrl: `${glasses}?w=300&h=300&fit=crop` },
// 	{ href: "/jackets", name: "Jackets", imageUrl: `${jackets}?w=300&h=300&fit=crop` },
// 	{ href: "/suits", name: "Suits", imageUrl: `${suits}?w=300&h=300&fit=crop` },
// 	{ href: "/bags", name: "Bags", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" },
// ];

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl:"/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const { user } = useUserStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='w-full'>
			<section className='relative w-full py-20 md:py-32 overflow-hidden'>
				<div className='absolute inset-0 bg-black/10 backdrop-blur-3xl opacity-60' />

				<div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						className='text-center space-y-6 md:space-y-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
							Discover Your Style
						</h1>
						<p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto'>
							Premium fashion for everyone. Shop curated collections of clothing, shoes, and accessories designed for modern living.
						</p>

						<div className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>
							<motion.a
								href='#categories'
								className='inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Shop Now <ArrowRight size={20} />
							</motion.a>
							{!user && (
								<motion.a
									href='/signup'
									className='inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-200 transition-all'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Join Us <ArrowRight size={20} />
								</motion.a>
							)}
						</div>
					</motion.div>
				</div>
			</section>


			{/* ===== CATEGORIES SECTION ===== */}
			<section id='categories' className='w-full py-20 bg-gray-50/10'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<motion.div
						className='text-center mb-16'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>Shop by Category</h2>
						<p className='text-gray-600 text-lg'>Browse our handpicked collections</p>
					</motion.div>

					<motion.div
						className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, staggerChildren: 0.1 }}
						viewport={{ once: true }}
					>
						{categories.map((category, idx) => (
							<motion.div
								key={category.href}
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.05 }}
								viewport={{ once: true }}
							>
								<CategoryItem category={category} />
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			
			{/* ===== FEATURED PRODUCTS ===== */}
			<FeaturedProducts featuredProducts={products} />

			{/* ===== CTA SECTION ===== */}
			<motion.section
				className='w-full py-16 bg-emerald-600'
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
			>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>Ready to Transform Your Wardrobe?</h3>
					<p className='text-emerald-50 text-lg mb-6'>Join thousands of happy customers shopping at E-Store</p>
					{!user && (
						<motion.a
							href='/signup'
							className='inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
							whileHover={{ scale: 1.05 }}
						>
							Get Started
						</motion.a>
					)}
				</div>
			</motion.section>
		</div>
	);
};

export default HomePage;