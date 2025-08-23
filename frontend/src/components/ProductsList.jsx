// This is an example of what your ProductsList.jsx might look like.
// You need to pass the `isAdmin` prop from AdminPage.jsx
import { Trash2, Star, SquarePen } from "lucide-react"; // Import SquarePen for editing if you add it later
import { useProductStore } from "../stores/useProductStore";
import LoadingSpinner from "./LoadingSpinner";

// Receive isAdmin prop
const ProductsList = ({ isAdmin }) => {
    const { products, loading, deleteProduct, toggleFeaturedProduct } = useProductStore();

    if (loading) return <LoadingSpinner />;

    return (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold mb-4 text-emerald-400'>
                {isAdmin ? "All Products" : "My Products"}
            </h2>
            {products.length === 0 && !loading && (
                <p className="text-gray-400">No products found.</p>
            )}
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-gray-700'>
                    <thead>
                        <tr>
                            <th className='py-3 px-4 text-left text-gray-300'>Product</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Price</th>
                            <th className='py-3 px-4 text-left text-gray-300'>Category</th>
                            {isAdmin && <th className='py-3 px-4 text-left text-gray-300'>Featured</th>} {/* Only show for admin */}
                            <th className='py-3 px-4 text-left text-gray-300'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className='border-t border-gray-600 hover:bg-gray-600/50'>
                                <td className='py-3 px-4 flex items-center'>
                                    {product.image && (
                                        <img src={product.image} alt={product.name} className='w-10 h-10 object-cover rounded-md mr-3' />
                                    )}
                                    {product.name}
                                </td>
                                <td className='py-3 px-4'>₹{product.price.toFixed(2)}</td>
                                <td className='py-3 px-4 capitalize'>{product.category}</td>
                                {isAdmin && ( // Only show for admin
                                    <td className='py-3 px-4'>
                                        <button onClick={() => toggleFeaturedProduct(product._id)} title="Toggle Featured">
                                            <Star
                                                className={`h-5 w-5 transition-colors duration-200 ${
                                                    product.isFeatured ? "text-yellow-400 fill-current" : "text-gray-400 hover:text-yellow-300"
                                                }`}
                                            />
                                        </button>
                                    </td>
                                )}
                                <td className='py-3 px-4'>
                                    <div className="flex gap-2">
                                        {/* You might want an edit button here for sellers/admins */}
                                        {/* <button className="text-blue-400 hover:text-blue-500" title="Edit Product">
                                            <SquarePen className="h-5 w-5" />
                                        </button> */}
                                        <button onClick={() => deleteProduct(product._id)} className="text-red-400 hover:text-red-500" title="Delete Product">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
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