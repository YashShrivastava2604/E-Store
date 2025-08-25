import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	return (
		<Link to={"/category" + category.href} className='relative overflow-hidden h-96 w-full rounded-2xl group shadow-lg'>
			<div className='w-full h-full cursor-pointer'>
				<img
					src={category.imageUrl}
					alt={category.name}
					className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
					loading='lazy'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
				<div className='absolute bottom-0 left-0 right-0 p-6 z-10'>
					<h3 className='text-white text-3xl font-bold'>{category.name}</h3>
					<p className='text-gray-200 text-sm mt-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100'>
						Explore Collection
					</p>
				</div>
			</div>
		</Link>
	);
};

export default CategoryItem;