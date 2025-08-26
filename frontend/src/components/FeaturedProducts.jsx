// src/components/FeaturedProducts.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import './FeaturedProducts.css'; // Import our new styles

const FeaturedProducts = ({ featuredProducts = [] }) => {
    const [index, setIndex] = useState(0);
    const { addToCart } = useCartStore();

    const products = Array.isArray(featuredProducts) ? featuredProducts : [];
    const productsLength = products.length;

    // Use modulo for seamless looping
    const nextCard = () => {
        setIndex((prevIndex) => (prevIndex + 1) % productsLength);
    };

    const prevCard = () => {
        setIndex((prevIndex) => (prevIndex - 1 + productsLength) % productsLength);
    };

    if (productsLength === 0) return null;

    const getCardStyle = (i) => {
        const offset = i - index;
        const normalizedOffset = (offset + productsLength) % productsLength;

        if (normalizedOffset === 0) { // Center card
            return { x: '0%', scale: 1, zIndex: 3, opacity: 1 };
        }
        if (normalizedOffset === 1 || normalizedOffset === productsLength - 1) { // Side cards
            const x = normalizedOffset === 1 ? '60%' : '-60%';
            return { x, scale: 0.8, zIndex: 2, opacity: 0.6 };
        }
        if (normalizedOffset === 2 || normalizedOffset === productsLength - 2) { // Farther side cards
            const x = normalizedOffset === 2 ? '100%' : '-100%';
            return { x, scale: 0.6, zIndex: 1, opacity: 0.3 };
        }
        // Hidden cards
        return { scale: 0.5, zIndex: 0, opacity: 0 };
    };

    return (
        <section className="featured-products-container bg-black/10 backdrop-blur-[0.099999rem]">
            <h2 className='text-center text-4xl sm:text-5xl font-bold text-gray-800 mb-12'>
                Featured Collection
            </h2>

            <div className="carousel-viewport">
                <AnimatePresence initial={false}>
                    {products.map((product, i) => (
                        <motion.div
                            key={product._id}
                            className="carousel-product-card"
                            initial="initial"
                            animate={getCardStyle(i)}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(event, { offset }) => {
                                if (offset.x > 100) prevCard();
                                else if (offset.x < -100) nextCard();
                            }}
                        >
                            <ProductCardContent product={product} onAddToCart={addToCart} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {productsLength > 1 && <>
                    <div className="carousel-nav-arrow arrow-left" onClick={prevCard}>
                        <ArrowLeft size={24} />
                    </div>
                    <div className="carousel-nav-arrow arrow-right" onClick={nextCard}>
                        <ArrowRight size={24} />
                    </div>
                </>}
            </div>

            {productsLength > 1 && <div className="carousel-pagination">
                {products.map((_, i) => (
                    <div 
                        key={i} 
                        className={`pagination-dot ${i === index ? 'active' : ''}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>}
        </section>
    );
};

// Internal component for card content to keep the main component cleaner
const ProductCardContent = ({ product, onAddToCart }) => (
    <>
        <div className="card-image-container">
            <img src={product.image} alt={product.name} className='card-image' />
        </div>
        <div className='card-text-content'>
            <div>
                <h3 className='card-product-name'>{product.name}</h3>
                <p className='card-product-price'>
                    ${product.price?.toFixed(2) || '0.00'}
                </p>
            </div>
            <button
                onClick={() => onAddToCart(product)}
                className='card-add-to-cart-btn'
            >
                <ShoppingCart size={20} /> Add to Cart
            </button>
        </div>
    </>
);

export default FeaturedProducts;