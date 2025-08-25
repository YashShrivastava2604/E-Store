import { Trash2, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "./LoadingSpinner";

const ProductsList = ({ isAdmin }) => {
	const { products, loading, deleteProduct, toggleFeaturedProduct } = useProductStore();

	if (loading && products.length === 0) return <LoadingSpinner />;

	return (
		<div className='w-full'>
			<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
				{isAdmin ? "All Products" : "My Products"}
			</h2>
			{products.length === 0 && !loading && <p className='text-gray-500'>No products found.</p>}
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Product</th>
							<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
							<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
							{isAdmin && <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Featured</th>}
							<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{products.map((product) => (
							<tr key={product._id} className='hover:bg-gray-50'>
								<td className='py-4 px-4 whitespace-nowrap'>
									<div className="flex items-center">
										<div className="flex-shrink-0 h-10 w-10">
											<img src={product.image} alt={product.name} className='w-10 h-10 object-cover rounded-md' />
										</div>
										<div className="ml-4 font-medium text-gray-900">{product.name}</div>
									</div>
								</td>
								<td className='py-4 px-4 whitespace-nowrap text-gray-700'>${product.price.toFixed(2)}</td>
								<td className='py-4 px-4 whitespace-nowrap capitalize text-gray-700'>{product.category}</td>
								{isAdmin && (
									<td className='py-4 px-4 whitespace-nowrap'>
										<button onClick={() => toggleFeaturedProduct(product._id)} title='Toggle Featured'>
											<Star className={`h-5 w-5 transition-colors duration-200 ${product.isFeatured ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-400"}`} />
										</button>
									</td>
								)}
								<td className='py-4 px-4 whitespace-nowrap'>
									<button onClick={() => deleteProduct(product._id)} className='text-red-500 hover:text-red-700' title='Delete Product'>
										<Trash2 className='h-5 w-5' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductsList;