// src/pages/HomePage.jsx

import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import "../components/Hero.css";
import "../components/CategoryItem.css";

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
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0" />

        <div className="hero-container relative z-10">
          <div className="hero-text-content">
            <h1 className="hero-headline">Dress for the Moment.</h1>

            <p className="hero-subheadline">
              Welcome to E-Store, your destination for high-quality fashion.
              Explore curated collections of apparel, shoes, and accessories
              designed to last.
            </p>

            <a href="#categories" className="hero-cta">
              Explore Collections
            </a>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      {/* ================= CATEGORIES (REDESIGNED) ================= */}
		<section
		id="categories"
		className="relative z-10 py-20 bg-gray-50 border-t border-gray-200"
		>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 className="text-center text-4xl font-semibold text-gray-900 mb-4">
			Curated for Your Lifestyle
			</h2>

			<p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
			Everyday essentials crafted with quality, comfort, and timeless style.
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{categories.map((category) => (
				<a
				key={category.name}
				href={`/category${category.href}`}
				className="group block bg-white border border-gray-200 rounded-lg overflow-hidden"
				>
				{/* Image */}
				<div className="aspect-[4/5] bg-gray-100 overflow-hidden">
					<img
					src={category.imageUrl}
					alt={category.name}
					className="w-full h-full object-cover"
					loading="lazy"
					/>
				</div>

				{/* Text */}
				<div className="p-4">
					<h3 className="text-lg font-medium text-gray-900">
					{category.name}
					</h3>
					<p className="text-sm text-gray-500 mt-1">
					Explore collection
					</p>
				</div>
				</a>
			))}
			</div>
		</div>
		</section>


      {/* ================= FEATURED PRODUCTS ================= */}
      {!isLoading && products.length > 0 && (
        <FeaturedProducts featuredProducts={products} />
      )}
    </div>
  );
};

export default HomePage;
