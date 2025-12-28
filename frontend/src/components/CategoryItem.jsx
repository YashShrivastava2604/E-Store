import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryItem = ({ category }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/category" + category.href);
	};

	return (
		<motion.div
			onClick={handleClick}
			className='group cursor-pointer'
			whileHover={{ y: -5 }}
			transition={{ duration: 0.3 }}
		>
			<div className='relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow h-48 md:h-56'>
				<img
					src={category.imageUrl}
					alt={category.name}
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
					loading="lazy"
				/>
				<div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300' />
				<h3 className='absolute bottom-4 left-4 right-4 text-white font-bold text-lg md:text-xl group-hover:translate-y-0 transition-transform'>
					{category.name}
				</h3>
			</div>
		</motion.div>
	);
};

export default CategoryItem;