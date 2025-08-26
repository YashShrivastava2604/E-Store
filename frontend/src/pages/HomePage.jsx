// src/pages/HomePage.jsx

import { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import ScrollFloatWrapper from "../components/ScrollFloatWrapper"; // Import our new animation wrapper
import '../components/Hero.css';
import '../components/CategoryItem.css';

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
		<div>
			{/* --- Grounded Hero Section (Unchanged) --- */}
			<section className='relative w-full h-screen flex items-center justify-center overflow-hidden'>
                <div className="absolute inset-0 bg-black/10  z-0"></div>
				<div className="hero-container">
                    <motion.div 
                        className="hero-text-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <h1 className="hero-headline">Dress for the Moment.</h1>
                        <p className="hero-subheadline">
                            Welcome to E-Store, your destination for high-quality fashion. Explore our curated collections of apparel, shoes, and accessories and discover pieces you'll love for years to come.
                        </p>
                        <a href="#categories" className="hero-cta">Explore Collections</a>
                    </motion.div>
                </div>
			</section>

			{/* --- Category Section with Scroll Float Animation on the Orbs --- */}
			<section id="categories" className='relative z-10 py-24 bg-white/10 backdrop-blur-[0.099rem] border-t border-b border-white/40 overflow-hidden'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {/* The headings are now simple and clean */}
                    <h2 className='text-center text-4xl sm:text-5xl font-bold text-gray-800 mb-6'>
                        Curated for Your Lifestyle
                    </h2>
					<p className='text-center text-lg text-gray-500 mb-20 max-w-3xl mx-auto'>
						Timeless staples and modern essentials. Discover a collection where quality craftsmanship and contemporary design meet.
					</p>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20'>
						{categories.map((category, index) => (
							// Each CategoryItem is wrapped to handle its own scroll-in animation
                            <ScrollFloatWrapper key={category.name} index={index}>
							    <CategoryItem category={category} />
                            </ScrollFloatWrapper>
						))}
					</div>
				</div>
			</section>

			{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
		</div>
	);
};

export default HomePage;