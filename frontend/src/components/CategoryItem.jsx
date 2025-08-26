// src/components/CategoryItem.jsx

import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryItem.css';

const CategoryItem = ({ category }) => {
    const linkRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault(); // Stop the link from navigating instantly

        const link = linkRef.current;
        if (!link) return;

        const rect = link.getBoundingClientRect();
        
        // Create and position the ripple span
        const ripple = document.createElement('span');
        const diameter = Math.max(link.clientWidth, link.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');
        
        // Clear any previous ripples before adding a new one
        const existingRipple = link.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        link.appendChild(ripple);

        // Delay navigation to let the ripple effect be visible
        setTimeout(() => {
            navigate("/category" + category.href);
        }, 300);
    };

    return (
        <a 
            href={"/category" + category.href} 
            className="living-orb-link"
            ref={linkRef}
            onClick={handleClick}
        >
            <div className="orb-container">
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="category-image"
                    loading="lazy"
                />
                <h3 className="orb-text">{category.name}</h3>
            </div>
        </a>
    );
};

export default CategoryItem;