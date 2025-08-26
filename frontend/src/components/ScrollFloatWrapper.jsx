// src/components/ScrollFloatWrapper.jsx

import { motion, useInView } from "framer-motion";
import React, { useRef } from 'react';

const ScrollFloatWrapper = ({ children, index = 0 }) => {
    const ref = useRef(null);
    
    // This hook detects when the component is in the viewport
    const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once, when 50% is visible

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.2, 0.6, 0.2, 1], // A nice easing curve
                // A small delay for each item creates a beautiful stagger effect
                delay: index * 0.1 
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {children}
        </motion.div>
    );
};

export default ScrollFloatWrapper;